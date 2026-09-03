import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined'
import { deviceApi } from '../../../api/deviceApi'
import { ApiClientError } from '../../../api/client'
import type { DeviceBulkImportResult } from '../../../types/device'

interface BulkImportModalProps {
  open: boolean
  onClose: () => void
  onImportComplete: () => void
}

export function BulkImportModal({ open, onClose, onImportComplete }: BulkImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DeviceBulkImportResult | null>(null)

  const handleClose = () => {
    if (uploading) return
    setSelectedFile(null)
    setError(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    onClose()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    setError(null)
    setResult(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please choose a CSV file to upload.')
      return
    }
    setUploading(true)
    setError(null)
    try {
      const importResult = await deviceApi.bulkImport(selectedFile)
      setResult(importResult)
      if (importResult.created > 0) {
        onImportComplete()
      }
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : 'Bulk import failed. Please check the file and try again.',
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Bulk Import Devices
        <IconButton onClick={handleClose} size="small" disabled={uploading}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Alert severity="info" variant="outlined">
            Upload a <strong>.csv</strong> file with columns:{' '}
            <code>deviceCode, name, type, orgUnitId, status</code>. Valid{' '}
            <code>type</code> values: SOLAR_RMS, WIND_RMS, HYBRID_RMS.
          </Alert>

          {error && <Alert severity="error">{error}</Alert>}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: 'center',
              borderStyle: 'dashed',
              cursor: uploading ? 'default' : 'pointer',
            }}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            <UploadFileIcon sx={{ fontSize: 36, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2">
              {selectedFile ? selectedFile.name : 'Click to choose a CSV file'}
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              hidden
              onChange={handleFileChange}
            />
          </Paper>

          {result && (
            <Box>
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Alert severity="success" sx={{ flex: 1 }}>
                  {result.created} created
                </Alert>
                <Alert severity={result.failed > 0 ? 'error' : 'success'} sx={{ flex: 1 }}>
                  {result.failed} failed
                </Alert>
              </Stack>
              {result.errors.length > 0 && (
                <Paper variant="outlined" sx={{ maxHeight: 180, overflowY: 'auto' }}>
                  <List dense>
                    {result.errors.map((err, idx) => (
                      <ListItem key={idx} divider>
                        <ListItemText
                          primary={err.message}
                          secondary={err.row !== undefined ? `Row ${err.row}` : undefined}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          )}
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} disabled={uploading}>
          {result ? 'Close' : 'Cancel'}
        </Button>
        {!result && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {uploading ? 'Uploading…' : 'Upload & Import'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
