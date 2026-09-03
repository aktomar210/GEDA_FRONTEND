import { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import { reportCatalog } from '../mockData'
import type { ReportFormat, RepresentativeReport } from '../mockData'
import { generateReportFile } from '../generateReportFile'

const formatColors: Record<ReportFormat, string> = {
  PDF: '#C62828',
  XLSX: '#2E7D32',
  CSV: '#0B2545',
}

export function ReportCatalogAccordion() {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const handleGenerate = (report: RepresentativeReport, categoryTitle: string) => {
    generateReportFile({ report, categoryTitle })
    setSnackbarMessage(`"${report.name}" generated (${report.format})`)
  }

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
        <LibraryBooksOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Report Catalog
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {reportCatalog.length} categories · {reportCatalog.reduce((sum, c) => sum + c.reportCount, 0)}+
        report templates available via the Report Designer.
      </Typography>

      {reportCatalog.map((category) => (
        <Accordion key={category.id} disableGutters variant="outlined" sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', width: '100%', pr: 1 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, flexGrow: 1 }}>
                {category.title}
              </Typography>
              <Chip
                label={`${category.reportCount} reports`}
                size="small"
                sx={{
                  bgcolor: 'rgba(11,37,69,0.08)',
                  color: '#0B2545',
                  fontWeight: 700,
                }}
              />
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {category.description}
            </Typography>
            <List disablePadding dense>
              {category.reports.map((report) => (
                <ListItem
                  key={report.name}
                  disableGutters
                  sx={{
                    borderTop: '1px solid #EEF1F5',
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <ListItemText
                    primary={report.name}
                    secondary={`Last run: ${report.lastRun}`}
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: 13.5 } },
                      secondary: { sx: { fontSize: 11.5 } },
                    }}
                  />
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip
                      label={report.format}
                      size="small"
                      sx={{
                        bgcolor: `${formatColors[report.format]}1A`,
                        color: formatColors[report.format],
                        fontWeight: 700,
                        minWidth: 48,
                      }}
                    />
                    <Tooltip title={`Generate ${report.format}`}>
                      <IconButton
                        size="small"
                        onClick={() => handleGenerate(report, category.title)}
                      >
                        <DownloadOutlinedIcon fontSize="small" color="action" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

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
