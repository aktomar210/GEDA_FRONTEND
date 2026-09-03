export type AlertSeverity = 'HIGH' | 'MED' | 'LOW'

export interface AlertDto {
  id: number
  severity: AlertSeverity
  message: string
  deviceCode: string | null
  plantName: string | null
  createdAt: string
  acknowledged: boolean
}

export interface AlertListParams {
  severity?: AlertSeverity | ''
  limit?: number
}
