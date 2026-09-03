import { Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material'
import type { DataSetOption } from '../mockData'

interface DataSetSelectorProps {
  options: DataSetOption[]
  selected: Set<string>
  onToggle: (id: string) => void
}

export function DataSetSelector({ options, selected, onToggle }: DataSetSelectorProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Select Data Sets for Export
      </Typography>
      <Grid container spacing={0.5}>
        {options.map((option) => (
          <Grid key={option.id} size={{ xs: 12, sm: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.has(option.id)}
                  onChange={() => onToggle(option.id)}
                  color="secondary"
                />
              }
              label={<Typography variant="body2">{option.label}</Typography>}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
