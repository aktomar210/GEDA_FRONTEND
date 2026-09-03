import { Grid } from '@mui/material'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined'
import { KpiCard } from '../../dashboard/components/KpiCard'
import { reportCatalog, type ScheduledReport } from '../mockData'

interface ReportSummaryKpisProps {
  scheduledReports: ScheduledReport[]
}

export function ReportSummaryKpis({ scheduledReports }: ReportSummaryKpisProps) {
  const totalTemplates = reportCatalog.reduce((sum, c) => sum + c.reportCount, 0)

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Report Templates"
          value={totalTemplates.toLocaleString('en-IN')}
          icon={LibraryBooksOutlinedIcon}
          accentColor="#0B2545"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Report Categories"
          value={String(reportCatalog.length)}
          icon={CategoryOutlinedIcon}
          accentColor="#C9932E"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Scheduled Reports"
          value={String(scheduledReports.length)}
          icon={ScheduleOutlinedIcon}
          accentColor="#2E7D32"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Most Recent Run"
          value="Today"
          icon={UpdateOutlinedIcon}
          accentColor="#ED6C02"
        />
      </Grid>
    </Grid>
  )
}
