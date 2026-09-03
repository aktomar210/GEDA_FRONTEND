import { apiClient } from './client'
import type {
  DeviceBulkImportResult,
  DeviceCreateRequest,
  DeviceDto,
  DeviceListParams,
  PagedResponse,
} from '../types/device'

export const deviceApi = {
  async list(
    params: DeviceListParams = {},
  ): Promise<PagedResponse<DeviceDto>> {
    const res = await apiClient.get<PagedResponse<DeviceDto>>('/devices', {
      params: {
        search: params.search || undefined,
        type: params.type || undefined,
        status: params.status || undefined,
        page: params.page ?? 0,
        size: params.size ?? 10,
      },
    })
    return res.data
  },

  async get(id: number): Promise<DeviceDto> {
    const res = await apiClient.get<DeviceDto>(`/devices/${id}`)
    return res.data
  },

  async create(payload: DeviceCreateRequest): Promise<DeviceDto> {
    const res = await apiClient.post<DeviceDto>('/devices', payload)
    return res.data
  },

  async update(
    id: number,
    payload: DeviceCreateRequest,
  ): Promise<DeviceDto> {
    const res = await apiClient.put<DeviceDto>(`/devices/${id}`, payload)
    return res.data
  },

  async bulkImport(file: File): Promise<DeviceBulkImportResult> {
    const formData = new FormData()
    formData.append('file', file)
    const res = await apiClient.post<DeviceBulkImportResult>(
      '/devices/bulk-import',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return res.data
  },

  async regenerateCert(id: number): Promise<DeviceDto> {
    const res = await apiClient.post<DeviceDto>(
      `/devices/${id}/regenerate-cert`,
    )
    return res.data
  },
}
