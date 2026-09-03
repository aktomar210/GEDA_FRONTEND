import { Box, Paper, Skeleton, Typography } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChartOutlined'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PlantGenerationDto } from '../../../types/analytics'
import { formatEnergy } from '../../../utils/formatters'

interface PlantComparisonChartProps {
  data: PlantGenerationDto[]
  loading: boolean
}

export function PlantComparisonChart({ data, loading }: PlantComparisonChartProps) {
  const chartData = data.map((p) => ({
    label: p.plantName.replace(' Plant', ' Plt'),
    kwh: p.totalKwhToday,
  }))

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <BarChartIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Plant-wise Generation Comparison (Today)
        </Typography>
      </Box>

      {loading && <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />}

      {!loading && chartData.length === 0 && (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No generation data available.
          </Typography>
        </Box>
      )}

      {!loading && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: '#5B6B82' }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#5B6B82' }}
              width={56}
              label={{ value: 'kWh', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#5B6B82' }}
            />
            <Tooltip
              formatter={(value) => [formatEnergy(Number(value)), 'Generation']}
              contentStyle={{ borderRadius: 8, borderColor: '#E3E8EF' }}
            />
            <Bar dataKey="kwh" fill="#0B2545" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  )
}
