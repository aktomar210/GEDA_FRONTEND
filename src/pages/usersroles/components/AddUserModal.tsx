import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { roleColumns } from '../mockData'
import type { UserRow } from '../mockData'

interface AddUserModalProps {
  open: boolean
  onClose: () => void
  onCreate: (user: Omit<UserRow, 'id' | 'lastLogin'>) => void
}

interface FormState {
  name: string
  role: UserRow['role']
  hierarchyScope: string
  twoFactorEnabled: boolean
}

const emptyForm: FormState = {
  name: '',
  role: roleColumns[0],
  hierarchyScope: '',
  twoFactorEnabled: false,
}

export function AddUserModal({ open, onClose, onCreate }: AddUserModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setForm(emptyForm)
      setError(null)
    }
  }, [open])

  const isValid = form.name.trim().length > 0 && form.hierarchyScope.trim().length > 0

  const handleSubmit = () => {
    if (!isValid) {
      setError('Please fill in all required fields.')
      return
    }
    onCreate({
      name: form.name.trim(),
      role: form.role,
      hierarchyScope: form.hierarchyScope.trim(),
      twoFactorEnabled: form.twoFactorEnabled,
      status: 'Active',
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Add User
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Name"
            required
            fullWidth
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <TextField
            select
            label="Role"
            required
            fullWidth
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRow['role'] }))}
          >
            {roleColumns.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Hierarchy Scope"
            required
            fullWidth
            placeholder="e.g. Rajkot DISCOM Only"
            value={form.hierarchyScope}
            onChange={(e) => setForm((f) => ({ ...f, hierarchyScope: e.target.value }))}
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.twoFactorEnabled}
                onChange={(e) => setForm((f) => ({ ...f, twoFactorEnabled: e.target.checked }))}
                color="secondary"
              />
            }
            label="Enable Two-Factor Authentication"
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={!isValid}>
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  )
}
