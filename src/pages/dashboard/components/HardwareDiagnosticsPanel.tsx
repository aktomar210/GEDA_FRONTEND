import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import MemoryIcon from '@mui/icons-material/MemoryOutlined'
import LockResetIcon from '@mui/icons-material/LockResetOutlined'

export function HardwareDiagnosticsPanel() {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <MemoryIcon sx={{ color: '#0284C7' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0B2545' }}>
              SCADA Gateway Hardware &amp; Security Diagnostics
            </Typography>
          </Stack>
          <Chip label="Telemetry Node" size="small" sx={{ bgcolor: '#E0F2FE', color: '#0284C7', fontWeight: 800, fontSize: 11 }} />
        </Box>

        <Stack spacing={2.5}>
          {/* Resource 1: CPU Load */}
          <Box>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                Gateway CPU Processing Load
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#10B981' }}>
                34% Nominal
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={34}
              sx={{ height: 8, borderRadius: 4, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#10B981', borderRadius: 4 } }}
            />
          </Box>

          {/* Resource 2: RAM Memory */}
          <Box>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                Telemetry Buffer RAM Usage
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#0284C7' }}>
                58% Occupied
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={58}
              sx={{ height: 8, borderRadius: 4, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#0284C7', borderRadius: 4 } }}
            />
          </Box>

          {/* Resource 3: Security Cert Expiry Notice */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: '#FEF3C7',
              border: '1px solid #FDE68A',
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <LockResetIcon sx={{ color: '#B45309' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#92400E' }}>
                  X.509 TLS Certificates Renewal Notice
                </Typography>
                <Typography variant="caption" sx={{ color: '#B45309', fontWeight: 600 }}>
                  3 Inverter gateways have certificates expiring within 15 days (Auto-renewal scheduled)
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
