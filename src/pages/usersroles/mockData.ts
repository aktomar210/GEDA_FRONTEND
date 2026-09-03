// Mock data — replace with real API call when the Users & Roles module backend is built

export interface UserRow {
  id: number
  name: string
  role: string
  hierarchyScope: string
  lastLogin: string
  twoFactorEnabled: boolean
  status: 'Active' | 'Inactive'
}

export const userRows: UserRow[] = [
  { id: 1, name: 'R. Mehta (GEDA Admin)', role: 'Super Admin', hierarchyScope: 'All States / All DISCOMs', lastLogin: 'Today 09:12', twoFactorEnabled: true, status: 'Active' },
  { id: 2, name: 'A. Patel (DISCOM Officer)', role: 'DISCOM Viewer', hierarchyScope: 'Rajkot DISCOM Only', lastLogin: 'Yesterday', twoFactorEnabled: true, status: 'Active' },
  { id: 3, name: 'O&M Team A (Vendor)', role: 'O&M Technician', hierarchyScope: 'Assigned Plants Only', lastLogin: '2 hrs ago', twoFactorEnabled: false, status: 'Active' },
  { id: 4, name: 'J. Shah (Auditor)', role: 'Read-Only Auditor', hierarchyScope: 'All (View Only)', lastLogin: '5 days ago', twoFactorEnabled: true, status: 'Inactive' },
]

export type RoleKey = 'Super Admin' | 'DISCOM Viewer' | 'O&M Technician' | 'Auditor'

export const roleColumns: RoleKey[] = ['Super Admin', 'DISCOM Viewer', 'O&M Technician', 'Auditor']

export interface PermissionRow {
  permission: string
  grants: Record<RoleKey, boolean>
}

export const permissionMatrix: PermissionRow[] = [
  { permission: 'View Dashboard', grants: { 'Super Admin': true, 'DISCOM Viewer': true, 'O&M Technician': true, Auditor: true } },
  { permission: 'Configure Tags', grants: { 'Super Admin': true, 'DISCOM Viewer': false, 'O&M Technician': false, Auditor: false } },
  { permission: 'Acknowledge Alerts', grants: { 'Super Admin': true, 'DISCOM Viewer': false, 'O&M Technician': true, Auditor: false } },
  { permission: 'Manage Users', grants: { 'Super Admin': true, 'DISCOM Viewer': false, 'O&M Technician': false, Auditor: false } },
  { permission: 'Export Data', grants: { 'Super Admin': true, 'DISCOM Viewer': true, 'O&M Technician': false, Auditor: true } },
  { permission: 'View Billing', grants: { 'Super Admin': true, 'DISCOM Viewer': true, 'O&M Technician': false, Auditor: true } },
]
