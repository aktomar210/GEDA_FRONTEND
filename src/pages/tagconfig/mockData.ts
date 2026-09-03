// Mock data — replace with real API call when the Tag Configuration module backend is built

export interface TagRow {
  id: number
  tagName: string
  register: string
  dataType: string
  scaling: string
  unit: string
  alarmThreshold: string
}

export interface DeviceOption {
  id: string
  label: string
}

export const deviceOptions: DeviceOption[] = [
  { id: 'SIG-00231', label: 'SIG-00231 — Rajkot Plant 1' },
  { id: 'SIG-00184', label: 'SIG-00184 — Bhuj Solar Farm' },
  { id: 'SIG-00299', label: 'SIG-00299 — Jamnagar Wind Cluster 3' },
  { id: 'SIG-00147', label: 'SIG-00147 — Surat Hybrid Site' },
]

export const hardTags: TagRow[] = [
  { id: 1, tagName: 'DC_Voltage', register: '40001', dataType: 'Float32', scaling: 'x0.1', unit: 'V', alarmThreshold: '>700 High' },
  { id: 2, tagName: 'AC_Power', register: '40003', dataType: 'Float32', scaling: 'x1', unit: 'kW', alarmThreshold: '<0 Low' },
  { id: 3, tagName: 'Inverter_Temp', register: '40005', dataType: 'Int16', scaling: 'x0.1', unit: '°C', alarmThreshold: '>75 High' },
  { id: 4, tagName: 'Grid_Freq', register: '40007', dataType: 'Float32', scaling: 'x0.01', unit: 'Hz', alarmThreshold: '<47.5 / >50.5' },
  { id: 5, tagName: 'DC_Current', register: '40009', dataType: 'Float32', scaling: 'x0.1', unit: 'A', alarmThreshold: '>250 High' },
  { id: 6, tagName: 'Insulation_Resistance', register: '40011', dataType: 'Int32', scaling: 'x1', unit: 'kΩ', alarmThreshold: '<500 Low' },
]

export const softTags: TagRow[] = [
  { id: 1, tagName: 'Specific_Yield', register: 'Derived', dataType: 'Float32', scaling: 'x1', unit: 'kWh/kWp', alarmThreshold: '—' },
  { id: 2, tagName: 'Performance_Ratio', register: 'Derived', dataType: 'Float32', scaling: 'x1', unit: '%', alarmThreshold: '<75 Low' },
  { id: 3, tagName: 'CUF_Rolling_30d', register: 'Derived', dataType: 'Float32', scaling: 'x1', unit: '%', alarmThreshold: '—' },
  { id: 4, tagName: 'Availability_Index', register: 'Derived', dataType: 'Float32', scaling: 'x1', unit: '%', alarmThreshold: '<98 Low' },
]

export const archivalTags: TagRow[] = [
  { id: 1, tagName: 'Daily_Generation_Total', register: 'Archive', dataType: 'Float64', scaling: 'x1', unit: 'kWh', alarmThreshold: '—' },
  { id: 2, tagName: 'Monthly_Generation_Total', register: 'Archive', dataType: 'Float64', scaling: 'x1', unit: 'kWh', alarmThreshold: '—' },
  { id: 3, tagName: 'Peak_Power_Of_Day', register: 'Archive', dataType: 'Float32', scaling: 'x1', unit: 'kW', alarmThreshold: '—' },
  { id: 4, tagName: 'Communication_Uptime_Daily', register: 'Archive', dataType: 'Float32', scaling: 'x1', unit: '%', alarmThreshold: '<95 Low' },
  { id: 5, tagName: 'Running_Hours_Cumulative', register: 'Archive', dataType: 'Int32', scaling: 'x1', unit: 'hrs', alarmThreshold: '—' },
]

export const alarmEventTags: TagRow[] = [
  { id: 1, tagName: 'Grid_Failure', register: '40501', dataType: 'Boolean', scaling: 'x1', unit: '—', alarmThreshold: 'Trip on 1' },
  { id: 2, tagName: 'Overload_Trip', register: '40502', dataType: 'Boolean', scaling: 'x1', unit: '—', alarmThreshold: 'Trip on 1' },
  { id: 3, tagName: 'Phase_Failure', register: '40503', dataType: 'Boolean', scaling: 'x1', unit: '—', alarmThreshold: 'Trip on 1' },
  { id: 4, tagName: 'High_Temperature_Alarm', register: '40504', dataType: 'Boolean', scaling: 'x1', unit: '—', alarmThreshold: '>75°C' },
  { id: 5, tagName: 'Reverse_Power_Flow', register: '40505', dataType: 'Boolean', scaling: 'x1', unit: '—', alarmThreshold: 'Trip on 1' },
]

export const dataTypeOptions = ['Float32', 'Float64', 'Int16', 'Int32', 'Boolean', 'String'] as const
