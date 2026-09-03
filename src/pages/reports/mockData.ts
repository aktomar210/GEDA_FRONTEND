// Mock data — replace with real API call when the Reports & Analytics module backend is built

export type ReportPeriod = 'Daily' | 'Weekly' | 'Monthly' | 'Custom Range'

export const periodOptions: ReportPeriod[] = ['Daily', 'Weekly', 'Monthly', 'Custom Range']

export interface PlantGenerationDatum {
  plant: string
  generationMwh: number
}

export const plantGenerationData: PlantGenerationDatum[] = [
  { plant: 'Rajkot P1', generationMwh: 412 },
  { plant: 'Bhuj Solar', generationMwh: 358 },
  { plant: 'Jamnagar W3', generationMwh: 296 },
  { plant: 'Surat Hybrid', generationMwh: 274 },
  { plant: 'Porbandar P2', generationMwh: 189 },
  { plant: 'Bhavnagar S1', generationMwh: 245 },
]

export interface DiscomUptimeDatum {
  discom: string
  uptimePercent: number
  slaTarget: number
}

export const discomUptimeData: DiscomUptimeDatum[] = [
  { discom: 'PGVCL', uptimePercent: 98.6, slaTarget: 98 },
  { discom: 'UGVCL', uptimePercent: 97.2, slaTarget: 98 },
  { discom: 'MGVCL', uptimePercent: 99.1, slaTarget: 98 },
  { discom: 'DGVCL', uptimePercent: 96.4, slaTarget: 98 },
]

export interface ScheduledReport {
  id: number
  name: string
  frequency: 'Daily' | 'Weekly' | 'Monthly'
  categoryId?: string
  format?: ReportFormat
}

export type ReportFormat = 'PDF' | 'XLSX' | 'CSV'

export const reportFormatOptions: ReportFormat[] = ['PDF', 'XLSX', 'CSV']

export const scheduledReports: ScheduledReport[] = [
  { id: 1, name: 'Monthly SLA Compliance Report', frequency: 'Monthly', categoryId: 'connectivity', format: 'PDF' },
  { id: 2, name: 'IoT Vendor Performance Report', frequency: 'Weekly', categoryId: 'connectivity', format: 'XLSX' },
  { id: 3, name: 'Billing & Deduction Summary', frequency: 'Monthly', categoryId: 'billing', format: 'PDF' },
  { id: 4, name: 'Daily Generation Snapshot', frequency: 'Daily', categoryId: 'generation', format: 'CSV' },
  { id: 5, name: 'Communication Uptime Digest', frequency: 'Weekly', categoryId: 'connectivity', format: 'XLSX' },
]

export interface RepresentativeReport {
  name: string
  format: ReportFormat
  lastRun: string
  /** Column headers for this report's demo data table. */
  columns: string[]
  /** Demo data rows, each matching `columns` in order. */
  rows: (string | number)[][]
}

export interface ReportCategory {
  id: string
  title: string
  description: string
  reportCount: number
  reports: RepresentativeReport[]
}

