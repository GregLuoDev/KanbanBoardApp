import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Task } from "../lib/types";
import { StatusCell } from "../components/StatusCell";

export function useTaskTable() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => <StatusCell cell={cell}></StatusCell>,
      },
    ],
    [validationErrors]
  );

  const validateRequired = (value: string) => !!value.length;

  function validateTask(task: Task) {
    return {
      title: !validateRequired(task.title) ? "Title is required" : "",
      status: task.status >= 0 ? "" : "Status is required",
    };
  }

  return { columns, validateTask, setValidationErrors };
}
