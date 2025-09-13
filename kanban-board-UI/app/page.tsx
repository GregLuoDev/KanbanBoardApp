'use client';

import { TasksTable } from '@/src/tasks-table/TasksTable';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fetchTasks } from '@/src/lib/thunks/taskAsyncThunks';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { TBoard, TCard, TColumn } from '@/src/tasks-board/shared/data';
import { TasksBoard } from '@/src/tasks-board/TasksBoard';
import { CreateTaskDialog } from '@/src/tasks-board/dialogs/CreateTaskDialog';
import { CreateTaskButton } from '@/src/tasks-board/buttons/CreateTaskButton';

function getInitialData(): TBoard {
  // Doing this so we get consistent ids on server and client
  const getCards = (() => {
    let count: number = 0;

    return function getCards({ amount }: { amount: number }): TCard[] {
      return Array.from({ length: amount }, (): TCard => {
        const id = count++;
        return {
          id: `card:${id}`,
          description: `Card ${id}`,
        };
      });
    };
  })();

  const columns: TColumn[] = [
    { id: 'toDo', title: 'To Do', cards: getCards({ amount: 6 }) },
    { id: 'inProgress', title: 'In Progress', cards: getCards({ amount: 4 }) },
    { id: 'done', title: 'Done', cards: getCards({ amount: 3 }) },
  ];

  return {
    columns,
  };
}

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
          <TasksBoard initial={{ columns }} />
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
