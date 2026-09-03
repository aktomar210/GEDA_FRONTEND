import { useState } from 'react'
import { Box, Button, Snackbar, Stack, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/GroupOutlined'
import AddIcon from '@mui/icons-material/AddOutlined'
import { permissionMatrix, userRows as initialUserRows } from './mockData'
import type { UserRow } from './mockData'
import { UserTable } from './components/UserTable'
import { PermissionMatrix } from './components/PermissionMatrix'
import { AddUserModal } from './components/AddUserModal'
import { ConfirmDialog } from '../../components/ConfirmDialog'

let nextUserId = 1000

export function UsersRolesPage() {
  const [userRows, setUserRows] = useState<UserRow[]>(initialUserRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const handleCreate = (user: Omit<UserRow, 'id' | 'lastLogin'>) => {
    setUserRows((prev) => [...prev, { id: nextUserId++, lastLogin: 'Never', ...user }])
    setModalOpen(false)
    setSnackbarMessage(`"${user.name}" added to the user directory`)
  }

  const handleToggleStatus = (row: UserRow) => {
    setUserRows((prev) =>
      prev.map((u) =>
        u.id === row.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u,
      ),
    )
    setSnackbarMessage(`"${row.name}" marked ${row.status === 'Active' ? 'Inactive' : 'Active'}`)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    setUserRows((prev) => prev.filter((u) => u.id !== deleteTarget.id))
    setSnackbarMessage(`"${deleteTarget.name}" removed`)
    setDeleteTarget(null)
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <GroupIcon color="primary" fontSize="small" />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Users &amp; Roles
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            User directory, hierarchy scope, and role-based access control.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{
            whiteSpace: 'nowrap',
            flexShrink: 0,
            alignSelf: 'flex-start',
            px: 2.5,
            py: 1,
            fontWeight: 800,
          }}
        >
          Add User
        </Button>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <UserTable rows={userRows} onToggleStatus={handleToggleStatus} onDelete={setDeleteTarget} />
      </Box>

      <PermissionMatrix rows={permissionMatrix} />

      <AddUserModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove User"
        description={
          <>
            Remove <strong>{deleteTarget?.name}</strong> from the user directory? This only affects
            the in-session demo state.
          </>
        }
        confirmLabel="Remove"
        confirmColor="error"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
