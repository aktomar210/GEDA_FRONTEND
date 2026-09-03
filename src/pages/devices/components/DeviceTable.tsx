import { Box, Button, Chip, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import RefreshIcon from '@mui/icons-material/RefreshOutlined'
import type { DeviceDto, DeviceType } from '../../../types/device'
import { certStatusColors, statusColors } from '../../../theme/theme'
import { formatDate, formatPercent } from '../../../utils/formatters'

const typeLabels: Record<DeviceType, string> = {
  SOLAR_RMS: 'Solar RMS',
  WIND_RMS: 'Wind RMS',
  HYBRID_RMS: 'Hybrid RMS',
}

interface DeviceTableProps {
  rows: DeviceDto[]
  rowCount: number
  loading: boolean
  paginationModel: GridPaginationModel
  onPaginationModelChange: (model: GridPaginationModel) => void
  onManage: (device: DeviceDto) => void
  onRegenerateCert: (device: DeviceDto) => void
}

function StatusDot({ color }: { color: string }) {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        bgcolor: color,
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
}

export function DeviceTable({
  rows,
  rowCount,
  loading,
  paginationModel,
  onPaginationModelChange,
  onManage,
  onRegenerateCert,
}: DeviceTableProps) {
  const columns: GridColDef<DeviceDto>[] = [
    {
      field: 'deviceCode',
      headerName: 'Device ID',
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.row.deviceCode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'plantName',
      headerName: 'Plant / Location',
      flex: 1,
      minWidth: 160,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      valueFormatter: (value: DeviceType) => typeLabels[value] ?? value,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
          <StatusDot color={statusColors[params.row.status]} />
          <Typography variant="body2">{params.row.status}</Typography>
        </Box>
      ),
    },
    {
      field: 'uptimePercent',
      headerName: 'Uptime %',
      width: 110,
      valueFormatter: (value: number) => formatPercent(value),
    },
    {
      field: 'tlsCertStatus',
      headerName: 'TLS Cert',
      width: 160,
      renderCell: (params) => (
        <Box>
          <Chip
            label={params.row.tlsCertStatus}
            size="small"
            sx={{
              bgcolor: `${certStatusColors[params.row.tlsCertStatus]}1A`,
              color: certStatusColors[params.row.tlsCertStatus],
              fontWeight: 700,
              height: 20,
              fontSize: 11,
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            until {formatDate(params.row.tlsCertValidUntil)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 190,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
          <Button size="small" variant="outlined" onClick={() => onManage(params.row)}>
            Manage
          </Button>
          <Tooltip title="Regenerate TLS certificate">
            <Button
              size="small"
              variant="text"
              color="secondary"
              onClick={() => onRegenerateCert(params.row)}
              sx={{ minWidth: 0, px: 1 }}
            >
              <RefreshIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        autoHeight
        getRowHeight={() => 64}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: '#F4F6F9',
          },
        }}
        localeText={{ noRowsLabel: 'No devices found' }}
      />
    </Box>
  )
}
