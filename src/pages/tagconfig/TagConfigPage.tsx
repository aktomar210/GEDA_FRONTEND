import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import TuneIcon from '@mui/icons-material/TuneOutlined'
import AddIcon from '@mui/icons-material/AddOutlined'
import {
  alarmEventTags as initialAlarmEventTags,
  archivalTags as initialArchivalTags,
  deviceOptions,
  hardTags as initialHardTags,
  softTags as initialSoftTags,
} from './mockData'
import type { TagRow } from './mockData'
import { TagTable } from './components/TagTable'
import { AddEditTagForm } from './components/AddEditTagForm'
import type { TagFormValues } from './components/AddEditTagForm'
import { ConfirmDialog } from '../../components/ConfirmDialog'

// Each tab keeps its own React state, seeded from the mock arrays. A page
// refresh remounts this component and re-seeds from the static imports, so
// nothing here persists — exactly the "session only" behaviour requested.
interface TabState {
  label: string
  rows: TagRow[]
  max: number
}

let nextTagId = 1000 // client-side id generator for newly added tags across all tabs

export function TagConfigPage() {
  // Device selector is kept for visual/UX completeness but stays cosmetic —
  // there is only one mock tag set in this demo, so switching devices does
  // not load different tags.
  const [deviceId, setDeviceId] = useState(deviceOptions[0].id)
  const [tabIndex, setTabIndex] = useState(0)

  const [tabs, setTabs] = useState<TabState[]>([
    { label: 'Hard Tags (100 max)', rows: initialHardTags, max: 100 },
    { label: 'Soft Tags (10 max)', rows: initialSoftTags, max: 10 },
    { label: 'Archival Tags (20 max)', rows: initialArchivalTags, max: 20 },
    { label: 'Alarms/Events (20 max)', rows: initialAlarmEventTags, max: 20 },
  ])

  const [editingTagId, setEditingTagId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TagRow | null>(null)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const handleTabChange = (_: SyntheticEvent, value: number) => {
    setTabIndex(value)
    setEditingTagId(null)
  }

  const activeTab = tabs[tabIndex]
  const editingTag = editingTagId !== null ? activeTab.rows.find((r) => r.id === editingTagId) ?? null : null

  const updateActiveTabRows = (updater: (rows: TagRow[]) => TagRow[]) => {
    setTabs((prev) =>
      prev.map((tab, idx) => (idx === tabIndex ? { ...tab, rows: updater(tab.rows) } : tab)),
    )
  }

  const handleSaveTag = (values: TagFormValues) => {
    if (editingTag) {
      updateActiveTabRows((rows) =>
        rows.map((r) => (r.id === editingTag.id ? { ...r, ...values } : r)),
      )
      setEditingTagId(null)
      setSnackbarMessage(`"${values.tagName}" updated`)
    } else {
      const newRow: TagRow = { id: nextTagId++, ...values }
      updateActiveTabRows((rows) => [...rows, newRow])
      setSnackbarMessage(`"${values.tagName}" added to ${activeTab.label.split(' (')[0]}`)
    }
  }

  const handleEditRequest = (row: TagRow) => setEditingTagId(row.id)
  const handleCancelEdit = () => setEditingTagId(null)

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    updateActiveTabRows((rows) => rows.filter((r) => r.id !== deleteTarget.id))
    if (editingTagId === deleteTarget.id) setEditingTagId(null)
    setSnackbarMessage(`"${deleteTarget.tagName}" removed`)
    setDeleteTarget(null)
  }

  const handleAddTagClick = () => {
    setTabIndex(0)
    setEditingTagId(null)
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
            <TuneIcon color="primary" fontSize="small" />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              SCADA Tag Configuration
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Configure Hard Tags, Soft Tags, Archival Tags, and Alarms/Events per device.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleAddTagClick}
        >
          + Add Tag
        </Button>
      </Stack>

      <TextField
        select
        label="Device"
        size="small"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        sx={{ minWidth: 280, mb: 3 }}
      >
        {deviceOptions.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{ mb: 2, borderBottom: '1px solid #E3E8EF' }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} />
        ))}
      </Tabs>

      <TagTable
        rows={activeTab.rows}
        maxCount={activeTab.max}
        onEdit={handleEditRequest}
        onDelete={setDeleteTarget}
      />

      <AddEditTagForm
        editingTag={editingTag}
        atCapacity={activeTab.rows.length >= activeTab.max}
        onSave={handleSaveTag}
        onCancelEdit={handleCancelEdit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Tag"
        description={
          <>
            Remove tag <strong>{deleteTarget?.tagName}</strong> from{' '}
            {activeTab.label.split(' (')[0]}? This only affects the in-session demo state.
          </>
        }
        confirmLabel="Delete"
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
