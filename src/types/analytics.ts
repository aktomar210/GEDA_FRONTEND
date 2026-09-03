export interface PlantGenerationDto {
  plantId: number
  plantName: string
  totalKwhToday: number
  deviceCount: number
}

export type DeviceType = 'SOLAR_RMS' | 'WIND_RMS' | 'HYBRID_RMS'

export interface GenerationByTypeDto {
  deviceType: DeviceType
  totalKwhToday: number
}

export interface PlantEfficiencyDto {
  plantId: number
  plantName: string
  cufPercent: number
  performanceRatio: number
}
