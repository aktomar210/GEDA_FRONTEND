import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { authApi } from '../../api/authApi'
import { ApiClientError } from '../../api/client'
import { useAuth } from '../../auth/AuthContext'

interface PasswordStepProps {
  onMfaRequired: () => void
}

export function PasswordStep({ onMfaRequired }: PasswordStepProps) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<
    string | null
  >(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await login(username.trim(), password)
      if (result.mfaRequired) {
        onMfaRequired()
      }
      // If MFA is not required, AuthContext already updated isAuthenticated
      // and App-level routing will redirect to /dashboard.
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : 'Unable to sign in. Please check your credentials and try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!username.trim()) {
      setError('Enter your username or Employee ID first, then use "Forgot Password?".')
      return
    }
    setForgotPasswordLoading(true)
    setError(null)
    try {
      await authApi.forgotPassword({ username: username.trim() })
    } catch {
      // Intentionally generic: never reveal whether the account exists.
    } finally {
      setForgotPasswordLoading(false)
      setForgotPasswordMessage(
        'If an account matches those details, password reset instructions have been sent.',
      )
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        Sign in
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your Employee ID and password to continue.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username / Employee ID"
        fullWidth
        required
        autoFocus
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <Box sx={{ textAlign: 'right', mt: 0.5, mb: 2 }}>
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={handleForgotPassword}
          sx={{ cursor: 'pointer' }}
        >
          {forgotPasswordLoading ? 'Sending…' : 'Forgot Password?'}
        </Link>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        disabled={loading || !username.trim() || !password}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </Button>

      <Snackbar
        open={Boolean(forgotPasswordMessage)}
        autoHideDuration={6000}
        onClose={() => setForgotPasswordMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setForgotPasswordMessage(null)}
          severity="info"
          sx={{ width: '100%' }}
        >
          {forgotPasswordMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
