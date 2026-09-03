import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material'
import type { ComponentType } from 'react'
import type { SvgIconProps } from '@mui/material'

interface KpiCardProps {
  label: string
  value: string
  icon: ComponentType<SvgIconProps>
  accentColor: string
  loading?: boolean
  helperText?: string
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  accentColor,
  loading,
  helperText,
}: KpiCardProps) {
  const renderFormattedValue = (val: string) => {
    if (val.includes('/')) {
      const parts = val.split('/')
      const mainNum = parts[0]
      const unit = parts.slice(1).join('/')
      return (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, flexWrap: 'wrap' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 20, md: 22 },
              color: '#0F172A',
              lineHeight: 1.2,
            }}
          >
            {mainNum}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: 12.5,
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            /{unit}
          </Typography>
        </Box>
      )
    }

    return (
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          fontSize: val.length > 9 ? { xs: 18, md: 20 } : { xs: 22, md: 24 },
          color: '#0F172A',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {val}
      </Typography>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.25, '&:last-child': { pb: 2.25 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ fontWeight: 600, fontSize: 13, mb: 0.75 }}
            >
              {label}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={90} height={36} />
            ) : (
              renderFormattedValue(value)
            )}
            {helperText && !loading && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                {helperText}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              bgcolor: `${accentColor}1A`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accentColor,
              flexShrink: 0,
            }}
          >
            <Icon fontSize="medium" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
