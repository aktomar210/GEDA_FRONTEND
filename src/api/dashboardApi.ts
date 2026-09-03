import { apiClient } from './client'
import type { DashboardKpiDto, GenerationTrendPoint } from '../types/dashboard'

export const dashboardApi = {
  async getKpis(): Promise<DashboardKpiDto> {
    const res = await apiClient.get<DashboardKpiDto>('/dashboard/kpis')
    return res.data
  },

  async getGenerationTrend(hours = 24): Promise<GenerationTrendPoint[]> {
    const res = await apiClient.get<GenerationTrendPoint[]>(
      '/dashboard/generation-trend',
      { params: { hours } },
    )
    return res.data
  },
}
