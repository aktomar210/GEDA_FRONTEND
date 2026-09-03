import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import DevicesIcon from '@mui/icons-material/DevicesOtherOutlined'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntennaOutlined'
import TuneIcon from '@mui/icons-material/TuneOutlined'
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined'
import ReceiptIcon from '@mui/icons-material/ReceiptLongOutlined'
import GroupIcon from '@mui/icons-material/GroupOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import {
  Box,
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import type { SvgIconProps } from '@mui/material'
import type { ComponentType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GOLD = '#C9932E'

interface NavItem {
  label: string
  path?: string
  icon: ComponentType<SvgIconProps>
  disabled?: boolean
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'Devices', path: '/devices', icon: DevicesIcon },
  { label: 'SCADA View', path: '/scada-view', icon: SettingsInputAntennaIcon },
  { label: 'Tag Config', path: '/tag-config', icon: TuneIcon },
  { label: 'Alerts', path: '/alerts', icon: NotificationsIcon },
  { label: 'Reports', path: '/reports', icon: AssessmentIcon },
  { label: 'Billing', path: '/billing', icon: ReceiptIcon },
  { label: 'Users & Roles', path: '/users-roles', icon: GroupIcon },
  { label: 'Data Export', path: '/data-export', icon: FileDownloadIcon },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ px: 1.5, py: 1.5, flexGrow: 1 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            py: 0.5,
            display: 'block',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1,
            fontSize: 10,
            textTransform: 'uppercase',
          }}
        >
          Main Navigation
        </Typography>

        {navItems.map((item) => {
          const isActive = Boolean(
            item.path && location.pathname.startsWith(item.path),
          )
          const Icon = item.icon

          const button = (
            <ListItemButton
              key={item.label}
              disabled={item.disabled}
              selected={isActive}
              onClick={() => item.path && navigate(item.path)}
              sx={{
                borderRadius: 2.5,
                mb: 0.8,
                px: 2,
                py: 1.2,
                color: isActive ? '#0B2545' : 'rgba(255,255,255,0.85)',
                bgcolor: isActive ? GOLD : 'transparent',
                boxShadow: isActive ? '0 4px 14px rgba(201, 147, 46, 0.4)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  bgcolor: GOLD,
                  color: '#0B2545',
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#D97706' },
                  '& .MuiListItemIcon-root': { color: '#0B2545' },
                },
                '&.Mui-disabled': {
                  opacity: 0.4,
                  color: 'rgba(255,255,255,0.5)',
                },
                '&:hover': {
                  bgcolor: isActive ? '#D97706' : 'rgba(255,255,255,0.08)',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#0B2545' : '#38BDF8',
                  minWidth: 38,
                }}
              >
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 13.5,
                      fontWeight: isActive ? 800 : 600,
                      letterSpacing: 0.2,
                    },
                  },
                }}
              />
              {item.disabled && (
                <Chip
                  label="Soon"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: 9,
                    fontWeight: 700,
                    bgcolor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                />
              )}
            </ListItemButton>
          )

          if (item.disabled) {
            return (
              <Tooltip key={item.label} title="Coming soon" placement="right">
                <Box>{button}</Box>
              </Tooltip>
            )
          }

          return button
        })}
      </List>

      {/* Sidebar Footer Brand Tag */}
      <Box
        sx={{
          p: 2,
          m: 1.5,
          borderRadius: 2.5,
          bgcolor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: '#F59E0B', fontWeight: 800, display: 'block', fontSize: 11 }}
        >
          Gujarat Energy Dev. Agency
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>
          Solar IoT SCADA Portal v2.0
        </Typography>
      </Box>
    </Box>
  )
}
