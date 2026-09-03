import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { deviceApi } from '../../../api/deviceApi'
import { ApiClientError } from '../../../api/client'
import type {
  DeviceCreateRequest,
  DeviceDto,
  DeviceStatus,
  DeviceType,
} from '../../../types/device'
import type { OrgTreeNodeDto } from '../../../types/org'

interface PlantOption {
  id: number
  label: string
}

interface ProvisionDeviceModalProps {
  open: boolean
  orgTree: OrgTreeNodeDto[] | null
  editingDevice: DeviceDto | null
  onClose: () => void
  onSuccess: () => void
}

const typeOptions: { value: DeviceType; label: string }[] = [
  { value: 'SOLAR_RMS', label: 'Solar RMS' },
  { value: 'WIND_RMS', label: 'Wind RMS' },
  { value: 'HYBRID_RMS', label: 'Hybrid RMS' },
]

const statusOptions: { value: DeviceStatus; label: string }[] = [
  { value: 'ONLINE', label: 'Online' },
  { value: 'WARNING', label: 'Warning' },
  { value: 'OFFLINE', label: 'Offline' },
]

function flattenPlants(nodes: OrgTreeNodeDto[] | null): PlantOption[] {
  if (!nodes) return []
  const plants: PlantOption[] = []
  const visit = (n: OrgTreeNodeDto, path: string[]) => {
    const nextPath = [...path, n.name]
    if (n.type === 'PLANT') {
      plants.push({ id: n.id, label: nextPath.join(' / ') })
    }
    n.children.forEach((child) => visit(child, nextPath))
  }
  nodes.forEach((node) => visit(node, []))
  return plants
}

const emptyForm: DeviceCreateRequest = {
  deviceCode: '',
  name: '',
  type: 'SOLAR_RMS',
  orgUnitId: 0,
  status: 'ONLINE',
}

export function ProvisionDeviceModal({
  open,
  orgTree,
  editingDevice,
  onClose,
  onSuccess,
}: ProvisionDeviceModalProps) {
  const [form, setForm] = useState<DeviceCreateRequest>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const plantOptions = flattenPlants(orgTree)
  const isEditMode = Boolean(editingDevice)

  useEffect(() => {
    if (!open) return
    if (editingDevice) {
      setForm({
        deviceCode: editingDevice.deviceCode,
        name: editingDevice.name,
        type: editingDevice.type,
        orgUnitId: editingDevice.orgUnitId,
        status: editingDevice.status,
      })
    } else {
      setForm(emptyForm)
    }
    setError(null)
  }, [open, editingDevice])

  const isValid =
    form.deviceCode.trim().length > 0 &&
    form.name.trim().length > 0 &&
    form.orgUnitId > 0

  const handleSubmit = async () => {
    if (!isValid) {
      setError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      if (isEditMode && editingDevice) {
        await deviceApi.update(editingDevice.id, form)
      } else {
        await deviceApi.create(form)
      }
      onSuccess()
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : 'Failed to save device. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEditMode ? 'Manage Device' : 'Provision New Device'}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Device Code"
            required
            fullWidth
            value={form.deviceCode}
            onChange={(e) => setForm((f) => ({ ...f, deviceCode: e.target.value }))}
            disabled={isEditMode}
            helperText={isEditMode ? 'Device code cannot be changed after provisioning.' : undefined}
          />
          <TextField
            label="Device Name"
            required
            fullWidth
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <TextField
            select
            label="Device Type"
            required
            fullWidth
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as DeviceType }))}
          >
            {typeOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Plant / Org Unit"
            required
            fullWidth
            value={form.orgUnitId || ''}
            onChange={(e) => setForm((f) => ({ ...f, orgUnitId: Number(e.target.value) }))}
            helperText={plantOptions.length === 0 ? 'Loading organization hierarchy…' : undefined}
          >
            {plantOptions.map((opt) => (
              <MenuItem key={opt.id} value={opt.id}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            required
            fullWidth
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as DeviceStatus }))}
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          {isEditMode && (
            <Typography variant="caption" color="text.secondary">
              Certificate renewal is handled separately via the "Regenerate Cert" action in the device table.
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={submitting || !isValid}
          startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {isEditMode ? 'Save Changes' : 'Provision Device'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
