import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/CheckOutlined'
import RemoveIcon from '@mui/icons-material/RemoveOutlined'
import { roleColumns, type PermissionRow } from '../mockData'

interface PermissionMatrixProps {
  rows: PermissionRow[]
}

export function PermissionMatrix({ rows }: PermissionMatrixProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Role Permission Matrix
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Permission</TableCell>
              {roleColumns.map((role) => (
                <TableCell key={role} align="center">
                  {role}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.permission} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.permission}</TableCell>
                {roleColumns.map((role) => (
                  <TableCell key={role} align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {row.grants[role] ? (
                        <CheckIcon fontSize="small" sx={{ color: '#2E7D32' }} />
                      ) : (
                        <RemoveIcon fontSize="small" sx={{ color: '#C0C7D1' }} />
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
