import { useState } from 'react'
import { Box, Button, Grid, Snackbar, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined'
import AddIcon from '@mui/icons-material/AddOutlined'
import { periodOptions, reportCatalog, scheduledReports as initialScheduledReports } from './mockData'
import type { ReportPeriod, ScheduledReport } from './mockData'
import { PlantGenerationChart } from './components/PlantGenerationChart'
import { DiscomUptimeChart } from './components/DiscomUptimeChart'
import { ScheduledReportsPanel } from './components/ScheduledReportsPanel'
import { ReportCatalogAccordion } from './components/ReportCatalogAccordion'
import { ReportSummaryKpis } from './components/ReportSummaryKpis'
import { NewReportModal } from './components/NewReportModal'
import { ConfirmDialog } from '../../components/ConfirmDialog'

let nextReportId = 1000

export function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>('Monthly')
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(initialScheduledReports)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ScheduledReport | null>(null)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const handleCreate = (report: Omit<ScheduledReport, 'id'>) => {
    setScheduledReports((prev) => [...prev, { id: nextReportId++, ...report }])
    setModalOpen(false)
    setSnackbarMessage(`"${report.name}" added to Scheduled Reports`)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    setScheduledReports((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    setSnackbarMessage(`"${deleteTarget.name}" removed from Scheduled Reports`)
    setDeleteTarget(null)
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'flex-start' },
          mb: 3,
        }}
      >
        <Box sx={{ flexGrow: 1, pr: { sm: 2 } }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <AssessmentIcon color="primary" fontSize="small" />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Reports &amp; Analytics
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Configurable, scheduled, and on-demand reports spanning generation, efficiency,
            billing, electrical health, connectivity/SLA, and regulatory compliance — 9
            categories, {reportCatalog.reduce((sum, c) => sum + c.reportCount, 0)}+ report
            templates, built via the Report Designer.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{
            whiteSpace: 'nowrap',
            flexShrink: 0,
            alignSelf: 'flex-start',
            px: 2.5,
            py: 1,
            fontWeight: 800,
          }}
        >
          New Report
        </Button>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <ReportSummaryKpis scheduledReports={scheduledReports} />
      </Box>

      <ToggleButtonGroup
        value={period}
        exclusive
        onChange={(_, value) => value && setPeriod(value)}
        size="small"
        sx={{ mb: 3 }}
      >
        {periodOptions.map((opt) => (
          <ToggleButton key={opt} value={opt} sx={{ px: 2 }}>
            {opt}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PlantGenerationChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DiscomUptimeChart />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ScheduledReportsPanel reports={scheduledReports} onDelete={setDeleteTarget} />
        </Grid>
      </Grid>

      <ReportCatalogAccordion />

      <NewReportModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove Scheduled Report"
        description={
          <>
            Remove <strong>{deleteTarget?.name}</strong> from the scheduled reports list?
          </>
        }
        confirmLabel="Remove"
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
