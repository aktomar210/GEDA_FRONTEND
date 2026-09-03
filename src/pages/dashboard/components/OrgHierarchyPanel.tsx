import { Box, Chip, Paper, Skeleton, Typography } from '@mui/material'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import type { OrgTreeNodeDto } from '../../../types/org'
import { formatCount } from '../../../utils/formatters'

interface OrgHierarchyPanelProps {
  tree: OrgTreeNodeDto[] | null
  loading: boolean
}

function renderNode(node: OrgTreeNodeDto) {
  return (
    <TreeItem
      key={node.id}
      itemId={String(node.id)}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 0.25,
            pr: 1,
          }}
        >
          <Typography variant="body2" noWrap sx={{ mr: 1 }}>
            {node.name}
          </Typography>
          <Chip
            label={formatCount(node.deviceCount)}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: 11 }}
          />
        </Box>
      }
    >
      {node.children.map(renderNode)}
    </TreeItem>
  )
}

export function OrgHierarchyPanel({ tree, loading }: OrgHierarchyPanelProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <AccountTreeOutlinedIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Organization Hierarchy
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="65%" sx={{ ml: 2 }} />
          <Skeleton variant="text" width="55%" sx={{ ml: 4 }} />
          <Skeleton variant="text" width="45%" sx={{ ml: 6 }} />
        </Box>
      )}

      {!loading && (!tree || tree.length === 0) && (
        <Typography variant="body2" color="text.secondary">
          No organization data available.
        </Typography>
      )}

      {!loading && tree && tree.length > 0 && (
        <SimpleTreeView
          defaultExpandedItems={tree.map((node) => String(node.id))}
          sx={{ maxHeight: 360, overflowY: 'auto' }}
        >
          {tree.map(renderNode)}
        </SimpleTreeView>
      )}
    </Paper>
  )
}
