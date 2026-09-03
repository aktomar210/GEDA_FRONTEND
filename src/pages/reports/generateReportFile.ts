import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { RepresentativeReport } from './mockData'

const NAVY = '#0B2545'
const GOLD = '#C9932E'

interface GenerateReportFileInput {
  report: RepresentativeReport
  categoryTitle: string
}

/**
 * Produces a real, downloadable report file for the "Generate" action in
 * the Report Catalog — a properly formatted PDF (matching the Billing
 * invoice's visual style) for PDF-format reports, and a real CSV for
 * CSV/XLSX-format reports. Demo data only — no backend report engine yet.
 */
export function generateReportFile({ report, categoryTitle }: GenerateReportFileInput): void {
  if (report.format === 'PDF') {
    generatePdf(report, categoryTitle)
  } else {
    generateCsv(report, categoryTitle)
  }
}

function generatePdf(report: RepresentativeReport, categoryTitle: string): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const marginX = 40
  const now = new Date()
  const reportNo = `RPT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`

  // Header band
  doc.setFillColor(NAVY)
  doc.rect(0, 0, pageWidth, 70, 'F')
  doc.setTextColor('#FFFFFF')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('GEDA SCADA SaaS Platform', marginX, 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Reports & Analytics', marginX, 48)

  doc.setTextColor(NAVY)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  const titleLines = doc.splitTextToSize(report.name, pageWidth - marginX * 2)
  doc.text(titleLines, marginX, 100)

  // Meta info
  const metaY = 100 + titleLines.length * 16 + 14
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor('#5B6B82')
  doc.text(`Report No.: ${reportNo}`, marginX, metaY)
  doc.text(`Category: ${categoryTitle}`, marginX, metaY + 14)
  doc.text(
    `Generated: ${now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
    marginX,
    metaY + 28,
  )
  doc.text('Prepared By: GEDA SCADA SaaS Platform', pageWidth - marginX, metaY, { align: 'right' })
  doc.text('Qpaix Infitech Private Limited', pageWidth - marginX, metaY + 14, { align: 'right' })

  // Data table
  autoTable(doc, {
    startY: metaY + 46,
    margin: { left: marginX, right: marginX },
    head: [report.columns],
    body: report.rows.map((row) => row.map((cell) => String(cell))),
    headStyles: { fillColor: NAVY, textColor: '#FFFFFF', fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: '#1A2332' },
    alternateRowStyles: { fillColor: '#F4F6F9' },
  })

  // Demo-data note
  const afterTableY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20
  doc.setDrawColor(GOLD)
  doc.setFillColor('#FCF6EB')
  const noteText =
    'This report contains sample/demo data for presentation purposes. Live values will be sourced from the platform once the Reports module backend is connected to real telemetry.'
  const noteLines = doc.splitTextToSize(noteText, pageWidth - marginX * 2 - 20)
  const noteBoxHeight = 16 + noteLines.length * 12
  doc.roundedRect(marginX, afterTableY, pageWidth - marginX * 2, noteBoxHeight, 4, 4, 'FD')
  doc.setTextColor('#5B6B82')
  doc.setFontSize(8.5)
  doc.text(noteLines, marginX + 10, afterTableY + 14)

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFontSize(8)
  doc.setTextColor('#9AA5B4')
  doc.text(
    'This is a system-generated demo report from the GEDA SCADA SaaS Platform.',
    marginX,
    pageHeight - 30,
  )
  doc.text(`Report No. ${reportNo}`, pageWidth - marginX, pageHeight - 30, { align: 'right' })

  doc.save(`${report.name.replace(/\s+/g, '-')}-${reportNo}.pdf`)
}

function generateCsv(report: RepresentativeReport, categoryTitle: string): void {
  const now = new Date()
  const stamp = now.toISOString().replace(/[:.]/g, '-')

  const escapeCell = (value: string | number) => {
    const str = String(value)
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
  }

  const lines = [
    `# ${report.name}`,
    `# Category: ${categoryTitle}`,
    `# Generated: ${now.toLocaleString('en-IN')}`,
    '',
    report.columns.map(escapeCell).join(','),
    ...report.rows.map((row) => row.map(escapeCell).join(',')),
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${report.name.replace(/\s+/g, '-')}-${stamp}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
