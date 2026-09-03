import { apiClient } from './client'
import type {
  GenerationByTypeDto,
  PlantEfficiencyDto,
  PlantGenerationDto,
} from '../types/analytics'

export const analyticsApi = {
  async getPlantComparison(): Promise<PlantGenerationDto[]> {
    const res = await apiClient.get<PlantGenerationDto[]>(
      '/dashboard/generation/plant-comparison',
    )
    return res.data
  },

  async getByType(): Promise<GenerationByTypeDto[]> {
    const res = await apiClient.get<GenerationByTypeDto[]>(
      '/dashboard/generation/by-type',
    )
    return res.data
  },

  async getEfficiencySummary(): Promise<PlantEfficiencyDto[]> {
    const res = await apiClient.get<PlantEfficiencyDto[]>(
      '/dashboard/generation/efficiency-summary',
    )
    return res.data
  },
}
