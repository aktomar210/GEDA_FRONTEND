import { useEffect, useState } from 'react'
import { Alert, Box, Grid } from '@mui/material'
import { analyticsApi } from '../../api/analyticsApi'
import { ApiClientError } from '../../api/client'
import type {
  GenerationByTypeDto,
  PlantEfficiencyDto,
  PlantGenerationDto,
} from '../../types/analytics'
import { GenerationParameterCards } from './components/GenerationParameterCards'
import { PlantComparisonChart } from './components/PlantComparisonChart'
import { GenerationByTypeChart } from './components/GenerationByTypeChart'
import { IrradianceWindChart } from './components/IrradianceWindChart'
import { DistrictLeaderboard } from './components/DistrictLeaderboard'
import { EfficiencyTable } from './components/EfficiencyTable'

export function GenerationAnalyticsPage() {
  const [plantComparison, setPlantComparison] = useState<PlantGenerationDto[]>([])
  const [byType, setByType] = useState<GenerationByTypeDto[]>([])
  const [efficiency, setEfficiency] = useState<PlantEfficiencyDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      const results = await Promise.allSettled([
        analyticsApi.getPlantComparison(),
        analyticsApi.getByType(),
        analyticsApi.getEfficiencySummary(),
      ])
      if (cancelled) return

      const [comparisonResult, typeResult, efficiencyResult] = results
      if (comparisonResult.status === 'fulfilled') setPlantComparison(comparisonResult.value)
      if (typeResult.status === 'fulfilled') setByType(typeResult.value)
      if (efficiencyResult.status === 'fulfilled') setEfficiency(efficiencyResult.value)

      const firstFailure = results.find((r) => r.status === 'rejected') as
        | PromiseRejectedResult
        | undefined
      if (firstFailure) {
        const reason = firstFailure.reason
        setError(
          reason instanceof ApiClientError
            ? reason.message
            : 'Some analytics data failed to load. Please refresh.',
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

      {/* Parameter Cards Strip */}
      <Box sx={{ mb: 3 }}>
        <GenerationParameterCards />
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <PlantComparisonChart data={plantComparison} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <GenerationByTypeChart data={byType} loading={loading} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <IrradianceWindChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DistrictLeaderboard />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <EfficiencyTable data={efficiency} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  )
}
