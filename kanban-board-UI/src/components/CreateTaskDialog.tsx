/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  MRT_EditActionButtons,

} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";

export function CreateTaskDialog({ table, row, internalEditComponents }: any) {
  return (
    <>
      <DialogTitle variant="h3">Create New Task</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {internalEditComponents} {/* or render custom edit components here */}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}
