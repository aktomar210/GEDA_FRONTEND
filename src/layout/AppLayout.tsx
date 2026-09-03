import { AppBar, Box, Drawer, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { GedaLogo } from '../components/GedaLogo'

const DRAWER_WIDTH = 260

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F1F5F9' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Topbar />
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar
          sx={{
            px: 2,
            py: 1,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, #081B34 0%, #0B2545 100%)',
          }}
        >
          <GedaLogo variant="compact" size="small" colorMode="dark" />
        </Toolbar>
        <Sidebar />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3.5 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
