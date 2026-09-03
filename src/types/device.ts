export type DeviceType = 'SOLAR_RMS' | 'WIND_RMS' | 'HYBRID_RMS'

export type DeviceStatus = 'ONLINE' | 'WARNING' | 'OFFLINE'

export type TlsCertStatus = 'VALID' | 'EXPIRING' | 'EXPIRED'

export interface DeviceDto {
  id: number
  deviceCode: string
  name: string
  type: DeviceType
  orgUnitId: number
  plantName: string
  status: DeviceStatus
  uptimePercent: number
  tlsCertValidUntil: string
  tlsCertStatus: TlsCertStatus
  createdAt: string
  lastSeenAt: string | null
}

/** Spring Data Page<T>-style paged response. */
export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export interface DeviceListParams {
  search?: string
  type?: DeviceType | ''
  status?: DeviceStatus | ''
  page?: number
  size?: number
}

export interface DeviceCreateRequest {
  deviceCode: string
  name: string
  type: DeviceType
  orgUnitId: number
  status: DeviceStatus
}

export interface DeviceBulkImportError {
  row?: number
  message: string
}

export interface DeviceBulkImportResult {
  created: number
  failed: number
  errors: DeviceBulkImportError[]
}
