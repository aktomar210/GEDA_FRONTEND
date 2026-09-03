import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { reportCatalog, reportFormatOptions } from '../mockData'
import type { ReportFormat, ScheduledReport } from '../mockData'

interface NewReportModalProps {
  open: boolean
  onClose: () => void
  onCreate: (report: Omit<ScheduledReport, 'id'>) => void
}

interface FormState {
  name: string
  categoryId: string
  frequency: ScheduledReport['frequency']
  format: ReportFormat
}

const emptyForm: FormState = {
  name: '',
  categoryId: reportCatalog[0]?.id ?? '',
  frequency: 'Monthly',
  format: 'PDF',
}

export function NewReportModal({ open, onClose, onCreate }: NewReportModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setForm(emptyForm)
      setError(null)
    }
  }, [open])

  const isValid = form.name.trim().length > 0 && form.categoryId.length > 0

  const handleSubmit = () => {
    if (!isValid) {
      setError('Please fill in all required fields.')
      return
    }
    onCreate({
      name: form.name.trim(),
      frequency: form.frequency,
      categoryId: form.categoryId,
      format: form.format,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        New Scheduled Report
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Report Name"
            required
            fullWidth
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <TextField
            select
            label="Category"
            required
            fullWidth
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
          >
            {reportCatalog.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Frequency"
            required
            fullWidth
            value={form.frequency}
            onChange={(e) =>
              setForm((f) => ({ ...f, frequency: e.target.value as ScheduledReport['frequency'] }))
            }
          >
            {(['Daily', 'Weekly', 'Monthly'] as const).map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Format"
            required
            fullWidth
            value={form.format}
            onChange={(e) => setForm((f) => ({ ...f, format: e.target.value as ReportFormat }))}
          >
            {reportFormatOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={!isValid}>
          Create Report
        </Button>
      </DialogActions>
    </Dialog>
  )
}
