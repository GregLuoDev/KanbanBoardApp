import {
  MaterialReactTable,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { useTaskTable } from "./hooks/useTaskTable";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { EditTaskDialog } from "./components/EditTaskDialog";
import { RowActions } from "./components/RowActions";
import { TopToolbarCustomActions } from "./components/TopToolbarCustomActions";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { Task } from "../lib/types";
import { createTask, updateTask } from "../lib/thunks/taskAsyncThunks";

export function TasksTable() {
  const dispatch = useAppDispatch();
  const { columns, validateTask, setValidationErrors } = useTaskTable();

  const {
    tasks,
    isLoadingTasks,
    fetchingTasksError,
    isLoadingTask,
    isCreatingTask,
    isDeletingTask,
    error,
    isUpdatingTask,
  } = useAppSelector((state) => state.task);

  const handleCreateTask: MRT_TableOptions<Task>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateTask(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    dispatch(createTask(values));
    table.setCreatingRow(null); //exit creating mode
  };

  const handleUpdateTask: MRT_TableOptions<Task>["onEditingRowSave"] = async ({
    values,
    table,
    row,
  }) => {
    const originalData = row.original;

    const newValidationErrors = validateTask(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    dispatch(updateTask({ ...values, id: originalData.id }));
    table.setEditingRow(null); //exit editing mode
  };

  const table = useMaterialReactTable({
    columns,
    data: tasks,
    enableColumnOrdering: true,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: fetchingTasksError
      ? {
          color: "error",
          children: "Error loading tasks",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateTask,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateTask,
    renderCreateRowDialogContent: CreateTaskDialog,
    renderEditRowDialogContent: EditTaskDialog,
    renderRowActions: ({ row, table }) => (
      <RowActions row={row} table={table} />
    ),
    renderTopToolbarCustomActions: TopToolbarCustomActions,
    state: {
      isLoading: isLoadingTasks || isLoadingTask,
      isSaving: isCreatingTask || isUpdatingTask || isDeletingTask,
      showAlertBanner: !!fetchingTasksError || !!error,
      showProgressBars: isLoadingTasks,
    },
  });

  return <MaterialReactTable table={table} />;
}
