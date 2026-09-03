import { useState } from 'react'
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deviceApi } from '../../../api/deviceApi'
import { ApiClientError } from '../../../api/client'
import type { DeviceDto } from '../../../types/device'

interface RegenerateCertConfirmProps {
  device: DeviceDto | null
  onClose: () => void
  onSuccess: (updated: DeviceDto) => void
}

export function RegenerateCertConfirm({
  device,
  onClose,
  onSuccess,
}: RegenerateCertConfirmProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!device) return
    setSubmitting(true)
    setError(null)
    try {
      const updated = await deviceApi.regenerateCert(device.id)
      onSuccess(updated)
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : 'Failed to regenerate certificate. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={Boolean(device)} onClose={submitting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Regenerate TLS Certificate</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <DialogContentText>
          This will issue a new TLS certificate for device{' '}
          <strong>{device?.deviceCode}</strong> ({device?.name}) and invalidate
          the current one. The device will need to reconnect with the new
          certificate. Continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleConfirm}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {submitting ? 'Regenerating…' : 'Regenerate Certificate'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
