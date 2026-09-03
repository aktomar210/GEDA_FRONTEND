import { Box, Paper, Typography } from '@mui/material'
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
import { plantGenerationData } from '../mockData'

export function PlantGenerationChart() {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <BarChartIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Plant-wise Generation Comparison
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={plantGenerationData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" />
          <XAxis dataKey="plant" tick={{ fontSize: 11, fill: '#5B6B82' }} />
          <YAxis
            tick={{ fontSize: 11, fill: '#5B6B82' }}
            width={48}
            label={{ value: 'MWh', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#5B6B82' }}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString('en-IN')} MWh`, 'Generation']}
            contentStyle={{ borderRadius: 8, borderColor: '#E3E8EF' }}
          />
          <Bar dataKey="generationMwh" fill="#0B2545" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}
