'use client';

import { TCard } from '../shared/data';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDialog } from '../dialogs/useDialog';
import { EditTaskDialog } from '../dialogs/EditTaskDialog';

export function EditTaskButton({ card }: { card: TCard }) {
  const { open, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpenDialog}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <EditTaskDialog open={open} card={card} handleCloseDialog={handleCloseDialog} />
    </>
  );
}
