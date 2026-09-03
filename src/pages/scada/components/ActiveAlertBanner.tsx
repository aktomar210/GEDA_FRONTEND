import { Alert, Button, Stack, Typography } from '@mui/material'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import type { ScadaAlert } from '../mockData'

interface ActiveAlertBannerProps {
  alert: ScadaAlert
  acknowledged: boolean
  onAcknowledge: () => void
}

export function ActiveAlertBanner({ alert, acknowledged, onAcknowledge }: ActiveAlertBannerProps) {
  return (
    <Alert
      icon={<WarningAmberOutlinedIcon />}
      severity={acknowledged ? 'success' : 'warning'}
      sx={{
        alignItems: 'center',
        '& .MuiAlert-action': { alignItems: 'center' },
      }}
      action={
        !acknowledged && (
          <Button color="inherit" size="small" variant="outlined" onClick={onAcknowledge}>
            Acknowledge / Assign Ticket
          </Button>
        )
      }
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {acknowledged ? 'Acknowledged:' : 'Active Alert:'} {alert.message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Raised {alert.raisedAt}
        </Typography>
      </Stack>
    </Alert>
  )
}
