'use client';

import { TasksTable } from '@/src/tasks-table/TasksTable';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/lib/store';
import { fetchTasks } from '@/src/lib/thunks/taskAsyncThunks';
import { Typography } from '@mui/material';
import { TBoard, TCard, TColumn } from '@/src/tasks-board/shared/data';
import { TasksBoard } from '@/src/tasks-board/TasksBoard';
import { CreateTaskDialog } from '@/src/tasks-board/dialogs/CreateTaskDialog';

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
    { id: 'column:a', title: 'Column A', cards: getCards({ amount: 6 }) },
    { id: 'column:b', title: 'Column B', cards: getCards({ amount: 4 }) },
    { id: 'column:c', title: 'Column C', cards: getCards({ amount: 3 }) },
  ];

  return {
    columns,
  };
}

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
      <CreateTaskDialog />
      <TasksBoard initial={getInitialData()} />;
      <TasksTable />
    </div>
  );
}
