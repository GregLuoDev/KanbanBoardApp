"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TaskTableWithCRUD } from "./TaskTableWithCRUD";

const queryClient = new QueryClient();

export function TaskTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskTableWithCRUD />
    </QueryClientProvider>
  );
}
