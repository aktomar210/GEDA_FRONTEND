import { apiClient } from './client'
import type {
  GenerationByTypeDto,
  PlantEfficiencyDto,
  PlantGenerationDto,
} from '../types/generationAnalytics'

export const generationAnalyticsApi = {
  async plantComparison(): Promise<PlantGenerationDto[]> {
    const res = await apiClient.get<PlantGenerationDto[]>(
      '/dashboard/generation/plant-comparison',
    )
    return res.data
  },

  async byType(): Promise<GenerationByTypeDto[]> {
    const res = await apiClient.get<GenerationByTypeDto[]>(
      '/dashboard/generation/by-type',
    )
    return res.data
  },

  async efficiencySummary(): Promise<PlantEfficiencyDto[]> {
    const res = await apiClient.get<PlantEfficiencyDto[]>(
      '/dashboard/generation/efficiency-summary',
    )
    return res.data
  },
}
