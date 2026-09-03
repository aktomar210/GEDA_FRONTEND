export type OrgUnitType = 'STATE' | 'DISCOM' | 'DIVISION' | 'PLANT'

export interface OrgTreeNodeDto {
  id: number
  name: string
  type: OrgUnitType
  deviceCount: number
  children: OrgTreeNodeDto[]
}
