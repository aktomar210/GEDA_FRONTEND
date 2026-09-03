import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOnOutlined'
import SpaIcon from '@mui/icons-material/SpaOutlined'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutlineOutlined'

export function OverviewSecondaryKpis() {
  const kpis = [
    {
      title: 'Instantaneous Grid Load',
      value: '1,420.5 MW',
      change: '+4.2% vs yesterday',
      changeColor: '#10B981',
      icon: FlashOnIcon,
      accent: '#0284C7',
      bg: '#E0F2FE',
    },
    {
      title: 'CO₂ Avoided Today',
      value: '3,850 Tons',
      change: 'Green Offset Achieved',
      changeColor: '#10B981',
      icon: SpaIcon,
      accent: '#10B981',
      bg: '#D1FAE5',
    },
    {
      title: 'Est. Daily Revenue',
      value: '₹1.84 Cr',
      change: 'Tariff Yield Nominal',
      changeColor: '#F59E0B',
      icon: AccountBalanceWalletIcon,
      accent: '#F59E0B',
      bg: '#FEF3C7',
    },
    {
      title: 'Solar / Wind Mix',
      value: '68% / 32%',
      change: 'Balanced Supply',
      changeColor: '#6366F1',
      icon: PieChartOutlineIcon,
      accent: '#6366F1',
      bg: '#EEF2FF',
    },
  ]

  return (
    <Grid container spacing={2}>
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon
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
                      bgcolor: kpi.bg,
                      color: kpi.accent,
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
                      {kpi.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0B2545', lineHeight: 1.1 }}>
                      {kpi.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: kpi.changeColor, fontWeight: 700, fontSize: 10.5 }}>
                      {kpi.change}
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
