'use client';

import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import invariant from 'tiny-invariant';

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
  TCard,
} from '../shared/data';
import { isShallowEqual } from '../shared/is-shallow-equal';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteConfirmDialog from '../dialogs/DeleteConfirmDialog';
import { useDialog } from '../dialogs/useDialog';

export function DeleteTaskButton({ cardId }: { cardId: string }) {
  const { open, setOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handleOpenDialog}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>

      <DeleteConfirmDialog open={open} setOpen={setOpen} taskId={cardId} />
    </>
  );
}
