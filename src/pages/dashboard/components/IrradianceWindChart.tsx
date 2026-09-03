import { Box, Card, CardContent, Typography } from '@mui/material'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const mockWeatherGenerationData = [
  { time: '06:00', generation: 120, irradiance: 150, windSpeed: 4.2 },
  { time: '08:00', generation: 850, irradiance: 420, windSpeed: 5.1 },
  { time: '10:00', generation: 2400, irradiance: 780, windSpeed: 6.0 },
  { time: '12:00', generation: 4850, irradiance: 950, windSpeed: 6.8 },
  { time: '14:00', generation: 4200, irradiance: 860, windSpeed: 7.2 },
  { time: '16:00', generation: 2900, irradiance: 610, windSpeed: 8.0 },
  { time: '18:00', generation: 1100, irradiance: 210, windSpeed: 8.5 },
  { time: '20:00', generation: 650, irradiance: 0, windSpeed: 7.8 },
]

export function IrradianceWindChart() {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0B2545' }}>
              Solar Irradiance &amp; Wind Telemetry vs Generation Output
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Correlating GEDA pyranometer radiation (W/m²) &amp; anemometer wind speed (m/s) with power output
            </Typography>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={mockWeatherGenerationData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B2545" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0B2545" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorIrr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="generation"
              name="Generation Output (kWh)"
              stroke="#0B2545"
              fillOpacity={1}
              fill="url(#colorGen)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="irradiance"
              name="Solar Irradiance (W/m²)"
              stroke="#F59E0B"
              fillOpacity={1}
              fill="url(#colorIrr)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
