import { Box, Paper, Stack, Typography } from '@mui/material'
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
import type { TrendPoint } from '../mockData'

interface ScadaTrendChartProps {
  data: TrendPoint[]
}

export function ScadaTrendChart({ data }: ScadaTrendChartProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
        <ShowChartIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Trend — Last 6 Hours
        </Typography>
      </Stack>
      <Box sx={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#5B6B82' }} />
            <YAxis
              tick={{ fontSize: 11, fill: '#5B6B82' }}
              width={40}
              label={{ value: 'kW', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#5B6B82' }}
            />
            <Tooltip
              formatter={(value) => [`${value} kW`, 'AC Power']}
              contentStyle={{ borderRadius: 8, borderColor: '#E3E8EF' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#C9932E"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}
