import { Grid } from '@mui/material'
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import type { DashboardKpiDto } from '../../../types/dashboard'
import { formatCount, formatEnergy, formatPercent } from '../../../utils/formatters'
import { KpiCard } from './KpiCard'

interface KpiCardRowProps {
  kpis: DashboardKpiDto | null
  loading: boolean
}

export function KpiCardRow({ kpis, loading }: KpiCardRowProps) {
  const onlinePercent = kpis?.systemsOnlinePercent ?? 0
  const onlineColor = onlinePercent >= 95 ? '#2E7D32' : onlinePercent >= 80 ? '#ED6C02' : '#C62828'

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Total Devices Onboarded"
          value={kpis ? formatCount(kpis.totalDevices) : '—'}
          icon={DevicesOtherOutlinedIcon}
          accentColor="#0B2545"
          loading={loading}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Systems Online"
          value={kpis ? formatPercent(kpis.systemsOnlinePercent) : '—'}
          icon={WifiOutlinedIcon}
          accentColor={onlineColor}
          loading={loading}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Active Alerts"
          value={kpis ? formatCount(kpis.activeAlertsCount) : '—'}
          icon={WarningAmberOutlinedIcon}
          accentColor={kpis && kpis.activeAlertsCount > 0 ? '#C62828' : '#2E7D32'}
          loading={loading}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="Avg. Generation Today"
          value={kpis ? formatEnergy(kpis.avgGenerationTodayKwh) : '—'}
          icon={BoltOutlinedIcon}
          accentColor="#C9932E"
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}
