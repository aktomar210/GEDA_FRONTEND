import { createTheme } from '@mui/material/styles'

// GEDA SCADA SaaS Platform brand palette (from Gujarat Energy Development Agency identity)
const NAVY = '#0B2545'
const NAVY_DARK = '#081B34'
const NAVY_LIGHT = '#13335F'
const GOLD = '#C9932E'
const GOLD_DARK = '#A8781F'
const EMERALD = '#10B981'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: NAVY,
      dark: NAVY_DARK,
      light: NAVY_LIGHT,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: GOLD,
      dark: GOLD_DARK,
      light: '#F59E0B',
      contrastText: '#0B2545',
    },
    background: {
      default: '#F1F5F9',
      paper: '#FFFFFF',
    },
    success: {
      main: EMERALD,
      light: '#D1FAE5',
      dark: '#047857',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#B45309',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
      dark: '#B91C1C',
    },
    info: {
      main: '#0284C7',
      light: '#E0F2FE',
      dark: '#0369A1',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      'Plus Jakarta Sans',
      'Inter',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F1F5F9',
          color: '#0F172A',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: NAVY,
          backgroundImage: 'linear-gradient(135deg, #0B2545 0%, #13335F 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(11, 37, 69, 0.15)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: NAVY_DARK,
          backgroundImage: 'linear-gradient(180deg, #081B34 0%, #0B2545 100%)',
          color: '#FFFFFF',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          padding: '8px 18px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            background: 'linear-gradient(135deg, #F59E0B 0%, #C9932E 100%)',
            color: '#0B2545',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(201, 147, 46, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #D97706 0%, #A8781F 100%)',
              boxShadow: '0 6px 16px rgba(201, 147, 46, 0.45)',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'linear-gradient(135deg, #0B2545 0%, #13335F 100%)',
            boxShadow: '0 4px 12px rgba(11, 37, 69, 0.25)',
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 14,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
        },
      },
    },
  },
})

export const statusColors = {
  ONLINE: '#10B981',
  WARNING: '#F59E0B',
  OFFLINE: '#EF4444',
} as const

export const certStatusColors = {
  VALID: '#10B981',
  EXPIRING: '#F59E0B',
  EXPIRED: '#EF4444',
} as const

export const severityColors = {
  HIGH: '#EF4444',
  MED: '#F59E0B',
  LOW: '#64748B',
} as const
