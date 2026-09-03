import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { AlertRow, AlertSeverityFull, AlertStatus } from '../mockData'

const severityStyles: Record<AlertSeverityFull, { label: string; color: string }> = {
  HIGH: { label: 'CRITICAL', color: '#C62828' },
  MED: { label: 'WARNING', color: '#ED6C02' },
  LOW: { label: 'LOW', color: '#78909C' },
  INFO: { label: 'INFO', color: '#0B2545' },
}

const statusStyles: Record<AlertStatus, { color: string; bg: string }> = {
  Open: { color: '#C62828', bg: 'rgba(198,40,40,0.08)' },
  Acknowledged: { color: '#ED6C02', bg: 'rgba(237,108,2,0.08)' },
  Resolved: { color: '#2E7D32', bg: 'rgba(46,125,50,0.08)' },
}

interface AlertsTableProps {
  rows: AlertRow[]
  onAcknowledge: (row: AlertRow) => void
  onResolve: (row: AlertRow) => void
}

export function AlertsTable({ rows, onAcknowledge, onResolve }: AlertsTableProps) {
  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F6F9' }}>
              <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Severity</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Device / Plant</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Alert Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Assigned To</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Typography variant="body2" color="text.secondary">
                    {row.time}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={severityStyles[row.severity].label}
                    size="small"
                    sx={{
                      bgcolor: `${severityStyles[row.severity].color}1A`,
                      color: severityStyles[row.severity].color,
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  />
                </TableCell>
                <TableCell>{row.device}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: statusStyles[row.status].bg,
                      color: statusStyles[row.status].color,
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell>{row.assignedTo}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                    {row.status === 'Open' && (
                      <Button size="small" onClick={() => onAcknowledge(row)}>
                        Acknowledge
                      </Button>
                    )}
                    {row.status !== 'Resolved' && (
                      <Button size="small" color="success" onClick={() => onResolve(row)}>
                        Resolve
                      </Button>
                    )}
                    {row.status === 'Resolved' && (
                      <Typography variant="caption" color="text.secondary">
                        —
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No alerts match the selected filters.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
