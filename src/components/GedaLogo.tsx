import { Box, Typography } from '@mui/material'

interface GedaLogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'compact'
  size?: 'small' | 'medium' | 'large'
  colorMode?: 'dark' | 'light'
}

/** Official GEDA Emblem: Orange Spiral Sun + Wave Ring + Green Leaves Ring */
export function GedaEmblem({ size = 48 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: '#FFFFFF',
        boxShadow: '0 4px 14px rgba(242, 101, 34, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        p: 0.5,
      }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size * 0.9}
        height={size * 0.9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(60, 60)">
          {/* 1. Outer Ring of 16 Green Leaves */}
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(0)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(22.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(45)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(67.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(90)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(112.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(135)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(157.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(180)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(202.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(225)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(247.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(270)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(292.5)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(315)" />
          <path d="M 0 -52 C 5 -46 5 -38 0 -34 C -5 -38 -5 -46 0 -52 Z" fill="#4CAF50" transform="rotate(337.5)" />

          {/* 2. Middle Wavy Cyan Water/Energy Ring */}
          <circle cx="0" cy="0" r="37" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 3" />
          <circle cx="0" cy="0" r="33" fill="none" stroke="#7DD3FC" strokeWidth="1.5" />

          {/* 3. Inner Orange Sunburst Rays (12 Rays) */}
          <g fill="#F26522">
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(0)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(30)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(60)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(90)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(120)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(150)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(180)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(210)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(240)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(270)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(300)" />
            <polygon points="0,-28 -4,-18 4,-18" transform="rotate(330)" />
          </g>

          {/* 4. Sun Ring & Spiral Core */}
          <circle cx="0" cy="0" r="17" fill="none" stroke="#F26522" strokeWidth="3" />
          <path
            d="M 0 0 C 4 -6 10 -4 10 2 C 10 8 2 12 -4 8 C -10 4 -8 -6 -2 -10 C 6 -14 14 -8 14 0"
            fill="none"
            stroke="#F26522"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </Box>
  )
}

export function GedaLogo({
  variant = 'horizontal',
  size = 'medium',
  colorMode = 'dark',
}: GedaLogoProps) {
  const isLight = colorMode === 'light'
  const subtextColor = isLight ? '#475569' : 'rgba(255,255,255,0.75)'
  const agencyTitleColor = '#38BDF8'

  const emblemSizes = {
    small: 36,
    medium: 44,
    large: 54,
  }
  const emblemSize = emblemSizes[size]

  if (variant === 'icon') {
    return <GedaEmblem size={emblemSize} />
  }

  if (variant === 'compact') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <GedaEmblem size={38} />
        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 900,
                letterSpacing: 1,
                color: '#F26522',
                lineHeight: 1,
                fontSize: 17,
              }}
            >
              Solar IoT
            </Typography>
            <Box
              sx={{
                bgcolor: '#F26522',
                color: '#FFFFFF',
                px: 0.8,
                py: 0.2,
                borderRadius: 4,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 0.5,
              }}
            >
              SCADA
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: agencyTitleColor,
              fontWeight: 700,
              fontSize: 11,
              lineHeight: 1.2,
              mt: 0.2,
            }}
          >
            Gujarat Energy Development Agency
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
      <GedaEmblem size={emblemSize} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            sx={{
              fontSize: size === 'large' ? 28 : size === 'medium' ? 24 : 20,
              fontWeight: 900,
              letterSpacing: 1.5,
              color: '#F26522',
              lineHeight: 1,
            }}
          >
            Solar IoT
          </Typography>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #F26522 0%, #EA580C 100%)',
              color: '#FFFFFF',
              px: 1,
              py: 0.3,
              borderRadius: 5,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.6,
              boxShadow: '0 2px 6px rgba(242, 101, 34, 0.35)',
            }}
          >
            SCADA SaaS
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: size === 'large' ? 14 : 12.5,
            fontWeight: 700,
            color: agencyTitleColor,
            letterSpacing: 0.3,
            mt: 0.4,
          }}
        >
          Gujarat Energy Development Agency
        </Typography>

        {variant === 'full' && (
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 500,
              color: subtextColor,
              mt: 0.2,
            }}
          >
            State Nodal Agency for Renewable Energy • Govt. of Gujarat
          </Typography>
        )}
      </Box>
    </Box>
  )
}
