import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { TagRow } from '../mockData'

interface TagTableProps {
  rows: TagRow[]
  maxCount: number
  onEdit: (row: TagRow) => void
  onDelete: (row: TagRow) => void
}

export function TagTable({ rows, maxCount, onEdit, onDelete }: TagTableProps) {
  return (
    <Paper variant="outlined">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {rows.length} of {maxCount} max tags configured
        </Typography>
        <Chip
          label={`${rows.length}/${maxCount}`}
          size="small"
          sx={{ fontWeight: 700, bgcolor: 'rgba(11,37,69,0.08)', color: 'primary.main' }}
        />
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F6F9' }}>
              <TableCell sx={{ fontWeight: 700 }}>Tag Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Register / Address</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Data Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Scaling</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Alarm Threshold</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.tagName}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {row.register}
                  </Typography>
                </TableCell>
                <TableCell>{row.dataType}</TableCell>
                <TableCell>{row.scaling}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>
                  {row.alarmThreshold !== '—' ? (
                    <Chip
                      label={row.alarmThreshold}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(198,40,40,0.08)',
                        color: 'error.main',
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      —
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit tag">
                      <IconButton size="small" onClick={() => onEdit(row)}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete tag">
                      <IconButton size="small" onClick={() => onDelete(row)}>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No tags configured in this tab yet.
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
