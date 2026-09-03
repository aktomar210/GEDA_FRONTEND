// Mock data — replace with real API call when the Alerts module backend is built

export type AlertSeverityFull = 'HIGH' | 'MED' | 'LOW' | 'INFO'
export type AlertStatus = 'Open' | 'Acknowledged' | 'Resolved'

export interface AlertRow {
  id: number
  time: string
  severity: AlertSeverityFull
  device: string
  description: string
  status: AlertStatus
  assignedTo: string
}

export const kpiCounts = {
  critical: 7,
  warning: 14,
  info: 22,
  resolvedToday: 38,
}

export const alertRows: AlertRow[] = [
  { id: 1, time: '25 Aug, 09:42', severity: 'HIGH', device: 'SIG-00231 / Rajkot Plant 1', description: 'Grid failure detected — inverter tripped', status: 'Open', assignedTo: 'O&M Team A' },
  { id: 2, time: '25 Aug, 09:15', severity: 'HIGH', device: 'SIG-00184 / Bhuj Solar Farm', description: 'DC insulation resistance below threshold', status: 'Acknowledged', assignedTo: 'O&M Team B' },
  { id: 3, time: '25 Aug, 08:58', severity: 'MED', device: 'SIG-00299 / Jamnagar Wind Cluster 3', description: 'Inverter temperature exceeded 75°C', status: 'Open', assignedTo: 'Unassigned' },
  { id: 4, time: '25 Aug, 08:30', severity: 'MED', device: 'SIG-00147 / Surat Hybrid Site', description: 'Communication uptime dropped below 95%', status: 'Acknowledged', assignedTo: 'IoT Vendor Support' },
  { id: 5, time: '25 Aug, 07:55', severity: 'LOW', device: 'SIG-00231 / Rajkot Plant 1', description: 'Grid frequency briefly outside nominal band', status: 'Resolved', assignedTo: 'O&M Team A' },
  { id: 6, time: '24 Aug, 22:10', severity: 'INFO', device: 'SIG-00184 / Bhuj Solar Farm', description: 'Scheduled maintenance window started', status: 'Resolved', assignedTo: 'System' },
  { id: 7, time: '24 Aug, 19:44', severity: 'HIGH', device: 'SIG-00062 / Porbandar Plant 2', description: 'Reverse power flow detected on feeder 2', status: 'Open', assignedTo: 'O&M Team C' },
  { id: 8, time: '24 Aug, 17:20', severity: 'MED', device: 'SIG-00299 / Jamnagar Wind Cluster 3', description: 'Phase failure on auxiliary supply', status: 'Resolved', assignedTo: 'O&M Team A' },
  { id: 9, time: '24 Aug, 14:05', severity: 'LOW', device: 'SIG-00147 / Surat Hybrid Site', description: 'AC power dipped below expected irradiance curve', status: 'Acknowledged', assignedTo: 'DISCOM Viewer'  },
  { id: 10, time: '24 Aug, 10:30', severity: 'INFO', device: 'SIG-00062 / Porbandar Plant 2', description: 'TLS certificate renewed successfully', status: 'Resolved', assignedTo: 'System' },
]

export const severityFilterOptions: { value: AlertSeverityFull | ''; label: string }[] = [
  { value: '', label: 'All Severities' },
  { value: 'HIGH', label: 'Critical' },
  { value: 'MED', label: 'Warning' },
  { value: 'LOW', label: 'Low' },
  { value: 'INFO', label: 'Info' },
]

export const statusFilterOptions: { value: AlertStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'Acknowledged', label: 'Acknowledged' },
  { value: 'Resolved', label: 'Resolved' },
]
