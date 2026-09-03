import { useEffect, useState } from 'react'
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import { dataTypeOptions } from '../mockData'
import type { TagRow } from '../mockData'

export interface TagFormValues {
  tagName: string
  register: string
  dataType: string
  scaling: string
  unit: string
  alarmThreshold: string
}

interface AddEditTagFormProps {
  editingTag: TagRow | null
  atCapacity: boolean
  onSave: (values: TagFormValues) => void
  onCancelEdit: () => void
}

const emptyForm: TagFormValues = {
  tagName: '',
  register: '',
  dataType: 'Float32',
  scaling: '',
  unit: '',
  alarmThreshold: '',
}

export function AddEditTagForm({ editingTag, atCapacity, onSave, onCancelEdit }: AddEditTagFormProps) {
  const [form, setForm] = useState<TagFormValues>(emptyForm)
  const [errors, setErrors] = useState<{ tagName?: string; register?: string }>({})

  const isEditMode = Boolean(editingTag)

  useEffect(() => {
    if (editingTag) {
      setForm({
        tagName: editingTag.tagName,
        register: editingTag.register,
        dataType: editingTag.dataType,
        scaling: editingTag.scaling,
        unit: editingTag.unit,
        alarmThreshold: editingTag.alarmThreshold === '—' ? '' : editingTag.alarmThreshold,
      })
      setErrors({})
    } else {
      setForm(emptyForm)
    }
  }, [editingTag])

  const handleReset = () => {
    setForm(emptyForm)
    setErrors({})
    onCancelEdit()
  }

  const handleSubmit = () => {
    const nextErrors: { tagName?: string; register?: string } = {}
    if (!form.tagName.trim()) nextErrors.tagName = 'Tag name is required'
    if (!form.register.trim()) nextErrors.register = 'Register / address is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (!isEditMode && atCapacity) return

    onSave({
      ...form,
      alarmThreshold: form.alarmThreshold.trim() || '—',
    })
    setForm(emptyForm)
    setErrors({})
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {isEditMode ? 'Edit Tag' : 'Add / Edit Tag'}
        </Typography>
        {isEditMode && (
          <Button size="small" startIcon={<CloseIcon fontSize="small" />} onClick={handleReset}>
            Cancel edit
          </Button>
        )}
      </Stack>

      {!isEditMode && atCapacity && (
        <Alert severity="warning" sx={{ mb: 1.5 }}>
          This tab is at its maximum tag count. Remove a tag before adding another.
        </Alert>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ flexWrap: 'wrap' }}>
        <TextField
          label="Tag Name"
          size="small"
          required
          value={form.tagName}
          onChange={(e) => setForm((f) => ({ ...f, tagName: e.target.value }))}
          error={Boolean(errors.tagName)}
          helperText={errors.tagName}
          sx={{ minWidth: 160, flex: 1 }}
        />
        <TextField
          label="Register Address"
          size="small"
          required
          value={form.register}
          onChange={(e) => setForm((f) => ({ ...f, register: e.target.value }))}
          error={Boolean(errors.register)}
          helperText={errors.register}
          sx={{ minWidth: 140, flex: 1 }}
        />
        <TextField
          select
          label="Data Type"
          size="small"
          value={form.dataType}
          onChange={(e) => setForm((f) => ({ ...f, dataType: e.target.value }))}
          sx={{ minWidth: 130, flex: 1 }}
        >
          {dataTypeOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Scaling Factor"
          size="small"
          value={form.scaling}
          onChange={(e) => setForm((f) => ({ ...f, scaling: e.target.value }))}
          sx={{ minWidth: 120, flex: 1 }}
        />
        <TextField
          label="Engineering Unit"
          size="small"
          value={form.unit}
          onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
          sx={{ minWidth: 120, flex: 1 }}
        />
        <TextField
          label="Alarm Threshold"
          size="small"
          value={form.alarmThreshold}
          onChange={(e) => setForm((f) => ({ ...f, alarmThreshold: e.target.value }))}
          placeholder="e.g. >75 High"
          sx={{ minWidth: 140, flex: 1 }}
        />
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          disabled={!isEditMode && atCapacity}
        >
          {isEditMode ? 'Save Changes' : 'Add Tag'}
        </Button>
      </Box>
    </Paper>
  )
}
