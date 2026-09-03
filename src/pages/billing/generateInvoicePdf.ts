import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { SlabRow } from './mockData'

const NAVY = '#0B2545'
const GOLD = '#C9932E'

interface InvoicePdfInput {
  kpis: {
    discoveredMonthlyPrice: string
    slaDeduction: string
    delayPenalty: string
    netPayable: string
  }
  slabRows: SlabRow[]
  formula: string
}

/** Converts the Rupee symbol (U+20B9) to 'Rs. ' so the standard Helvetica font renders it cleanly. */
function sanitizePdfCurrency(str: string): string {
  if (!str) return ''
  return str.replace(/₹/g, 'Rs. ')
}

/**
 * Builds the invoice as native vector PDF content (text + jspdf-autotable),
 * not a rasterized screenshot — keeps the file a few tens of KB instead of
 * several MB, and keeps the text selectable/searchable.
 */
export function generateInvoicePdf({ kpis, slabRows, formula }: InvoicePdfInput): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const marginX = 40
  const today = new Date()
  const period = today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const invoiceNo = `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}${String(today.getHours()).padStart(2, '0')}${String(today.getMinutes()).padStart(2, '0')}`

  // Header band
  doc.setFillColor(NAVY)
  doc.rect(0, 0, pageWidth, 70, 'F')
  doc.setTextColor('#FFFFFF')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('GEDA SCADA SaaS Platform', marginX, 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Gujarat Energy Development Agency • SLA Compliance Invoice', marginX, 48)

  doc.setTextColor(NAVY)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('SLA Compliance Invoice', marginX, 100)

  // Meta info (invoice no / period / generated date)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor('#5B6B82')
  const metaY = 122
  doc.text(`Invoice No.: ${invoiceNo}`, marginX, metaY)
  doc.text(`Billing Period: ${period}`, marginX, metaY + 14)
  doc.text(
    `Generated: ${today.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
    marginX,
    metaY + 28,
  )
  doc.text('Billed To: Gujarat Energy Development Agency (GEDA)', pageWidth - marginX, metaY, { align: 'right' })
  doc.text('Billed By: Qpaix Infitech Private Limited', pageWidth - marginX, metaY + 14, { align: 'right' })

  // KPI summary boxes
  const kpiY = 165
  const kpiBoxes = [
    { label: 'Discovered Monthly Price', value: sanitizePdfCurrency(kpis.discoveredMonthlyPrice) },
    { label: 'SLA Deduction (This Month)', value: sanitizePdfCurrency(kpis.slaDeduction) },
    { label: 'Delay Penalty', value: sanitizePdfCurrency(kpis.delayPenalty) },
    { label: 'Net Payable', value: sanitizePdfCurrency(kpis.netPayable) },
  ]
  const boxWidth = (pageWidth - marginX * 2 - 3 * 10) / 4
  kpiBoxes.forEach((box, i) => {
    const x = marginX + i * (boxWidth + 10)
    doc.setDrawColor('#E3E8EF')
    doc.setFillColor('#F4F6F9')
    doc.roundedRect(x, kpiY, boxWidth, 56, 4, 4, 'FD')
    doc.setTextColor('#5B6B82')
    doc.setFontSize(8)
    doc.text(box.label, x + 8, kpiY + 18, { maxWidth: boxWidth - 16 })
    doc.setTextColor(NAVY)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text(box.value, x + 8, kpiY + 40)
    doc.setFont('helvetica', 'normal')
  })

  // Slab breakdown table
  autoTable(doc, {
    startY: kpiY + 80,
    margin: { left: marginX, right: marginX },
    head: [['Slab', 'Devices Billed', 'Avg. Uptime', 'Rate/Device', 'Slab Value', 'Deduction']],
    body: slabRows.map((row) => [
      row.slab,
      row.devicesBilled.toLocaleString('en-IN'),
      row.avgUptime,
      sanitizePdfCurrency(row.ratePerDevice),
      sanitizePdfCurrency(row.slabValue),
      sanitizePdfCurrency(row.deduction),
    ]),
    headStyles: { fillColor: NAVY, textColor: '#FFFFFF', fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: '#1A2332' },
    alternateRowStyles: { fillColor: '#F4F6F9' },
    columnStyles: {
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
      5: { halign: 'right', textColor: '#C62828', fontStyle: 'bold' },
    },
  })

  // Formula callout
  const afterTableY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24
  doc.setDrawColor(GOLD)
  doc.setFillColor('#FCF6EB')
  const formulaLines = doc.splitTextToSize(formula, pageWidth - marginX * 2 - 20)
  const formulaBoxHeight = 24 + formulaLines.length * 12
  doc.roundedRect(marginX, afterTableY, pageWidth - marginX * 2, formulaBoxHeight, 4, 4, 'FD')
  doc.setTextColor(NAVY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Invoice Generation Formula', marginX + 10, afterTableY + 16)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor('#5B6B82')
  doc.setFontSize(9)
  doc.text(formulaLines, marginX + 10, afterTableY + 30)

  // Footer note
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFontSize(8)
  doc.setTextColor('#9AA5B4')
  doc.text(
    'This is a system-generated demo invoice from the GEDA SCADA SaaS Platform. Not valid for statutory or accounting purposes.',
    marginX,
    pageHeight - 30,
  )
  doc.text(`Invoice No. ${invoiceNo}`, pageWidth - marginX, pageHeight - 30, { align: 'right' })

  doc.save(`${invoiceNo}.pdf`)
}
