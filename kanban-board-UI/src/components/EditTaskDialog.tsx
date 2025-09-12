/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MRT_EditActionButtons } from "material-react-table";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TaskForm } from "./TaskForm";

export function EditTaskDialog({ table, row }: any) {
  return (
    <>
      <DialogTitle variant="h4">Edit Task</DialogTitle>
      <DialogContent>
        <TaskForm row={row} />
      </DialogContent>
      <DialogActions className="m-4">
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}
