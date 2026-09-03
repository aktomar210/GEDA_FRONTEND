import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import type { ReactNode } from 'react'
import { authApi } from '../api/authApi'
import {
  getAccessToken,
  registerUnauthorizedHandler,
  setAccessToken,
} from '../api/client'
import type { UserSummaryDto } from '../types/auth'
import { getPendingMfa, setPendingMfa } from './pendingMfa'

interface AuthState {
  user: UserSummaryDto | null
  accessToken: string | null
  isAuthenticated: boolean
  isInitializing: boolean
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; accessToken: string; user: UserSummaryDto }
  | { type: 'LOGOUT' }
  | { type: 'INIT_DONE' }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuthenticated: true,
        isInitializing: false,
      }
    case 'LOGOUT':
      return {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isInitializing: false,
      }
    case 'INIT_DONE':
      return { ...state, isInitializing: false }
    default:
      return state
  }
}

export type LoginResult =
  | { mfaRequired: true; devOtpCode: string | null }
  | { mfaRequired: false }

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<LoginResult>
  verifyOtp: (code: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    accessToken: getAccessToken(),
    isAuthenticated: Boolean(getAccessToken()),
    isInitializing: true,
  })

  const logout = useCallback(() => {
    setAccessToken(null)
    setPendingMfa(null)
    dispatch({ type: 'LOGOUT' })
  }, [])

  // Wire the axios client's 401 handler to this provider's logout, without
  // client.ts importing AuthContext directly (circular import avoidance).
  useEffect(() => {
    registerUnauthorizedHandler(logout)
  }, [logout])

  // On mount, if a token is already stored (page refresh), validate it via
  // GET /api/auth/me and hydrate the user; otherwise clear stale state.
  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      dispatch({ type: 'INIT_DONE' })
      return
    }
    authApi
      .me()
      .then((user) => {
        dispatch({ type: 'LOGIN_SUCCESS', accessToken: token, user })
      })
      .catch(() => {
        setAccessToken(null)
        dispatch({ type: 'LOGOUT' })
      })
  }, [])

  const login = useCallback(
    async (username: string, password: string): Promise<LoginResult> => {
      const response = await authApi.login({ username, password })

      if (response.mfaRequired && response.pendingToken) {
        setPendingMfa({
          pendingToken: response.pendingToken,
          devOtpCode: response.devOtpCode ?? null,
        })
        return { mfaRequired: true, devOtpCode: response.devOtpCode ?? null }
      }

      if (response.accessToken && response.user) {
        setAccessToken(response.accessToken)
        dispatch({
          type: 'LOGIN_SUCCESS',
          accessToken: response.accessToken,
          user: response.user,
        })
        return { mfaRequired: false }
      }

      throw new Error('Unexpected login response from server.')
    },
    [],
  )

  const verifyOtp = useCallback(async (code: string): Promise<void> => {
    const pending = getPendingMfa()
    if (!pending) {
      throw new Error('Login session expired. Please sign in again.')
    }
    const response = await authApi.verifyOtp({
      pendingToken: pending.pendingToken,
      otpCode: code,
    })
    setAccessToken(response.accessToken)
    setPendingMfa(null)
    dispatch({
      type: 'LOGIN_SUCCESS',
      accessToken: response.accessToken,
      user: response.user,
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, login, verifyOtp, logout }),
    [state, login, verifyOtp, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
