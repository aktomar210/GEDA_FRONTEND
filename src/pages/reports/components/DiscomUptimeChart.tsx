import { Box, Paper, Typography } from '@mui/material'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { discomUptimeData } from '../mockData'

export function DiscomUptimeChart() {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <WifiOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Communication Uptime by DISCOM (SLA)
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={discomUptimeData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" />
          <XAxis dataKey="discom" tick={{ fontSize: 11, fill: '#5B6B82' }} />
          <YAxis
            domain={[90, 100]}
            tick={{ fontSize: 11, fill: '#5B6B82' }}
            width={44}
            label={{ value: '%', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#5B6B82' }}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Uptime']}
            contentStyle={{ borderRadius: 8, borderColor: '#E3E8EF' }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine y={98} stroke="#C62828" strokeDasharray="4 4" label={{ value: 'SLA Target 98%', position: 'insideTopRight', fontSize: 10, fill: '#C62828' }} />
          <Bar dataKey="uptimePercent" name="Actual Uptime" fill="#C9932E" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}
