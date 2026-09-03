import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined'

interface DistrictRank {
  rank: number
  name: string
  solarMw: string
  windMw: string
  totalMwh: string
  percentage: number
}

const districtData: DistrictRank[] = [
  { rank: 1, name: 'Kutch District', solarMw: '1,850 MW', windMw: '2,400 MW', totalMwh: '18,420 MWh', percentage: 94 },
  { rank: 2, name: 'Patan (Charanka Park)', solarMw: '1,200 MW', windMw: '150 MW', totalMwh: '12,180 MWh', percentage: 86 },
  { rank: 3, name: 'Rajkot District', solarMw: '640 MW', windMw: '820 MW', totalMwh: '7,450 MWh', percentage: 72 },
  { rank: 4, name: 'Bhavnagar District', solarMw: '520 MW', windMw: '610 MW', totalMwh: '5,890 MWh', percentage: 65 },
  { rank: 5, name: 'Banaskantha', solarMw: '480 MW', windMw: '220 MW', totalMwh: '3,920 MWh', percentage: 55 },
]

export function DistrictLeaderboard() {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0B2545' }}>
              Top Gujarat Renewable Districts
            </Typography>
          </Stack>
          <Chip label="State Rank" size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 800, fontSize: 11 }} />
        </Box>

        <Stack spacing={2}>
          {districtData.map((d) => (
            <Box
              key={d.rank}
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                bgcolor: '#F8FAFC',
                border: '1px solid #E2E8F0',
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 0.8 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: d.rank === 1 ? '#F59E0B' : d.rank === 2 ? '#94A3B8' : '#CBD5E1',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {d.rank}
                </Box>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }} noWrap>
                    {d.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Solar: {d.solarMw} • Wind: {d.windMw}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#0B2545' }}>
                    {d.totalMwh}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                    Active
                  </Typography>
                </Box>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={d.percentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#E2E8F0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: d.rank === 1 ? '#F59E0B' : '#0B2545',
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
