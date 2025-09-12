import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Task } from "../lib/types";

export function useTaskTableWithCRUD() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          //remove any previous validation errors when task focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: false,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        muiEditTextFieldProps: {
          type: "status",
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              status: undefined,
            }),
        },
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
