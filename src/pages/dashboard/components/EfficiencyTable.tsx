import {
  Box,
  LinearProgress,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import SpeedIcon from '@mui/icons-material/SpeedOutlined'
import type { PlantEfficiencyDto } from '../../../types/analytics'
import { formatPercent } from '../../../utils/formatters'

interface EfficiencyTableProps {
  data: PlantEfficiencyDto[]
  loading: boolean
}

export function EfficiencyTable({ data, loading }: EfficiencyTableProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <SpeedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Plant Efficiency — CUF % &amp; Performance Ratio
        </Typography>
      </Box>

      {loading && <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 1 }} />}

      {!loading && data.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No efficiency data available.
        </Typography>
      )}

      {!loading && data.length > 0 && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Plant</TableCell>
                <TableCell align="right">CUF %</TableCell>
                <TableCell sx={{ width: 180 }}>Performance Ratio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.plantId} hover>
                  <TableCell>{row.plantName}</TableCell>
                  <TableCell align="right">{formatPercent(row.cufPercent)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(row.performanceRatio, 100)}
                        sx={{
                          flexGrow: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'rgba(11,37,69,0.08)',
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>
                        {formatPercent(row.performanceRatio, 0)}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}
