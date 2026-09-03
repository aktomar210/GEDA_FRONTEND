import { useCallback, useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardContent, Grid, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/AddOutlined'
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined'
import type { GridPaginationModel } from '@mui/x-data-grid'
import { deviceApi } from '../../api/deviceApi'
import { orgApi } from '../../api/orgApi'
import { ApiClientError } from '../../api/client'
import type { DeviceDto, DeviceStatus, DeviceType } from '../../types/device'
import type { OrgTreeNodeDto } from '../../types/org'
import { DeviceTable } from './components/DeviceTable'
import { DeviceFilters } from './components/DeviceFilters'
import { ProvisionDeviceModal } from './components/ProvisionDeviceModal'
import { BulkImportModal } from './components/BulkImportModal'
import { RegenerateCertConfirm } from './components/RegenerateCertConfirm'
import {
  GatewayGraphic,
  SmartMeterGraphic,
  SolarInverterGraphic,
  WindTurbineGraphic,
} from '../../components/DeviceGraphicIcons'
import { GedaEmblem } from '../../components/GedaLogo'

export function DevicesPage() {
  const [devices, setDevices] = useState<DeviceDto[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [type, setType] = useState<DeviceType | ''>('')
  const [status, setStatus] = useState<DeviceStatus | ''>('')
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  })

  const [orgTree, setOrgTree] = useState<OrgTreeNodeDto[] | null>(null)
  const [provisionModalOpen, setProvisionModalOpen] = useState(false)
  const [editingDevice, setEditingDevice] = useState<DeviceDto | null>(null)
  const [bulkImportOpen, setBulkImportOpen] = useState(false)
  const [certConfirmDevice, setCertConfirmDevice] = useState<DeviceDto | null>(null)

  const fetchDevices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await deviceApi.list({
        search,
        type,
        status,
        page: paginationModel.page,
        size: paginationModel.pageSize,
      })
      setDevices(result.content)
      setTotalElements(result.totalElements)
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : 'Failed to load devices. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }, [search, type, status, paginationModel])

  useEffect(() => {
    fetchDevices()
  }, [fetchDevices])

  useEffect(() => {
    orgApi.getTree().then(setOrgTree).catch(() => setOrgTree(null))
  }, [])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPaginationModel((m) => ({ ...m, page: 0 }))
  }
  const handleTypeChange = (value: DeviceType | '') => {
    setType(value)
    setPaginationModel((m) => ({ ...m, page: 0 }))
  }
  const handleStatusChange = (value: DeviceStatus | '') => {
    setStatus(value)
    setPaginationModel((m) => ({ ...m, page: 0 }))
  }

  const handleManage = (device: DeviceDto) => {
    setEditingDevice(device)
    setProvisionModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingDevice(null)
    setProvisionModalOpen(true)
  }

  const handleProvisionSuccess = () => {
    setProvisionModalOpen(false)
    setEditingDevice(null)
    fetchDevices()
  }

  const handleBulkImportComplete = () => {
    fetchDevices()
  }

  const handleRegenerateCertSuccess = (updated: DeviceDto) => {
    setDevices((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
    setCertConfirmDevice(null)
  }

  const solarCount = devices.filter((d) => d.type === 'SOLAR_RMS').length
  const windCount = devices.filter((d) => d.type === 'WIND_RMS').length
  const hybridCount = devices.filter((d) => d.type === 'HYBRID_RMS').length
  const onlineCount = devices.filter((d) => d.status === 'ONLINE').length

  return (
    <Box>
      {/* Header Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          mb: 3,
          borderRadius: 3.5,
          background: 'linear-gradient(135deg, #0B2545 0%, #13335F 100%)',
          color: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(11, 37, 69, 0.15)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <GedaEmblem size={46} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                Gujarat Energy Development Agency
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                Statewide RMS Devices Provisioning, Telemetry Credentials & Certs
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              onClick={() => setBulkImportOpen(true)}
              sx={{
                color: '#FFFFFF',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': { borderColor: '#F59E0B', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Bulk Import
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Provision Device
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Visual Device Category Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            onClick={() => handleTypeChange(type === 'SOLAR_RMS' ? '' : 'SOLAR_RMS')}
            sx={{
              cursor: 'pointer',
              border: type === 'SOLAR_RMS' ? '2px solid #F59E0B' : '1px solid #E2E8F0',
              bgcolor: type === 'SOLAR_RMS' ? '#FEF3C7' : '#FFFFFF',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <SolarInverterGraphic active={type === 'SOLAR_RMS'} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Solar RMS Units
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0B2545' }}>
                    {solarCount} <Typography component="span" variant="caption" color="text.secondary">Active</Typography>
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            onClick={() => handleTypeChange(type === 'WIND_RMS' ? '' : 'WIND_RMS')}
            sx={{
              cursor: 'pointer',
              border: type === 'WIND_RMS' ? '2px solid #10B981' : '1px solid #E2E8F0',
              bgcolor: type === 'WIND_RMS' ? '#D1FAE5' : '#FFFFFF',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <WindTurbineGraphic active={type === 'WIND_RMS'} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Wind RMS Units
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0B2545' }}>
                    {windCount} <Typography component="span" variant="caption" color="text.secondary">Active</Typography>
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            onClick={() => handleTypeChange(type === 'HYBRID_RMS' ? '' : 'HYBRID_RMS')}
            sx={{
              cursor: 'pointer',
              border: type === 'HYBRID_RMS' ? '2px solid #0284C7' : '1px solid #E2E8F0',
              bgcolor: type === 'HYBRID_RMS' ? '#E0F2FE' : '#FFFFFF',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <SmartMeterGraphic active={type === 'HYBRID_RMS'} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Hybrid / Net Meters
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0B2545' }}>
                    {hybridCount} <Typography component="span" variant="caption" color="text.secondary">Units</Typography>
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            onClick={() => handleStatusChange(status === 'ONLINE' ? '' : 'ONLINE')}
            sx={{
              cursor: 'pointer',
              border: status === 'ONLINE' ? '2px solid #10B981' : '1px solid #E2E8F0',
              bgcolor: status === 'ONLINE' ? '#ECFDF5' : '#FFFFFF',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <GatewayGraphic active={status === 'ONLINE'} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Online Telemetry
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#10B981' }}>
                    {onlineCount} <Typography component="span" variant="caption" color="text.secondary">Connected</Typography>
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      <DeviceFilters
        search={search}
        type={type}
        status={status}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
      />

      <DeviceTable
        rows={devices}
        rowCount={totalElements}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onManage={handleManage}
        onRegenerateCert={setCertConfirmDevice}
      />

      <ProvisionDeviceModal
        open={provisionModalOpen}
        orgTree={orgTree}
        editingDevice={editingDevice}
        onClose={() => {
          setProvisionModalOpen(false)
          setEditingDevice(null)
        }}
        onSuccess={handleProvisionSuccess}
      />

      <BulkImportModal
        open={bulkImportOpen}
        onClose={() => setBulkImportOpen(false)}
        onImportComplete={handleBulkImportComplete}
      />

      <RegenerateCertConfirm
        device={certConfirmDevice}
        onClose={() => setCertConfirmDevice(null)}
        onSuccess={handleRegenerateCertSuccess}
      />
    </Box>
  )
}
