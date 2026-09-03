/** Formats an ISO timestamp as a relative time string, e.g. "5 min ago". */
export function formatRelativeTime(isoTimestamp: string): string {
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return '—'

  const diffMs = Date.now() - date.getTime()
  const diffSec = Math.round(diffMs / 1000)

  if (diffSec < 5) return 'just now'
  if (diffSec < 60) return `${diffSec} sec ago`

  const diffMin = Math.round(diffSec / 60)
  if (diffMin < 60) return `${diffMin} min ago`

  const diffHour = Math.round(diffMin / 60)
  if (diffHour < 24) return `${diffHour} hr ago`

  const diffDay = Math.round(diffHour / 24)
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`

  return formatDate(isoTimestamp)
}

/** Formats an ISO date/timestamp as a readable date, e.g. "25 Aug 2026". */
export function formatDate(isoTimestamp: string | null | undefined): string {
  if (!isoTimestamp) return '—'
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** Formats an ISO timestamp as a readable date + time. */
export function formatDateTime(isoTimestamp: string | null | undefined): string {
  if (!isoTimestamp) return '—'
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Formats an hour-only label for chart X axes, e.g. "14:00". */
export function formatHourLabel(isoTimestamp: string): string {
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return isoTimestamp
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/** Formats a 0-100 numeric percent value, e.g. 98.4 -> "98.4%". */
export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`
}

/** Formats a kWh value, switching to MWh once it crosses 1000 kWh. */
export function formatEnergy(kwh: number): string {
  if (kwh >= 1000) {
    return `${(kwh / 1000).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })} MWh`
  }
  return `${kwh.toLocaleString('en-IN', { maximumFractionDigits: 1 })} kWh`
}

/** Formats a plain integer count with locale grouping, e.g. 1234 -> "1,234". */
export function formatCount(value: number): string {
  return value.toLocaleString('en-IN')
}
