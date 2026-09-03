import { useMemo, useState } from 'react'
import { Box, Snackbar, Stack, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { alertRows as initialAlertRows } from './mockData'
import type { AlertRow, AlertSeverityFull, AlertStatus } from './mockData'
import { AlertKpiCards } from './components/AlertKpiCards'
import { AlertsFilterBar } from './components/AlertsFilterBar'
import { AlertsTable } from './components/AlertsTable'

function isToday(timeLabel: string): boolean {
  // Mock rows use "25 Aug, HH:mm" style labels; treat rows dated "25 Aug" (today) as today's.
  return timeLabel.startsWith('25 Aug')
}

export function AlertsPage() {
  const [alertRows, setAlertRows] = useState<AlertRow[]>(initialAlertRows)
  const [severity, setSeverity] = useState<AlertSeverityFull | ''>('')
  const [status, setStatus] = useState<AlertStatus | ''>('')
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const filteredRows = useMemo(() => {
    return alertRows.filter((row) => {
      if (severity && row.severity !== severity) return false
      if (status && row.status !== status) return false
      return true
    })
  }, [alertRows, severity, status])

  const kpiCounts = useMemo(() => {
    return {
      critical: alertRows.filter((r) => r.severity === 'HIGH' && r.status !== 'Resolved').length,
      warning: alertRows.filter((r) => r.severity === 'MED' && r.status !== 'Resolved').length,
      info: alertRows.filter((r) => r.severity === 'INFO' && r.status !== 'Resolved').length,
      resolvedToday: alertRows.filter((r) => r.status === 'Resolved' && isToday(r.time)).length,
    }
  }, [alertRows])

  const handleAcknowledge = (row: AlertRow) => {
    setAlertRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: 'Acknowledged' } : r)))
    setSnackbarMessage(`Alert #${row.id} acknowledged`)
  }

  const handleResolve = (row: AlertRow) => {
    setAlertRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: 'Resolved' } : r)))
    setSnackbarMessage(`Alert #${row.id} resolved`)
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 1,
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <NotificationsIcon color="primary" fontSize="small" />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Alerts & Notifications Center
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Centralized alert queue across all devices and plants.
          </Typography>
        </Box>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Channels: SMS · Email · App · Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        <AlertKpiCards counts={kpiCounts} />
      </Box>

      <AlertsFilterBar
        severity={severity}
        status={status}
        onSeverityChange={setSeverity}
        onStatusChange={setStatus}
      />

      <AlertsTable rows={filteredRows} onAcknowledge={handleAcknowledge} onResolve={handleResolve} />

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
