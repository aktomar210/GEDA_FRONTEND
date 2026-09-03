import { Grid } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmberOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { KpiCard } from '../../dashboard/components/KpiCard'
import { formatCount } from '../../../utils/formatters'

interface AlertKpiCounts {
  critical: number
  warning: number
  info: number
  resolvedToday: number
}

interface AlertKpiCardsProps {
  counts: AlertKpiCounts
}

export function AlertKpiCards({ counts }: AlertKpiCardsProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Critical"
          value={formatCount(counts.critical)}
          icon={ErrorOutlineIcon}
          accentColor="#C62828"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Warning"
          value={formatCount(counts.warning)}
          icon={WarningAmberIcon}
          accentColor="#ED6C02"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Info"
          value={formatCount(counts.info)}
          icon={InfoOutlinedIcon}
          accentColor="#78909C"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Resolved Today"
          value={formatCount(counts.resolvedToday)}
          icon={CheckCircleOutlineIcon}
          accentColor="#2E7D32"
        />
      </Grid>
    </Grid>
  )
}
