import { apiClient } from './client'
import type { OrgTreeNodeDto } from '../types/org'

export const orgApi = {
  async getTree(): Promise<OrgTreeNodeDto[]> {
    const res = await apiClient.get<OrgTreeNodeDto[]>('/org/tree')
    return res.data
  },
}
