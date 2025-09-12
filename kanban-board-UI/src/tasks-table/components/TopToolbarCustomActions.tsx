import { Button } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import { Task } from "../../lib/types";

type Props = {
  table: MRT_TableInstance<Task>;
};
export function TopToolbarCustomActions({ table }: Props) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        table.setCreatingRow(true);
      }}
    >
      Create New Task
    </Button>
  );
}
