import {
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { UserRow } from '../mockData'

interface UserTableProps {
  rows: UserRow[]
  onToggleStatus: (row: UserRow) => void
  onDelete: (row: UserRow) => void
}

export function UserTable({ rows, onToggleStatus, onDelete }: UserTableProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        User Directory
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Hierarchy Scope</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="center">2FA</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.hierarchyScope}</TableCell>
                <TableCell>{row.lastLogin}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.twoFactorEnabled ? 'On' : 'Off'}
                    size="small"
                    sx={{
                      bgcolor: row.twoFactorEnabled ? 'rgba(46,125,50,0.12)' : 'rgba(91,107,130,0.12)',
                      color: row.twoFactorEnabled ? '#2E7D32' : '#5B6B82',
                      fontWeight: 700,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Click to toggle Active / Inactive">
                    <Chip
                      label={row.status}
                      size="small"
                      onClick={() => onToggleStatus(row)}
                      sx={{
                        bgcolor: row.status === 'Active' ? 'rgba(46,125,50,0.12)' : 'rgba(198,40,40,0.12)',
                        color: row.status === 'Active' ? '#2E7D32' : '#C62828',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title="Remove user">
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
                  <Stack sx={{ py: 3, alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No users found.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
