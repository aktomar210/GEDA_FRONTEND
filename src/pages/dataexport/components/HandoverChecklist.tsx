import { Box, Checkbox, List, ListItem, Paper, Typography } from '@mui/material'

interface HandoverChecklistProps {
  items: string[]
}

export function HandoverChecklist({ items }: HandoverChecklistProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Handover Checklist (Contract Exit)
      </Typography>
      <List dense disablePadding>
        {items.map((item) => (
          <ListItem key={item} disableGutters sx={{ py: 0.25 }}>
            <Checkbox checked disabled color="success" sx={{ p: 0.5, mr: 1 }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2">{item}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
