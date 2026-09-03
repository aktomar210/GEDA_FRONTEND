export interface PlantGenerationDto {
  plantId: number
  plantName: string
  totalKwhToday: number
  deviceCount: number
}

export interface GenerationByTypeDto {
  deviceType: string
  totalKwhToday: number
}

export interface PlantEfficiencyDto {
  plantId: number
  plantName: string
  cufPercent: number
  performanceRatio: number
}
