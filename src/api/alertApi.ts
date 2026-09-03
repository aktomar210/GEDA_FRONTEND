import { apiClient } from './client'
import type { AlertDto, AlertListParams } from '../types/alert'

export const alertApi = {
  async list(params: AlertListParams = {}): Promise<AlertDto[]> {
    const res = await apiClient.get<AlertDto[]>('/alerts', {
      params: {
        severity: params.severity || undefined,
        limit: params.limit,
      },
    })
    return res.data
  },
}
