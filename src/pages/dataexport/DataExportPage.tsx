import { useState } from 'react'
import { Alert, Box, Button, Grid, Snackbar, Stack, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import { dataSetOptions, exportFormats, handoverChecklist } from './mockData'
import { DataSetSelector } from './components/DataSetSelector'
import { HandoverChecklist } from './components/HandoverChecklist'
import { formatDateTime } from '../../utils/formatters'

export function DataExportPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
  const [validationError, setValidationError] = useState(false)

  const toggleDataSet = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    setValidationError(false)
  }

  const handleGenerateExport = () => {
    if (selected.size === 0) {
      setValidationError(true)
      return
    }
    setValidationError(false)

    const selectedLabels = dataSetOptions
      .filter((opt) => selected.has(opt.id))
      .map((opt) => opt.label)

    const manifest = {
      title: 'GEDA SCADA SaaS Platform — Data Export Manifest',
      generatedAt: new Date().toISOString(),
      generatedAtDisplay: formatDateTime(new Date().toISOString()),
      selectedDataSets: selectedLabels,
      availableFormats: exportFormats,
      handoverChecklist,
      note: 'Demo export manifest generated client-side. No backend transfer has occurred.',
    }

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    link.href = url
    link.download = `geda-export-manifest-${stamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setSnackbarMessage(`Export manifest downloaded (${selectedLabels.length} data set${selectedLabels.length === 1 ? '' : 's'})`)
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 1,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <FileDownloadIcon color="primary" fontSize="small" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Data Export &amp; Exit Management
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Formats: {exportFormats}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <DataSetSelector options={dataSetOptions} selected={selected} onToggle={toggleDataSet} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <HandoverChecklist items={handoverChecklist} />
        </Grid>
      </Grid>

      {validationError && (
        <Alert severity="warning" sx={{ mb: 2, maxWidth: 480 }}>
          Select at least one data set before generating the export package.
        </Alert>
      )}

      <Button
        variant="contained"
        color="secondary"
        startIcon={<FileDownloadIcon />}
        onClick={handleGenerateExport}
        disabled={selected.size === 0}
      >
        Generate Export Package
      </Button>

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
