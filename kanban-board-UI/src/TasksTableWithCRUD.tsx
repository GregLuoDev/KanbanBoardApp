"use client";

import {
  MaterialReactTable,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { type User } from "./makeData";
import { useGetUsers } from "./hooks/useGetTasks";
import { useCreateUser } from "./hooks/useCreateTask";
import { useUpdateUser } from "./hooks/useUpdateTask";
import { useDeleteTask } from "./hooks/useDeleteTask";
import { useTaskTableWithCRUD } from "./hooks/useTaskTableWithCRUD";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { EditTaskDialog } from "./components/EditTaskDialog";
import { RowActions } from "./components/RowActions";
import { TopToolbarCustomActions } from "./components/TopToolbarCustomActions";

export function TasksTableWithCRUD() {
  const { columns, validateUser, setValidationErrors } = useTaskTableWithCRUD();

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteTask, isPending: isDeletingTask } =
    useDeleteTask();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    enableColumnOrdering: true,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: CreateTaskDialog,
    renderEditRowDialogContent: EditTaskDialog,
    renderRowActions: ({ row, table }) => (
      <RowActions row={row} table={table} deleteTask={deleteTask} />
    ),
    renderTopToolbarCustomActions: TopToolbarCustomActions,
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingTask,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
}
