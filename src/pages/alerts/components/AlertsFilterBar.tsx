import { Stack, TextField, MenuItem } from '@mui/material'
import { severityFilterOptions, statusFilterOptions } from '../mockData'
import type { AlertSeverityFull, AlertStatus } from '../mockData'

interface AlertsFilterBarProps {
  severity: AlertSeverityFull | ''
  status: AlertStatus | ''
  onSeverityChange: (value: AlertSeverityFull | '') => void
  onStatusChange: (value: AlertStatus | '') => void
}

export function AlertsFilterBar({
  severity,
  status,
  onSeverityChange,
  onStatusChange,
}: AlertsFilterBarProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
      <TextField
        select
        label="Severity"
        size="small"
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value as AlertSeverityFull | '')}
        sx={{ minWidth: 180 }}
      >
        {severityFilterOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Status"
        size="small"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as AlertStatus | '')}
        sx={{ minWidth: 180 }}
      >
        {statusFilterOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}
