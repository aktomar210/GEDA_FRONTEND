import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import { deviceApi } from '../../api/deviceApi'
import { ApiClientError } from '../../api/client'
import type { DeviceDto } from '../../types/device'
import { statusColors } from '../../theme/theme'
import { formatDateTime, formatPercent } from '../../utils/formatters'
import { seedActiveAlert, seedLiveTags, seedTrend } from './mockData'
import { RealisticScadaHmi } from './components/RealisticScadaHmi'
import { ScadaSchematic } from './components/ScadaSchematic'
import { LiveTagGrid } from './components/LiveTagGrid'
import { ScadaTrendChart } from './components/ScadaTrendChart'
import { ActiveAlertBanner } from './components/ActiveAlertBanner'

export function ScadaViewPage() {
  const [devices, setDevices] = useState<DeviceDto[]>([])
  const [selectedId, setSelectedId] = useState<number | ''>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [acknowledged, setAcknowledged] = useState(false)
  const [viewMode, setViewMode] = useState<'hmi' | 'sld'>('hmi')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await deviceApi.list({ size: 100 })
        if (cancelled) return
        setDevices(result.content)
        if (result.content.length > 0) {
          setSelectedId(result.content[0].id)
        }
      } catch (err) {
        if (cancelled) return
        setError(
          err instanceof ApiClientError
            ? err.message
            : 'Failed to load devices. Please try again.',
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const selectedDevice = useMemo(
    () => devices.find((d) => d.id === selectedId) ?? null,
    [devices, selectedId],
  )

  const liveTags = useMemo(
    () => (selectedDevice ? seedLiveTags(selectedDevice.id) : []),
    [selectedDevice],
  )
  const trend = useMemo(
    () => (selectedDevice ? seedTrend(selectedDevice.id) : []),
    [selectedDevice],
  )
  const activeAlert = useMemo(
    () => (selectedDevice ? seedActiveAlert(selectedDevice.id) : null),
    [selectedDevice],
  )

  useEffect(() => {
    setAcknowledged(false)
  }, [selectedId])

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
            <SettingsInputAntennaOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              SCADA View
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Real-time industrial 3D equipment HMI view, live tag values, and telemetry trends.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', alignSelf: { xs: 'flex-start', sm: 'center' } }}>
          <TextField
            select
            label="Device"
            size="small"
            value={selectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            disabled={loading || devices.length === 0}
            sx={{ minWidth: 240, bgcolor: '#FFFFFF', borderRadius: 2 }}
          >
            {devices.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.deviceCode} — {d.plantName}
              </MenuItem>
            ))}
          </TextField>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            size="small"
            sx={{ bgcolor: '#FFFFFF', borderRadius: 2, flexShrink: 0 }}
          >
            <ToggleButton value="hmi" sx={{ px: 2, py: 0.8, fontWeight: 800, whiteSpace: 'nowrap' }}>
              <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
                <ViewComfyIcon fontSize="small" color="primary" />
                <span>3D HMI View</span>
              </Stack>
            </ToggleButton>
            <ToggleButton value="sld" sx={{ px: 2, py: 0.8, fontWeight: 800, whiteSpace: 'nowrap' }}>
              <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
                <AccountTreeOutlinedIcon fontSize="small" color="action" />
                <span>SLD Schematic</span>
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
        </Stack>
      )}

      {!loading && !selectedDevice && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No devices available. Provision a device first from the Devices page.
          </Typography>
        </Paper>
      )}

      {!loading && selectedDevice && (
        <Stack spacing={2.5}>
          {/* Device status strip */}
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="text.secondary">Status</Typography>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      bgcolor: statusColors[selectedDevice.status],
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {selectedDevice.status}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="text.secondary">Uptime (30d)</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {formatPercent(selectedDevice.uptimePercent)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="text.secondary">Last Sync</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {formatDateTime(selectedDevice.lastSeenAt)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="text.secondary">Type</Typography>
                <Chip
                  label={selectedDevice.type.replace('_', ' ')}
                  size="small"
                  sx={{ fontWeight: 700, bgcolor: 'rgba(11,37,69,0.08)', color: '#0B2545' }}
                />
              </Grid>
            </Grid>
          </Paper>

          {activeAlert && (
            <ActiveAlertBanner
              alert={activeAlert}
              acknowledged={acknowledged}
              onAcknowledge={() => setAcknowledged(true)}
            />
          )}

          {/* Render Active View Mode */}
          {viewMode === 'hmi' ? (
            <RealisticScadaHmi device={selectedDevice} tags={liveTags} />
          ) : (
            <ScadaSchematic device={selectedDevice} tags={liveTags} />
          )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 7 }}>
              <LiveTagGrid tags={liveTags} />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <ScadaTrendChart data={trend} />
            </Grid>
          </Grid>
        </Stack>
      )}
    </Box>
  )
}
