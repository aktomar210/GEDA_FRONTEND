import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiEnvelope, ApiError } from '../types/api'

const ACCESS_TOKEN_STORAGE_KEY = 'geda_access_token'

// In-memory copy of the access token, kept in sync with localStorage.
// Avoids reading localStorage on every request while still persisting
// across page reloads.
let inMemoryAccessToken: string | null =
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)

export function setAccessToken(token: string | null): void {
  inMemoryAccessToken = token
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
  }
}

export function getAccessToken(): string | null {
  return inMemoryAccessToken
}

// AuthProvider injects its logout callback here after mounting. This lets
// the axios interceptor trigger a logout on 401 without client.ts importing
// AuthContext (which would create a circular import: AuthContext -> authApi
// -> client -> AuthContext).
let onUnauthorized: (() => void) | null = null

export function registerUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler
}

export class ApiClientError extends Error {
  code: string
  status?: number

  constructor(message: string, code: string, status?: number) {
    super(message)
    this.name = 'ApiClientError'
    this.code = code
    this.status = status
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (inMemoryAccessToken) {
    config.headers.set('Authorization', `Bearer ${inMemoryAccessToken}`)
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const envelope = response.data as ApiEnvelope<unknown>
    if (envelope && typeof envelope.success === 'boolean') {
      if (envelope.success) {
        // Replace response.data with the unwrapped payload so callers never
        // see the {success,data,error} envelope.
        response.data = envelope.data
        return response
      }
      const err = envelope.error as ApiError | null
      throw new ApiClientError(
        err?.message ?? 'Request failed',
        err?.code ?? 'UNKNOWN_ERROR',
        response.status,
      )
    }
    return response
  },
  (error: AxiosError<ApiEnvelope<unknown>>) => {
    const status = error.response?.status
    const envelope = error.response?.data

    if (status === 401) {
      setAccessToken(null)
      onUnauthorized?.()
    }

    const message =
      envelope?.error?.message ??
      error.message ??
      'Network error — please try again.'
    const code = envelope?.error?.code ?? 'NETWORK_ERROR'

    return Promise.reject(new ApiClientError(message, code, status))
  },
)
