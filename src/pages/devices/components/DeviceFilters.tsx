import { useEffect, useState } from 'react'
import {
  Box,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type { DeviceStatus, DeviceType } from '../../../types/device'

interface DeviceFiltersProps {
  search: string
  type: DeviceType | ''
  status: DeviceStatus | ''
  onSearchChange: (value: string) => void
  onTypeChange: (value: DeviceType | '') => void
  onStatusChange: (value: DeviceStatus | '') => void
}

const typeOptions: { value: DeviceType | ''; label: string }[] = [
  { value: '', label: 'All Types' },
  { value: 'SOLAR_RMS', label: 'Solar RMS' },
  { value: 'WIND_RMS', label: 'Wind RMS' },
  { value: 'HYBRID_RMS', label: 'Hybrid RMS' },
]

const statusOptions: { value: DeviceStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'ONLINE', label: 'Online' },
  { value: 'WARNING', label: 'Warning' },
  { value: 'OFFLINE', label: 'Offline' },
]

const DEBOUNCE_MS = 400

export function DeviceFilters({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
}: DeviceFiltersProps) {
  const [searchInput, setSearchInput] = useState(search)

  // Keep the local input in sync if the parent resets search externally.
  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchInput !== search) {
        onSearchChange(searchInput)
      }
    }, DEBOUNCE_MS)
    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField
          placeholder="Search by device code, name, or plant…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, minWidth: 240 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          select
          label="Type"
          size="small"
          value={type}
          onChange={(e) => onTypeChange(e.target.value as DeviceType | '')}
          sx={{ minWidth: 160 }}
        >
          {typeOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          size="small"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as DeviceStatus | '')}
          sx={{ minWidth: 160 }}
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  )
}
