// Mock data — replace with real API call when the Billing module backend is built

export const billingKpis = {
  discoveredMonthlyPrice: '₹46.29/device',
  slaDeduction: '₹18,240',
  delayPenalty: '₹4,000',
  netPayable: '₹8,42,110',
}

export interface SlabRow {
  id: number
  slab: string
  devicesBilled: number
  avgUptime: string
  ratePerDevice: string
  slabValue: string
  deduction: string
}

export const slabRows: SlabRow[] = [
  { id: 1, slab: '0-500', devicesBilled: 480, avgUptime: '98.2%', ratePerDevice: '₹60.00', slabValue: '₹28,800', deduction: '₹520' },
  { id: 2, slab: '>500-2000', devicesBilled: 1920, avgUptime: '97.6%', ratePerDevice: '₹55.00', slabValue: '₹1,05,600', deduction: '₹2,410' },
  { id: 3, slab: '>2000-5000', devicesBilled: 4680, avgUptime: '96.8%', ratePerDevice: '₹45.00', slabValue: '₹2,10,600', deduction: '₹6,740' },
]

export const invoiceFormula =
  'Monthly Payable = Monthly Discovered SaaS Price − SLA Deductions − Delay Penalties − LD/Recoveries'
