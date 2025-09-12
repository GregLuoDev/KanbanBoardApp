/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksTableWithCRUD } from "./TasksTableWithCRUD";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./lib/store";
import { fetchTasks } from "./lib/thunks/taskAsyncThunks";

const queryClient = new QueryClient();

export function TasksTable() {
  const dispatch = useAppDispatch();
  // const { tasks, isLoadingTasks, fetchingTasksError } = useAppSelector(
  //   (state) => state.task
  // );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // console.log("==========isLoadingTass", isLoadingTasks);
  // console.log("==========tasks", tasks);
  // if (isLoadingTasks) return <p>Loading tasks...</p>;
  // if (fetchingTasksError) return <p>Error: {fetchingTasksError}</p>;
  // if (!tasks) return <p>No tasks found.</p>;

  return (
    <QueryClientProvider client={queryClient}>
      <TasksTableWithCRUD />
    </QueryClientProvider>
  );
}
