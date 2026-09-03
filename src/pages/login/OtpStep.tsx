import { useRef, useState } from 'react'
import type { ClipboardEvent, FormEvent, KeyboardEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { ApiClientError } from '../../api/client'
import { useAuth } from '../../auth/AuthContext'

const OTP_LENGTH = 6

interface OtpStepProps {
  onBack: () => void
}

export function OtpStep({ onBack }: OtpStepProps) {
  const { verifyOtp } = useAuth()
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const code = digits.join('')

  const setDigitAt = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '')
    if (!clean) {
      setDigitAt(index, '')
      return
    }
    // Handle a full paste landing in one box.
    if (clean.length > 1) {
      const chars = clean.slice(0, OTP_LENGTH).split('')
      setDigits((prev) => {
        const next = [...prev]
        chars.forEach((c, i) => {
          if (index + i < OTP_LENGTH) next[index + i] = c
        })
        return next
      })
      const lastFilled = Math.min(index + chars.length, OTP_LENGTH) - 1
      inputRefs.current[lastFilled]?.focus()
      return
    }
    setDigitAt(index, clean)
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return
    const chars = pasted.slice(0, OTP_LENGTH).split('')
    setDigits((prev) => {
      const next = [...prev]
      chars.forEach((c, i) => {
        next[i] = c
      })
      return next
    })
    inputRefs.current[Math.min(chars.length, OTP_LENGTH) - 1]?.focus()
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (code.length !== OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code sent to you.`)
      return
    }
    setError(null)
    setLoading(true)
    try {
      await verifyOtp(code)
      // On success, AuthContext updates isAuthenticated and routing redirects.
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : 'Verification failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        Two-step verification
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter the {OTP_LENGTH}-digit one-time code to complete sign in.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', my: 2 }}>
        {digits.map((digit, index) => (
          <TextField
            key={index}
            inputRef={(el) => {
              inputRefs.current[index] = el
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            autoFocus={index === 0}
            slotProps={{
              htmlInput: {
                maxLength: 1,
                inputMode: 'numeric',
                pattern: '[0-9]*',
                style: {
                  textAlign: 'center',
                  fontSize: 22,
                  fontFamily: 'monospace',
                  width: 24,
                  padding: '10px 0',
                },
              },
            }}
          />
        ))}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        disabled={loading || code.length !== OTP_LENGTH}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
        sx={{ mt: 1 }}
      >
        {loading ? 'Verifying…' : 'Verify & Sign In'}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link component="button" type="button" variant="body2" onClick={onBack}>
          Back to sign in
        </Link>
      </Box>
    </Box>
  )
}
