import { useEffect, useState } from 'react'
import { Alert, Box, Grid } from '@mui/material'
import { dashboardApi } from '../../api/dashboardApi'
import { orgApi } from '../../api/orgApi'
import { alertApi } from '../../api/alertApi'
import { ApiClientError } from '../../api/client'
import type { DashboardKpiDto, GenerationTrendPoint } from '../../types/dashboard'
import type { OrgTreeNodeDto } from '../../types/org'
import type { AlertDto } from '../../types/alert'
import { KpiCardRow } from './components/KpiCardRow'
import { OverviewSecondaryKpis } from './components/OverviewSecondaryKpis'
import { GenerationTrendChart } from './components/GenerationTrendChart'
import { OrgHierarchyPanel } from './components/OrgHierarchyPanel'
import { RecentAlertsFeed } from './components/RecentAlertsFeed'

export function DashboardPage() {
  const [kpis, setKpis] = useState<DashboardKpiDto | null>(null)
  const [trend, setTrend] = useState<GenerationTrendPoint[]>([])
  const [orgTree, setOrgTree] = useState<OrgTreeNodeDto[] | null>(null)
  const [alerts, setAlerts] = useState<AlertDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      setLoading(true)
      setError(null)
      const results = await Promise.allSettled([
        dashboardApi.getKpis(),
        dashboardApi.getGenerationTrend(24),
        orgApi.getTree(),
        alertApi.list({ limit: 10 }),
      ])

      if (cancelled) return

      const [kpiResult, trendResult, orgResult, alertResult] = results

      if (kpiResult.status === 'fulfilled') setKpis(kpiResult.value)
      if (trendResult.status === 'fulfilled') setTrend(trendResult.value)
      if (orgResult.status === 'fulfilled') setOrgTree(orgResult.value)
      if (alertResult.status === 'fulfilled') setAlerts(alertResult.value)

      const firstFailure = results.find((r) => r.status === 'rejected') as
        | PromiseRejectedResult
        | undefined
      if (firstFailure) {
        const reason = firstFailure.reason
        setError(
          reason instanceof ApiClientError
            ? reason.message
            : 'Some dashboard data failed to load. Please refresh.',
        )
      }

      setLoading(false)
    }

    loadDashboard()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2.5 }}>
        <KpiCardRow kpis={kpis} loading={loading} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <OverviewSecondaryKpis />
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <GenerationTrendChart data={trend} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OrgHierarchyPanel tree={orgTree} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <RecentAlertsFeed alerts={alerts} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  )
}
