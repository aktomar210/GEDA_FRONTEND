import { Box, Paper, Skeleton, Typography } from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLargeOutlined'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { DeviceStatusBreakdownDto } from '../../../types/health'
import { statusColors } from '../../../theme/theme'
import { formatCount } from '../../../utils/formatters'

interface DeviceStatusDonutProps {
  data: DeviceStatusBreakdownDto | null
  loading: boolean
}

export function DeviceStatusDonut({ data, loading }: DeviceStatusDonutProps) {
  const chartData = data
    ? [
        { name: 'Online', value: data.online, color: statusColors.ONLINE },
        { name: 'Warning', value: data.warning, color: statusColors.WARNING },
        { name: 'Offline', value: data.offline, color: statusColors.OFFLINE },
      ]
    : []
  const total = chartData.reduce((sum, d) => sum + d.value, 0)

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <DonutLargeIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Device Status Breakdown
        </Typography>
      </Box>

      {loading && <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 1 }} />}

      {!loading && total === 0 && (
        <Box sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No device data available.
          </Typography>
        </Box>
      )}

      {!loading && total > 0 && (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCount(Number(value))} />
            <Legend verticalAlign="bottom" height={32} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  )
}
