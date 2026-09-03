import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import ShieldCheckIcon from '@mui/icons-material/VerifiedUserOutlined'
import SensorsIcon from '@mui/icons-material/SensorsOutlined'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheckOutlined'
import RouterIcon from '@mui/icons-material/RouterOutlined'

export function HealthTelemetryKpis() {
  const metrics = [
    {
      label: 'mTLS Security Compliance',
      value: '98.6%',
      sub: 'X.509 Certs Valid',
      icon: ShieldCheckIcon,
      accent: '#10B981',
      bg: '#D1FAE5',
    },
    {
      label: 'Telemetry Delivery Rate',
      value: '99.92%',
      sub: 'MQTT Packet Success',
      icon: SensorsIcon,
      accent: '#0284C7',
      bg: '#E0F2FE',
    },
    {
      label: 'Avg Gateway Latency',
      value: '42 ms',
      sub: 'Response < 250ms SLA',
      icon: NetworkCheckIcon,
      accent: '#F59E0B',
      bg: '#FEF3C7',
    },
    {
      label: 'Modbus / MQTT Gateways',
      value: '48 / 48',
      sub: '100% Gateways Active',
      icon: RouterIcon,
      accent: '#8B5CF6',
      bg: '#EDE9FE',
    },
  ]

  return (
    <Grid container spacing={2}>
      {metrics.map((item, idx) => {
        const Icon = item.icon
        return (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                transition: 'all 0.25s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' },
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      bgcolor: item.bg,
                      color: item.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ fontWeight: 600, display: 'block' }}>
                      {item.label}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0B2545', lineHeight: 1.1 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: item.accent, fontWeight: 700, fontSize: 10.5 }}>
                      {item.sub}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
