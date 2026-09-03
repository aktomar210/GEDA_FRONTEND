import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChartOutlined'
import SpeedIcon from '@mui/icons-material/SpeedOutlined'
import WbSunnyIcon from '@mui/icons-material/WbSunnyOutlined'
import EvStationIcon from '@mui/icons-material/EvStationOutlined'

export function GenerationParameterCards() {
  const params = [
    {
      label: 'Peak Solar/Wind Power',
      value: '4,850 kW',
      sub: 'Peak at 13:15 IST',
      icon: ShowChartIcon,
      accent: '#F59E0B',
      bg: '#FEF3C7',
    },
    {
      label: 'Performance Ratio (PR)',
      value: '82.4%',
      sub: 'Target: >80% Nominal',
      icon: SpeedIcon,
      accent: '#10B981',
      bg: '#D1FAE5',
    },
    {
      label: 'Capacity Util. Factor (CUF)',
      value: '24.8%',
      sub: 'Statewide Monthly Avg',
      icon: WbSunnyIcon,
      accent: '#0284C7',
      bg: '#E0F2FE',
    },
    {
      label: 'Grid Export Efficiency',
      value: '99.1%',
      sub: '<0.9% T&D Line Loss',
      icon: EvStationIcon,
      accent: '#8B5CF6',
      bg: '#EDE9FE',
    },
  ]

  return (
    <Grid container spacing={2}>
      {params.map((item, idx) => {
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
