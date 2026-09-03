export interface DeviceStatusBreakdownDto {
  online: number
  warning: number
  offline: number
}

export interface CertStatusBreakdownDto {
  valid: number
  expiring: number
  expired: number
}

export interface AlertTrendPointDto {
  date: string
  highCount: number
  medCount: number
  lowCount: number
}
