/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { type MRT_Row } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../makeData";

export function RowActions({ row, table, deleteTask }: any) {
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(row.original.id);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
