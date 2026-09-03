import { Box, Paper, Skeleton, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AlertTrendPointDto } from '../../../types/health'
import { severityColors } from '../../../theme/theme'
import { formatDate } from '../../../utils/formatters'

interface AlertTrendChartProps {
  data: AlertTrendPointDto[]
  loading: boolean
}

export function AlertTrendChart({ data, loading }: AlertTrendChartProps) {
  const chartData = data.map((d) => ({
    label: formatDate(d.date).replace(/ \d{4}$/, ''),
    High: d.highCount,
    Med: d.medCount,
    Low: d.lowCount,
  }))
  const hasData = chartData.some((d) => d.High + d.Med + d.Low > 0)

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <TrendingUpIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Alert Trend (Last 7 Days)
        </Typography>
      </Box>

      {loading && <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 1 }} />}

      {!loading && !hasData && (
        <Box sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No alerts recorded in this period.
          </Typography>
        </Box>
      )}

      {!loading && hasData && (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#5B6B82' }} />
            <YAxis tick={{ fontSize: 11, fill: '#5B6B82' }} width={32} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#E3E8EF' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="High" stackId="sev" fill={severityColors.HIGH} radius={[0, 0, 0, 0]} />
            <Bar dataKey="Med" stackId="sev" fill={severityColors.MED} radius={[0, 0, 0, 0]} />
            <Bar dataKey="Low" stackId="sev" fill={severityColors.LOW} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  )
}
