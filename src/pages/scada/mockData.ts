// Mock data — replace with real live telemetry (MQTT/tag feed) when the SCADA ingestion layer is built

export interface LiveTagValue {
  label: string
  value: number
  unit: string
  min: number
  max: number
  warnAbove?: number
  warnBelow?: number
}

/** Seeds a plausible live-value snapshot for a device, keyed by device id so each device looks distinct. */
export function seedLiveTags(deviceId: number): LiveTagValue[] {
  const seed = deviceId % 7
  return [
    { label: 'DC Voltage', value: 590 + seed * 6, unit: 'V', min: 0, max: 750, warnAbove: 700 },
    { label: 'DC Current', value: 210 + seed * 4, unit: 'A', min: 0, max: 300, warnAbove: 250 },
    { label: 'AC Power', value: 22 + seed * 1.4, unit: 'kW', min: 0, max: 50 },
    { label: 'Inverter Temp', value: 38 + seed * 1.1, unit: '°C', min: 0, max: 90, warnAbove: 75 },
    { label: 'Grid Frequency', value: 49.95 + seed * 0.02, unit: 'Hz', min: 47, max: 52, warnBelow: 47.5, warnAbove: 50.5 },
    { label: 'Insulation Resistance', value: 620 - seed * 8, unit: 'kΩ', min: 0, max: 1000, warnBelow: 500 },
  ]
}

export interface TrendPoint {
  hour: string
  value: number
}

/** Seeds a plausible last-6-hours AC power trend for a device. */
export function seedTrend(deviceId: number): TrendPoint[] {
  const seed = deviceId % 5
  const base = 18 + seed * 2
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  const curve = [0.6, 0.8, 0.95, 1, 0.9, 0.75]
  return hours.map((hour, i) => ({ hour, value: Math.round(base * curve[i] * 10) / 10 }))
}

export interface ScadaAlert {
  message: string
  severity: 'HIGH' | 'MED' | 'LOW'
  raisedAt: string
}

/** Seeds a plausible active-alert banner for a device (deterministic by id so it's stable across renders). */
export function seedActiveAlert(deviceId: number): ScadaAlert | null {
  if (deviceId % 3 !== 0) return null
  return {
    message: 'Inverter operating temperature approaching threshold (72.4°C / limit 75°C)',
    severity: 'MED',
    raisedAt: '12 min ago',
  }
}
