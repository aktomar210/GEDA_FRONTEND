import { Box, Chip, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined'
import HealthIcon from '@mui/icons-material/HealthAndSafetyOutlined'
import { GedaEmblem } from '../../components/GedaLogo'

const TAB_ROUTES = [
  { label: 'Overview', path: '/dashboard', icon: DashboardIcon },
  { label: 'Generation Analytics', path: '/dashboard/generation', icon: AnalyticsIcon },
  { label: 'System Health', path: '/dashboard/health', icon: HealthIcon },
] as const

export function DashboardTabs() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentIndex = (() => {
    if (location.pathname.startsWith('/dashboard/generation')) return 1
    if (location.pathname.startsWith('/dashboard/health')) return 2
    return 0
  })()

  return (
    <Box>
      {/* Hero Header Banner */}
      <Paper
        className="hero-banner"
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          mb: 3,
          borderRadius: 3.5,
          background: 'linear-gradient(135deg, #0B2545 0%, #13335F 60%, #1E3A8A 100%)',
          boxShadow: '0 8px 24px rgba(11, 37, 69, 0.15)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2.5}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <GedaEmblem size={52} />
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                  Gujarat Energy Development Agency
                </Typography>
                <Chip
                  label="State Nodal Agency"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(201, 147, 46, 0.25)',
                    color: '#F59E0B',
                    border: '1px solid rgba(201, 147, 46, 0.4)',
                    fontWeight: 800,
                    fontSize: 10,
                  }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.3 }}>
                Solar IoT Statewide SCADA Operations • Real-time Monitoring & Generation Telemetry
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                px: 2,
                py: 1,
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <Typography variant="caption" sx={{ color: '#F59E0B', fontWeight: 700, display: 'block' }}>
                System Status
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Box className="pulse-dot" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                  All Grid Nodes Nominal
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      {/* Styled Tabs */}
      <Box sx={{ borderBottom: '1px solid #E2E8F0', mb: 3 }}>
        <Tabs
          value={currentIndex}
          onChange={(_, index) => navigate(TAB_ROUTES[index].path)}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 14,
              minHeight: 48,
              mr: 1,
              px: 2.5,
              borderRadius: '10px 10px 0 0',
              '&.Mui-selected': {
                color: '#0B2545',
                bgcolor: '#FFFFFF',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.03)',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#C9932E',
              height: 3.5,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {TAB_ROUTES.map((tab) => {
            const Icon = tab.icon
            return (
              <Tab
                key={tab.path}
                label={
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Icon fontSize="small" />
                    <span>{tab.label}</span>
                  </Stack>
                }
              />
            )
          })}
        </Tabs>
      </Box>

      <Outlet />
    </Box>
  )
}
