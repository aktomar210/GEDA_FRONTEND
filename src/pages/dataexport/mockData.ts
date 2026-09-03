// Mock data — replace with real API call when the Data Export module backend is built

export interface DataSetOption {
  id: string
  label: string
}

export const dataSetOptions: DataSetOption[] = [
  { id: 'device-master', label: 'Device Master & Configuration' },
  { id: 'telemetry', label: 'Historical Telemetry / Tag Data' },
  { id: 'audit-logs', label: 'Alarms/Events & Audit Logs' },
  { id: 'user-role', label: 'User & Role Data' },
  { id: 'billing', label: 'Billing & Invoice Records' },
  { id: 'api-docs', label: 'API Integration Documentation' },
]

export const handoverChecklist: string[] = [
  'All databases & configs exported in open, non-proprietary formats',
  'API & integration documentation handed over',
  'Backup archives (last 3 years) transferred to GEDA',
  'Formal Data Deletion Certificate issued post-verification',
]

export const exportFormats = 'CSV · XLSX · JSON · XML · SQL Dump · PDF-A'
