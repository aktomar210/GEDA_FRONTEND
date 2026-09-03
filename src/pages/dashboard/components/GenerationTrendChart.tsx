import { Box, Paper, Skeleton, Typography } from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChartOutlined'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { GenerationTrendPoint } from '../../../types/dashboard'
import { formatHourLabel } from '../../../utils/formatters'

interface ChartDatum {
  label: string
  kwh: number
}

interface GenerationTrendChartProps {
  data: GenerationTrendPoint[]
  loading: boolean
}

export function GenerationTrendChart({ data, loading }: GenerationTrendChartProps) {
  const chartData: ChartDatum[] = data.map((point) => ({
    label: formatHourLabel(point.timestamp),
    kwh: point.kwh,
  }))

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <ShowChartIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Generation Trend (Last 24h)
        </Typography>
      </Box>

      {loading && <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 1 }} />}

      {!loading && chartData.length === 0 && (
        <Box
          sx={{
            height: 280,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No generation data available for this period.
          </Typography>
        </Box>
      )}

      {!loading && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#5B6B82' }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#5B6B82' }}
              width={56}
              label={{ value: 'kWh', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#5B6B82' }}
            />
            <Tooltip
              formatter={(value) => [`${Number(value).toLocaleString('en-IN')} kWh`, 'Generation']}
              labelFormatter={(label) => `Hour: ${label}`}
              contentStyle={{ borderRadius: 8, borderColor: '#E3E8EF' }}
            />
            <Line
              type="monotone"
              dataKey="kwh"
              stroke="#C9932E"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  )
}
