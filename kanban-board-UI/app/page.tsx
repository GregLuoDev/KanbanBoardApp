"use client";

import { TasksTable } from "@/src/tasks-table/TasksTable";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/lib/store";
import { fetchTasks } from "@/src/lib/thunks/taskAsyncThunks";
import { Typography } from "@mui/material";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-4">
      <Typography variant="h3" gutterBottom>
        Kanban Task Board
      </Typography>
      <TasksTable />
    </div>
  );
}
