import { Box, Chip, IconButton, List, ListItem, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { ScheduledReport } from '../mockData'

const frequencyColors: Record<ScheduledReport['frequency'], string> = {
  Daily: '#0B2545',
  Weekly: '#C9932E',
  Monthly: '#2E7D32',
}

interface ScheduledReportsPanelProps {
  reports: ScheduledReport[]
  onDelete: (report: ScheduledReport) => void
}

export function ScheduledReportsPanel({ reports, onDelete }: ScheduledReportsPanelProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <ScheduleOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Scheduled Reports
        </Typography>
      </Box>
      <List disablePadding>
        {reports.map((report) => (
          <ListItem
            key={report.id}
            disableGutters
            sx={{
              borderBottom: '1px solid #EEF1F5',
              py: 1.25,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ListItemText
              primary={report.name}
              secondary={report.format ? `Format: ${report.format}` : undefined}
              slotProps={{ primary: { sx: { fontWeight: 600, fontSize: 14 } } }}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Chip
                label={report.frequency}
                size="small"
                sx={{
                  bgcolor: `${frequencyColors[report.frequency]}1A`,
                  color: frequencyColors[report.frequency],
                  fontWeight: 700,
                }}
              />
              <Tooltip title="Remove scheduled report">
                <IconButton size="small" onClick={() => onDelete(report)}>
                  <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </ListItem>
        ))}
        {reports.length === 0 && (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No scheduled reports yet.
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  )
}
