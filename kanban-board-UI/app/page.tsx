'use client';

import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fetchTasks } from '@/src/lib/thunks/taskAsyncThunks';
import { CreateTaskButton } from '@/src/tasks-board/buttons/CreateTaskButton';
import { TColumn } from '@/src/tasks-board/shared/data';
import { TasksBoard } from '@/src/tasks-board/TasksBoard';
import { TasksTable } from '@/src/tasks-table/TasksTable';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  console.log('-----------tasks', tasks);

  const columns: TColumn[] = [
    { id: 'toDo', title: 'To Do', cards: tasks.filter((t) => t.status === 0) },
    { id: 'inProgress', title: 'In Progress', cards: tasks.filter((t) => t.status === 1) },
    { id: 'done', title: 'Done', cards: tasks.filter((t) => t.status === 2) },
  ];

  return (
    <div className="container mx-auto mt-4">
      <Typography variant="h3" gutterBottom>
        Kanban Task Board
      </Typography>

      <CreateTaskButton />

      <div>
        {isLoadingTasks && !fetchingTasksError ? (
          <CircularProgress />
        ) : (
          <TasksBoard initial={{ columns }} key={JSON.stringify(tasks)} />
        )}
      </div>

      {!!fetchingTasksError && (
        <Alert severity="error" className="m-6 mt-0">
          Cannot fetch tasks. Please try again.
        </Alert>
      )}
      <TasksTable />
    </div>
  );
}
