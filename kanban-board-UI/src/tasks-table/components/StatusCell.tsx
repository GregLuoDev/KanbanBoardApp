import { Chip } from "@mui/material";
import { MRT_Cell } from "material-react-table";
import { Task } from "../../lib/types";

export function StatusCell({ cell }: { cell: MRT_Cell<Task, unknown> }) {
  const status = cell.getValue();

  return (
    <>
      {status === 0 && <Chip label="To Do" color="primary" />}
      {status === 1 && <Chip label="In Progress" color="success" />}
      {status === 2 && <Chip label="Done" />}
    </>
  );
}
