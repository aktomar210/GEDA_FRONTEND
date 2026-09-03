import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import type { LiveTagValue } from '../mockData'

interface LiveTagGridProps {
  tags: LiveTagValue[]
}

function tagColor(tag: LiveTagValue): string {
  if (tag.warnAbove !== undefined && tag.value > tag.warnAbove) return '#C62828'
  if (tag.warnBelow !== undefined && tag.value < tag.warnBelow) return '#C62828'
  return '#2E7D32'
}

export function LiveTagGrid({ tags }: LiveTagGridProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
        <BoltOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Live Parameters (Hard / Soft Tags)
        </Typography>
      </Stack>
      <Grid container spacing={1.5}>
        {tags.map((tag) => (
          <Grid key={tag.label} size={{ xs: 6, sm: 4 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                border: '1px solid #E3E8EF',
                bgcolor: '#F9FAFB',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {tag.label}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: tagColor(tag) }}>
                {tag.value.toFixed(tag.unit === 'Hz' ? 2 : 1)}
                <Typography component="span" variant="caption" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  {tag.unit}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
