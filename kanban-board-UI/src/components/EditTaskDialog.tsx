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

export function EditTaskDialog({ table, row, internalEditComponents }:any) {
  return (
    <>
      <DialogTitle variant="h3">Edit User</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {internalEditComponents} {/* or render custom edit components here */}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}
