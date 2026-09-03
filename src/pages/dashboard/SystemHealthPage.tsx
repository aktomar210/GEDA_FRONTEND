import { useEffect, useState } from 'react'
import { Alert, Box, Grid } from '@mui/material'
import { healthApi } from '../../api/healthApi'
import { alertApi } from '../../api/alertApi'
import { ApiClientError } from '../../api/client'
import type {
  AlertTrendPointDto,
  CertStatusBreakdownDto,
  DeviceStatusBreakdownDto,
} from '../../types/health'
import type { AlertDto } from '../../types/alert'
import { HealthTelemetryKpis } from './components/HealthTelemetryKpis'
import { DeviceStatusDonut } from './components/DeviceStatusDonut'
import { CertStatusDonut } from './components/CertStatusDonut'
import { AlertTrendChart } from './components/AlertTrendChart'
import { HardwareDiagnosticsPanel } from './components/HardwareDiagnosticsPanel'
import { RecentAlertsFeed } from './components/RecentAlertsFeed'

export function SystemHealthPage() {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatusBreakdownDto | null>(null)
  const [certStatus, setCertStatus] = useState<CertStatusBreakdownDto | null>(null)
  const [alertTrend, setAlertTrend] = useState<AlertTrendPointDto[]>([])
  const [recentAlerts, setRecentAlerts] = useState<AlertDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      const results = await Promise.allSettled([
        healthApi.getDeviceStatusBreakdown(),
        healthApi.getCertStatusBreakdown(),
        healthApi.getAlertTrend(7),
        alertApi.list({ limit: 10 }),
      ])
      if (cancelled) return

      const [deviceResult, certResult, trendResult, alertsResult] = results
      if (deviceResult.status === 'fulfilled') setDeviceStatus(deviceResult.value)
      if (certResult.status === 'fulfilled') setCertStatus(certResult.value)
      if (trendResult.status === 'fulfilled') setAlertTrend(trendResult.value)
      if (alertsResult.status === 'fulfilled') setRecentAlerts(alertsResult.value)

      const firstFailure = results.find((r) => r.status === 'rejected') as
        | PromiseRejectedResult
        | undefined
      if (firstFailure) {
        const reason = firstFailure.reason
        setError(
          reason instanceof ApiClientError
            ? reason.message
            : 'Some system health data failed to load. Please refresh.',
        )
      }
      setLoading(false)
    }

    load()
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

      {/* System Health Parameter Strip */}
      <Box sx={{ mb: 3 }}>
        <HealthTelemetryKpis />
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DeviceStatusDonut data={deviceStatus} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CertStatusDonut data={certStatus} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentAlertsFeed alerts={recentAlerts} loading={loading} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <AlertTrendChart data={alertTrend} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <HardwareDiagnosticsPanel />
        </Grid>
      </Grid>
    </Box>
  )
}
