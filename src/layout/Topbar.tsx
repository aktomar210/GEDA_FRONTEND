import { useState } from 'react'
import type { MouseEvent } from 'react'
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import SensorsIcon from '@mui/icons-material/SensorsOutlined'
import { useAuth } from '../auth/AuthContext'
import { GedaEmblem } from '../components/GedaLogo'

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Topbar() {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    handleClose()
    logout()
  }

  return (
    <Toolbar
      sx={{
        gap: 2,
        justify: 'space-between',
        py: 0.5,
        background: 'linear-gradient(90deg, #0B2545 0%, #13335F 100%)',
      }}
    >
      {/* Mobile/Compact Brand Display if drawer closed or headers */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5 }}>
        <GedaEmblem size={34} />
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FFF' }}>
          Solar IoT SCADA
        </Typography>
      </Box>

      {/* Main Title & Agency Name */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 800,
              letterSpacing: 0.4,
              fontSize: 18,
              color: '#FFFFFF',
            }}
          >
            Gujarat Energy Development Agency
          </Typography>

          <Chip
            label="SCADA SaaS Platform"
            size="small"
            sx={{
              bgcolor: 'rgba(201, 147, 46, 0.2)',
              color: '#F59E0B',
              border: '1px solid rgba(201, 147, 46, 0.4)',
              fontWeight: 800,
              fontSize: 11,
              height: 22,
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <span>Statewide Renewable Energy Monitoring • GEDA Govt. of Gujarat</span>
        </Typography>
      </Box>

      {/* Live System Telemetry Status Indicator */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 1,
          bgcolor: 'rgba(255,255,255,0.06)',
          px: 1.5,
          py: 0.6,
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box className="pulse-dot" />
        <SensorsIcon sx={{ fontSize: 16, color: '#10B981' }} />
        <Typography variant="caption" sx={{ color: '#E2E8F0', fontWeight: 700, fontSize: 12 }}>
          Live RMS Telemetry Active
        </Typography>
      </Box>

      {/* User Avatar Menu */}
      {user && (
        <>
          <Box
            onClick={handleOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
              px: 1.5,
              py: 0.6,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
                borderColor: '#C9932E',
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: '#C9932E',
                color: '#0B2545',
                fontSize: 13,
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(201, 147, 46, 0.4)',
              }}
            >
              {initialsFromName(user.fullName)}
            </Avatar>
            <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, lineHeight: 1.2, color: '#FFFFFF', fontSize: 13 }}
              >
                {user.fullName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: '#F59E0B', fontWeight: 600, lineHeight: 1, fontSize: 10.5 }}
              >
                {user.role.replace(/_/g, ' ')}
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 8,
                sx: {
                  borderRadius: 3,
                  mt: 1,
                  minWidth: 210,
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                },
              },
            }}
          >
            <MenuItem disabled sx={{ opacity: '1 !important', py: 1.5 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0B2545' }}>
                  {user.fullName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569', display: 'block' }}>
                  {user.username}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#0284C7', fontWeight: 700, mt: 0.3, display: 'block' }}
                >
                  Gujarat Energy Dev. Agency
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: '#EF4444', fontWeight: 700 }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  )
}
