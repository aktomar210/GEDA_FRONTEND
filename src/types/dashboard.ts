export interface DashboardKpiDto {
  totalDevices: number
  systemsOnlinePercent: number
  activeAlertsCount: number
  avgGenerationTodayKwh: number
}

export interface GenerationTrendPoint {
  timestamp: string
  kwh: number
}
