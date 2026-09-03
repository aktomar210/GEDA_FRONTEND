import { apiClient } from './client'
import type {
  AlertTrendPointDto,
  CertStatusBreakdownDto,
  DeviceStatusBreakdownDto,
} from '../types/health'

export const healthApi = {
  async getDeviceStatusBreakdown(): Promise<DeviceStatusBreakdownDto> {
    const res = await apiClient.get<DeviceStatusBreakdownDto>(
      '/dashboard/health/device-status-breakdown',
    )
    return res.data
  },

  async getCertStatusBreakdown(): Promise<CertStatusBreakdownDto> {
    const res = await apiClient.get<CertStatusBreakdownDto>(
      '/dashboard/health/cert-status-breakdown',
    )
    return res.data
  },

  async getAlertTrend(days = 7): Promise<AlertTrendPointDto[]> {
    const res = await apiClient.get<AlertTrendPointDto[]>(
      '/dashboard/health/alert-trend',
      { params: { days } },
    )
    return res.data
  },
}
