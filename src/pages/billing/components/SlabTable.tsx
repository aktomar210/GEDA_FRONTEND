import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { SlabRow } from '../mockData'

interface SlabTableProps {
  rows: SlabRow[]
}

export function SlabTable({ rows }: SlabTableProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        SLA Compliance Breakdown by Device Slab
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Slab</TableCell>
              <TableCell align="right">Devices Billed</TableCell>
              <TableCell align="right">Avg. Uptime</TableCell>
              <TableCell align="right">Rate/Device</TableCell>
              <TableCell align="right">Slab Value</TableCell>
              <TableCell align="right">Deduction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.slab}</TableCell>
                <TableCell align="right">{row.devicesBilled.toLocaleString('en-IN')}</TableCell>
                <TableCell align="right">{row.avgUptime}</TableCell>
                <TableCell align="right">{row.ratePerDevice}</TableCell>
                <TableCell align="right">{row.slabValue}</TableCell>
                <TableCell align="right" sx={{ color: 'error.main', fontWeight: 600 }}>
                  {row.deduction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
