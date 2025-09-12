/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

export function RowActions({ row, table }: any) {
  const [open, setOpen] = useState(false);

  function openDeleteConfirmDialog() {
    setOpen(true);
  }

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={openDeleteConfirmDialog}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <DeleteConfirmDialog
        open={open}
        setOpen={setOpen}
        taskId={row.original.id}
      />
    </Box>
  );
}
