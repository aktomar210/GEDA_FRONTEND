import { useState } from 'react'
import { Box, Button, Grid, Snackbar, Stack, SvgIcon, Typography } from '@mui/material'
import type { SvgIconProps } from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined'
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import { KpiCard } from '../dashboard/components/KpiCard'
import { billingKpis, invoiceFormula, slabRows } from './mockData'
import { SlabTable } from './components/SlabTable'
import { InvoiceFormulaCallout } from './components/InvoiceFormulaCallout'
import { generateInvoicePdf } from './generateInvoicePdf'

/** Custom Indian Rupee (₹) Icon Component */
export function RupeeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M13.66 7C13.1 5.82 11.9 5 10.5 5H6V3h12v2h-3.26c.48.58.84 1.26 1.02 2H18v2h-2.1c-.34 2.14-2.02 3.8-4.22 3.96L17 21h-3.2l-5.18-7.82V13h1.88c2.21 0 4-1.79 4-4H6V7h7.66z"
      />
    </SvgIcon>
  )
}

export function BillingPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleGenerateInvoice = () => {
    generateInvoicePdf({ kpis: billingKpis, slabRows, formula: invoiceFormula })
    setSnackbarOpen(true)
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <ReceiptLongIcon color="primary" fontSize="small" />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Billing &amp; SLA Management
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Discovered pricing, SLA deductions, and delay penalties by device slab.
          </Typography>
        </Box>
        <Button variant="contained" color="secondary" onClick={handleGenerateInvoice}>
          Generate Invoice
        </Button>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            label="Discovered Monthly Price"
            value={billingKpis.discoveredMonthlyPrice}
            icon={RupeeIcon}
            accentColor="#0B2545"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            label="SLA Deduction"
            value={billingKpis.slaDeduction}
            icon={TrendingDownOutlinedIcon}
            accentColor="#C62828"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            label="Delay Penalty"
            value={billingKpis.delayPenalty}
            icon={ScheduleOutlinedIcon}
            accentColor="#ED6C02"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            label="Net Payable"
            value={billingKpis.netPayable}
            icon={AccountBalanceWalletIcon}
            accentColor="#2E7D32"
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 3 }}>
        <SlabTable rows={slabRows} />
      </Box>

      <InvoiceFormulaCallout formula={invoiceFormula} onDownload={handleGenerateInvoice} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Invoice PDF downloaded"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
