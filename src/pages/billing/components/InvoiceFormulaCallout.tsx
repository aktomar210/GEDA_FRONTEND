import { Box, Button, Paper, Typography } from '@mui/material'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'

interface InvoiceFormulaCalloutProps {
  formula: string
  onDownload: () => void
}

export function InvoiceFormulaCallout({ formula, onDownload }: InvoiceFormulaCalloutProps) {
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: 'rgba(201,147,46,0.08)',
        border: '1px solid rgba(201,147,46,0.35)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Invoice Generation Formula
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formula}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<DownloadOutlinedIcon />}
        onClick={onDownload}
        sx={{ flexShrink: 0 }}
      >
        Download Invoice / Audit Report
      </Button>
    </Paper>
  )
}
