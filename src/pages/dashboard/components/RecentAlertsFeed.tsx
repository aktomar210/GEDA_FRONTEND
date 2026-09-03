import {
  Box,
  Chip,
  List,
  ListItem,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import type { AlertDto, AlertSeverity } from '../../../types/alert'
import { severityColors } from '../../../theme/theme'
import { formatRelativeTime } from '../../../utils/formatters'

interface RecentAlertsFeedProps {
  alerts: AlertDto[]
  loading: boolean
}

const severityLabels: Record<AlertSeverity, string> = {
  HIGH: 'HIGH',
  MED: 'MED',
  LOW: 'LOW',
}

export function RecentAlertsFeed({ alerts, loading }: RecentAlertsFeedProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <NotificationsActiveOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Recent Alerts
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={52} sx={{ borderRadius: 1 }} />
          ))}
        </Box>
      )}

      {!loading && alerts.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No active alerts. All systems nominal.
        </Typography>
      )}

      {!loading && alerts.length > 0 && (
        <List disablePadding sx={{ maxHeight: 360, overflowY: 'auto' }}>
          {alerts.map((alert) => (
            <ListItem
              key={alert.id}
              disableGutters
              sx={{
                borderBottom: '1px solid #EEF1F5',
                py: 1.25,
                alignItems: 'flex-start',
                gap: 1.5,
              }}
            >
              <Chip
                label={severityLabels[alert.severity]}
                size="small"
                sx={{
                  bgcolor: `${severityColors[alert.severity]}1A`,
                  color: severityColors[alert.severity],
                  fontWeight: 700,
                  minWidth: 48,
                }}
              />
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap title={alert.message}>
                  {alert.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {[alert.plantName, alert.deviceCode].filter(Boolean).join(' · ') || 'Unknown source'}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {formatRelativeTime(alert.createdAt)}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}