export const reportCatalog: ReportCategory[] = [
  {
    id: 'generation',
    title: 'Generation & Performance',
    description:
      'Hourly/daily/weekly/monthly/annual generation, inverter/feeder/consumer-wise reports, downtime analysis, running hours, specific yield, seasonal trends',
    reportCount: 12,
    reports: [
      {
        name: 'Monthly Generation Summary',
        format: 'PDF',
        lastRun: '2 days ago',
        columns: ['Plant', 'Type', 'Generation (MWh)', 'Specific Yield (kWh/kWp)'],
        rows: [
          ['Rajkot Solar Plant 1', 'Solar', 412, 4.6],
          ['Bhuj Solar Plant', 'Solar', 358, 4.3],
          ['Jamnagar Wind Plant', 'Wind', 296, 3.8],
          ['Surat Hybrid Plant', 'Hybrid', 274, 4.1],
          ['Porbandar Solar Plant 2', 'Solar', 189, 3.9],
          ['Bhavnagar Solar Plant', 'Solar', 245, 4.4],
        ],
      },
      {
        name: 'Feeder-wise Generation Report',
        format: 'XLSX',
        lastRun: '1 week ago',
        columns: ['Feeder ID', 'Plant', 'Generation (kWh)', 'Running Hours'],
        rows: [
          ['FDR-101', 'Rajkot Solar Plant 1', 138400, 312],
          ['FDR-102', 'Rajkot Solar Plant 1', 141600, 318],
          ['FDR-201', 'Bhuj Solar Plant', 178200, 298],
          ['FDR-301', 'Jamnagar Wind Plant', 296000, 402],
        ],
      },
      {
        name: 'Downtime & Running Hours Analysis',
        format: 'CSV',
        lastRun: '3 days ago',
        columns: ['Plant', 'Running Hours', 'Downtime (hrs)', 'Downtime %'],
        rows: [
          ['Rajkot Solar Plant 1', 690, 6.2, '0.9%'],
          ['Bhuj Solar Plant', 672, 24.5, '3.5%'],
          ['Jamnagar Wind Plant', 705, 9.1, '1.3%'],
          ['Surat Hybrid Plant', 664, 32.8, '4.7%'],
        ],
      },
    ],
  },
  {
    id: 'efficiency',
    title: 'Efficiency (CUF/PR)',
    description:
      '% CUF, Performance Ratio, system/device efficiency, irradiance correlation, energy conversion efficiency, comparative efficiency',
    reportCount: 8,
    reports: [
      {
        name: 'Plant-wise CUF % Report',
        format: 'PDF',
        lastRun: 'Today',
        columns: ['Plant', 'CUF %', 'Performance Ratio %', 'Rated Capacity (kW)'],
        rows: [
          ['Mehsana Solar Plant 1', '17.3%', '86.7%', 1100],
          ['Junagadh Solar Plant 1', '17.3%', '86.3%', 1000],
          ['Rajkot Solar Plant 2', '16.6%', '82.8%', 900],
          ['Rajkot Solar Plant 1', '15.1%', '75.7%', 1200],
        ],
      },
      {
        name: 'Performance Ratio Trend',
        format: 'XLSX',
        lastRun: '4 days ago',
        columns: ['Week', 'Avg. PR %', 'Best Plant', 'Worst Plant'],
        rows: [
          ['Week 1', '84.2%', 'Mehsana Solar Plant 1', 'Patan Solar Plant 1'],
          ['Week 2', '85.6%', 'Junagadh Solar Plant 1', 'Patan Wind Plant 1'],
          ['Week 3', '83.9%', 'Mehsana Solar Plant 1', 'Rajkot Solar Plant 1'],
          ['Week 4', '86.1%', 'Rajkot Solar Plant 2', 'Patan Solar Plant 1'],
        ],
      },
      {
        name: 'Irradiance Correlation Report',
        format: 'CSV',
        lastRun: '1 week ago',
        columns: ['Plant', 'Avg. Irradiance (kWh/m²/day)', 'Generation (kWh)', 'Correlation'],
        rows: [
          ['Rajkot Solar Plant 1', 5.4, 4360, 'Strong'],
          ['Bhuj Solar Plant', 5.6, 4142, 'Strong'],
          ['Mehsana Solar Plant 1', 5.2, 4578, 'Moderate'],
        ],
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Energy Accounting',
    description:
      'Net/import/export energy, net & gross metering, billing cycle statements, consumer settlement, monthly/annual/feeder/transformer-wise energy accounting, DISCOM billing integration',
    reportCount: 10,
    reports: [
      {
        name: 'Net & Gross Metering Statement',
        format: 'PDF',
        lastRun: '5 days ago',
        columns: ['Consumer ID', 'Import (kWh)', 'Export (kWh)', 'Net (kWh)'],
        rows: [
          ['GJ-SLR-44231', 1240, 1860, -620],
          ['GJ-SLR-44502', 980, 1420, -440],
          ['GJ-SLR-44718', 1560, 1120, 440],
          ['GJ-SLR-44903', 720, 1980, -1260],
        ],
      },
      {
        name: 'Consumer Settlement Report',
        format: 'XLSX',
        lastRun: '2 weeks ago',
        columns: ['Consumer ID', 'Settlement Period', 'Net Energy (kWh)', 'Amount (Rs.)'],
        rows: [
          ['GJ-SLR-44231', 'Jul 2026', -620, 3410],
          ['GJ-SLR-44502', 'Jul 2026', -440, 2420],
          ['GJ-SLR-44718', 'Jul 2026', 440, -2420],
        ],
      },
      {
        name: 'DISCOM Billing Integration Log',
        format: 'CSV',
        lastRun: 'Yesterday',
        columns: ['Sync Timestamp', 'DISCOM', 'Records Synced', 'Status'],
        rows: [
          ['25-Aug 06:00', 'PGVCL', 1842, 'Success'],
          ['25-Aug 06:00', 'UGVCL', 1560, 'Success'],
          ['25-Aug 06:00', 'MGVCL', 1204, 'Success'],
          ['25-Aug 06:00', 'DGVCL', 980, 'Partial'],
        ],
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical Health & Faults',
    description:
      'Over/under-voltage, voltage unbalance, overload, high temperature, grid failure, frequency variation, harmonic distortion, phase failure, reverse power flow, alarm/event/trip logs',
    reportCount: 15,
    reports: [
      {
        name: 'Voltage Excursion Report',
        format: 'PDF',
        lastRun: 'Today',
        columns: ['Device', 'Excursion Type', 'Peak Value', 'Duration (min)'],
        rows: [
          ['DEV-RJK01-001', 'Over-voltage', '712 V', 4],
          ['DEV-JND02-001', 'Under-voltage', '195 V', 12],
          ['DEV-PTN02-001', 'Voltage Unbalance', '3.8%', 7],
        ],
      },
      {
        name: 'Alarm/Event/Trip Log',
        format: 'CSV',
        lastRun: '6 hrs ago',
        columns: ['Time', 'Device', 'Event', 'Severity'],
        rows: [
          ['25-Aug 10:42', 'DEV-RJK02-001', 'Inverter over-temperature', 'HIGH'],
          ['25-Aug 09:15', 'DEV-MSN02-002', 'Grid frequency deviation', 'MED'],
          ['25-Aug 06:30', 'DEV-JND02-001', 'Communication trip', 'HIGH'],
        ],
      },
      {
        name: 'Harmonic Distortion Summary',
        format: 'XLSX',
        lastRun: '3 days ago',
        columns: ['Device', 'THD Voltage %', 'THD Current %', 'Status'],
        rows: [
          ['DEV-RJK01-001', '2.1%', '3.4%', 'Normal'],
          ['DEV-BHJ01-001', '4.8%', '6.2%', 'Warning'],
          ['DEV-PTN02-001', '2.9%', '3.8%', 'Normal'],
        ],
      },
    ],
  },
  {
    id: 'connectivity',
    title: 'Connectivity & SLA',
    description:
      '% device connectivity, % data availability, communication/gateway uptime, missing-data analysis, SLA compliance, penalty computation, escalation & vendor/system-wise SLA reports',
    reportCount: 9,
    reports: [
      {
        name: 'SLA Compliance Report',
        format: 'PDF',
        lastRun: 'Today',
        columns: ['DISCOM', 'Uptime %', 'SLA Target %', 'Status'],
        rows: [
          ['PGVCL', '98.6%', '98%', 'Met'],
          ['UGVCL', '97.2%', '98%', 'Breached'],
          ['MGVCL', '99.1%', '98%', 'Met'],
          ['DGVCL', '96.4%', '98%', 'Breached'],
        ],
      },
      {
        name: 'Gateway Uptime by DISCOM',
        format: 'XLSX',
        lastRun: '2 days ago',
        columns: ['DISCOM', 'Gateways Online', 'Gateways Total', 'Uptime %'],
        rows: [
          ['PGVCL', 142, 148, '95.9%'],
          ['UGVCL', 118, 126, '93.7%'],
          ['MGVCL', 96, 98, '98.0%'],
          ['DGVCL', 84, 90, '93.3%'],
        ],
      },
      {
        name: 'Missing-Data Analysis',
        format: 'CSV',
        lastRun: '1 week ago',
        columns: ['Device', 'Expected Readings', 'Missing Readings', 'Availability %'],
        rows: [
          ['DEV-RJK02-001', 2880, 96, '96.7%'],
          ['DEV-JND02-001', 2880, 412, '85.7%'],
          ['DEV-PTN02-001', 2880, 58, '98.0%'],
        ],
      },
    ],
  },
  {
    id: 'comparative',
    title: 'Comparative & Predictive',
    description:
      'Duration/season comparisons, multi-plant/device comparisons, benchmarking, weather vs. generation correlation, trend forecasting',
    reportCount: 6,
    reports: [
      {
        name: 'Multi-Plant Benchmarking Report',
        format: 'PDF',
        lastRun: '1 week ago',
        columns: ['Plant', 'This Month (MWh)', 'Last Month (MWh)', 'Change %'],
        rows: [
          ['Rajkot Solar Plant 1', 412, 388, '+6.2%'],
          ['Bhuj Solar Plant', 358, 372, '-3.8%'],
          ['Jamnagar Wind Plant', 296, 254, '+16.5%'],
          ['Surat Hybrid Plant', 274, 281, '-2.5%'],
        ],
      },
      {
        name: 'Weather vs. Generation Correlation',
        format: 'XLSX',
        lastRun: '4 days ago',
        columns: ['Date', 'Avg. Temp (°C)', 'Irradiance (kWh/m²)', 'Generation (MWh)'],
        rows: [
          ['21-Aug', 34, 5.6, 14.2],
          ['22-Aug', 36, 5.9, 15.1],
          ['23-Aug', 33, 5.1, 12.8],
          ['24-Aug', 35, 5.7, 14.6],
        ],
      },
      {
        name: 'Seasonal Trend Forecast',
        format: 'CSV',
        lastRun: '2 weeks ago',
        columns: ['Season', 'Forecast Generation (MWh)', 'Confidence'],
        rows: [
          ['Monsoon (Jun-Sep)', 9800, 'Medium'],
          ['Post-Monsoon (Oct-Nov)', 12400, 'High'],
          ['Winter (Dec-Feb)', 13100, 'High'],
          ['Summer (Mar-May)', 14600, 'High'],
        ],
      },
    ],
  },
  {
    id: 'meter',
    title: 'Meter/MDAS-MDM Reports',
    description:
      'Consumption trends, demand analysis, loss analysis, tamper/exception reports, meter mismatch reports',
    reportCount: 7,
    reports: [
      {
        name: 'Consumption Trend Report',
        format: 'PDF',
        lastRun: '3 days ago',
        columns: ['Meter ID', 'This Month (kWh)', 'Last Month (kWh)', 'Trend'],
        rows: [
          ['MTR-00231', 18420, 17650, 'Up'],
          ['MTR-00512', 22940, 23180, 'Down'],
          ['MTR-00718', 15680, 14920, 'Up'],
        ],
      },
      {
        name: 'Tamper/Exception Report',
        format: 'CSV',
        lastRun: 'Today',
        columns: ['Meter ID', 'Event Type', 'Timestamp', 'Severity'],
        rows: [
          ['MTR-00231', 'Cover Open', '12-Aug 14:22', 'Medium'],
          ['MTR-00231', 'Reverse Current', '10-Aug 09:03', 'High'],
          ['MTR-00512', 'Magnetic Influence', '05-Aug 21:40', 'High'],
        ],
      },
      {
        name: 'Meter Mismatch Report',
        format: 'XLSX',
        lastRun: '1 week ago',
        columns: ['Meter ID', 'MDAS Reading', 'Field Reading', 'Variance %'],
        rows: [
          ['MTR-00231', 18420, 18395, '0.14%'],
          ['MTR-00512', 22940, 22610, '1.44%'],
          ['MTR-00718', 15680, 15680, '0.00%'],
        ],
      },
    ],
  },
  {
    id: 'outage',
    title: 'Power-Off/Outage Reports',
    description:
      'Manufacturer-wise, site-wise, device/gateway-wise outage reports, SLA exclusion summaries, historical downtime analytics',
    reportCount: 5,
    reports: [
      {
        name: 'Site-wise Outage Report',
        format: 'PDF',
        lastRun: 'Yesterday',
        columns: ['Plant', 'Outage Start', 'Duration (hrs)', 'Cause'],
        rows: [
          ['Rajkot Solar Plant 2', '20-Aug 02:15', 3.2, 'Grid Failure'],
          ['Junagadh Wind Plant 1', '18-Aug 22:40', 6.8, 'Comm. Loss'],
          ['Patan Wind Plant 1', '15-Aug 11:05', 1.5, 'Maintenance'],
        ],
      },
      {
        name: 'SLA Exclusion Summary',
        format: 'XLSX',
        lastRun: '5 days ago',
        columns: ['Plant', 'Excluded Hours', 'Reason', 'SLA Impact'],
        rows: [
          ['Rajkot Solar Plant 2', 3.2, 'Grid-side Outage', 'None'],
          ['Junagadh Wind Plant 1', 6.8, 'Grid-side Outage', 'None'],
        ],
      },
      {
        name: 'Historical Downtime Analytics',
        format: 'CSV',
        lastRun: '2 weeks ago',
        columns: ['Month', 'Total Outages', 'Avg. Duration (hrs)', 'Total Downtime (hrs)'],
        rows: [
          ['Jun 2026', 8, 2.4, 19.2],
          ['Jul 2026', 5, 3.1, 15.5],
          ['Aug 2026', 6, 2.8, 16.8],
        ],
      },
    ],
  },
  {
    id: 'custom',
    title: 'Custom & Regulatory',
    description:
      'Commercial settlement, technical performance, regulatory compliance, consumer analytics, preventive maintenance, asset utilization — built via Report Designer with digital signature support',
    reportCount: 4,
    reports: [
      {
        name: 'Regulatory Compliance Report',
        format: 'PDF',
        lastRun: '1 week ago',
        columns: ['Compliance Item', 'Requirement', 'Status'],
        rows: [
          ['Encryption', 'AES-256 minimum', 'Compliant'],
          ['Data Retention', '≥ 3 years audit trail', 'Compliant'],
          ['Device Auth', 'X.509 certificates', 'Compliant'],
          ['Platform Availability', '> 98% per device/month', 'Compliant'],
        ],
      },
      {
        name: 'Preventive Maintenance Log',
        format: 'XLSX',
        lastRun: '3 days ago',
        columns: ['Plant', 'Maintenance Type', 'Last Serviced', 'Next Due'],
        rows: [
          ['Rajkot Solar Plant 1', 'Inverter Inspection', '01-Aug-2026', '01-Nov-2026'],
          ['Bhuj Solar Plant', 'Panel Cleaning', '15-Aug-2026', '15-Sep-2026'],
          ['Jamnagar Wind Plant', 'Gearbox Check', '20-Jul-2026', '20-Oct-2026'],
        ],
      },
      {
        name: 'Asset Utilization Report',
        format: 'CSV',
        lastRun: '4 days ago',
        columns: ['Asset Category', 'Total Units', 'Active Units', 'Utilization %'],
        rows: [
          ['Solar RMS Gateways', 9, 8, '88.9%'],
          ['Wind RMS Gateways', 3, 3, '100.0%'],
          ['Hybrid RMS Gateways', 2, 2, '100.0%'],
          ['Smart Meters', 15, 13, '86.7%'],
        ],
      },
    ],
  },
]
