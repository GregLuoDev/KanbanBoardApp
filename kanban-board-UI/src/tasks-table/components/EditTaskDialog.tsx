import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TaskForm } from "./TaskForm";
import { Task } from "../../lib/types";

type Props = {
  row: MRT_Row<Task>;
  table: MRT_TableInstance<Task>;
};

export function EditTaskDialog({ table, row }: Props) {
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
