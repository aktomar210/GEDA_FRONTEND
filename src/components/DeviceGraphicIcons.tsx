import { Box } from '@mui/material'

interface GraphicIconProps {
  size?: number
  active?: boolean
}

export function SolarInverterGraphic({ size = 48, active = false }: GraphicIconProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2.5,
        background: active
          ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
          : 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active
          ? '0 6px 16px rgba(245, 158, 11, 0.4)'
          : '0 2px 8px rgba(245, 158, 11, 0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        {/* Solar Panel & Inverter Icon */}
        <rect
          x="3"
          y="4"
          width="18"
          height="11"
          rx="2"
          stroke={active ? '#FFFFFF' : '#D97706'}
          strokeWidth="2"
          fill={active ? 'rgba(255,255,255,0.2)' : '#FFFBEB'}
        />
        <path
          d="M 3 9.5 H 21 M 9 4 V 15 M 15 4 V 15"
          stroke={active ? '#FFFFFF' : '#D97706'}
          strokeWidth="1.5"
        />
        <path
          d="M 8 19 L 12 15 L 16 19"
          stroke={active ? '#FFFFFF' : '#B45309'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="19" r="1.5" fill={active ? '#FFFFFF' : '#B45309'} />
      </svg>
    </Box>
  )
}

export function WindTurbineGraphic({ size = 48, active = false }: GraphicIconProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2.5,
        background: active
          ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
          : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active
          ? '0 6px 16px rgba(16, 185, 129, 0.4)'
          : '0 2px 8px rgba(16, 185, 129, 0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        {/* Tower */}
        <path
          d="M 12 10 V 21 M 10 21 H 14"
          stroke={active ? '#FFFFFF' : '#047857'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Hub */}
        <circle cx="12" cy="10" r="2.5" fill={active ? '#FFFFFF' : '#047857'} />
        {/* Blades */}
        <path
          d="M 12 10 C 12 5, 15 3, 13 1 C 10 4, 11 8, 12 10 Z"
          fill={active ? '#FFFFFF' : '#047857'}
        />
        <path
          d="M 12 10 C 16 13, 19 15, 21 12 C 17 11, 14 11, 12 10 Z"
          fill={active ? '#FFFFFF' : '#047857'}
        />
        <path
          d="M 12 10 C 7 13, 5 17, 3 16 C 6 13, 9 11, 12 10 Z"
          fill={active ? '#FFFFFF' : '#047857'}
        />
      </svg>
    </Box>
  )
}

export function SmartMeterGraphic({ size = 48, active = false }: GraphicIconProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2.5,
        background: active
          ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)'
          : 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active
          ? '0 6px 16px rgba(2, 132, 199, 0.4)'
          : '0 2px 8px rgba(2, 132, 199, 0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="3"
          stroke={active ? '#FFFFFF' : '#0284C7'}
          strokeWidth="2"
          fill={active ? 'rgba(255,255,255,0.2)' : '#F0F9FF'}
        />
        {/* Screen */}
        <rect
          x="8"
          y="6"
          width="8"
          height="5"
          rx="1"
          fill={active ? '#FFFFFF' : '#0284C7'}
        />
        {/* Lightning Spark */}
        <path
          d="M 12 13.5 L 10.5 16 H 13 L 11.5 18.5"
          stroke={active ? '#FDE047' : '#0284C7'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}

export function GatewayGraphic({ size = 48, active = false }: GraphicIconProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2.5,
        background: active
          ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
          : 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active
          ? '0 6px 16px rgba(139, 92, 246, 0.4)'
          : '0 2px 8px rgba(139, 92, 246, 0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="11"
          width="16"
          height="9"
          rx="2"
          stroke={active ? '#FFFFFF' : '#6D28D9'}
          strokeWidth="2"
          fill={active ? 'rgba(255,255,255,0.2)' : '#F5F3FF'}
        />
        {/* Antennas */}
        <path
          d="M 7 11 V 5 M 17 11 V 5"
          stroke={active ? '#FFFFFF' : '#6D28D9'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* WiFi Signal Waves */}
        <path
          d="M 5 3 C 8 1, 16 1, 19 3"
          stroke={active ? '#DDD6FE' : '#6D28D9'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="9" cy="15.5" r="1" fill={active ? '#34D399' : '#10B981'} />
        <circle cx="12" cy="15.5" r="1" fill={active ? '#34D399' : '#10B981'} />
        <circle cx="15" cy="15.5" r="1" fill={active ? '#F59E0B' : '#F59E0B'} />
      </svg>
    </Box>
  )
}
