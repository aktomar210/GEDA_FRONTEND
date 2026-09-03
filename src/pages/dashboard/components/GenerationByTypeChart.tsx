import { Box, Paper, Skeleton, Typography } from '@mui/material'
import PieChartIcon from '@mui/icons-material/PieChartOutlined'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { GenerationByTypeDto } from '../../../types/analytics'
import { formatEnergy } from '../../../utils/formatters'

interface GenerationByTypeChartProps {
  data: GenerationByTypeDto[]
  loading: boolean
}

const TYPE_LABELS: Record<string, string> = {
  SOLAR_RMS: 'Solar RMS',
  WIND_RMS: 'Wind RMS',
  HYBRID_RMS: 'Hybrid RMS',
}

// Validated categorical slots (light mode): blue / orange / aqua.
const TYPE_COLORS: Record<string, string> = {
  SOLAR_RMS: '#1F6FEB',
  WIND_RMS: '#E8710A',
  HYBRID_RMS: '#0D9488',
}

export function GenerationByTypeChart({ data, loading }: GenerationByTypeChartProps) {
  const chartData = data.map((d) => ({
    name: TYPE_LABELS[d.deviceType] ?? d.deviceType,
    value: d.totalKwhToday,
    color: TYPE_COLORS[d.deviceType] ?? '#5B6B82',
  }))

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <PieChartIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Generation by Device Type (Today)
        </Typography>
      </Box>

      {loading && <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />}

      {!loading && chartData.every((d) => d.value === 0) && (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No generation data available.
          </Typography>
        </Box>
      )}

      {!loading && chartData.some((d) => d.value > 0) && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatEnergy(Number(value))} />
            <Legend verticalAlign="bottom" height={32} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  )
}
