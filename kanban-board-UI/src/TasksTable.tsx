"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksTableWithCRUD } from "./TasksTableWithCRUD";

const queryClient = new QueryClient();

export function TasksTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksTableWithCRUD />
    </QueryClientProvider>
  );
}
