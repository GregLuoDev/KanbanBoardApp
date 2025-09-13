/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../types';
import {
  createTask,
  deleteTask,
  fetchTaskById,
  fetchTasks,
  updateTask,
} from '../thunks/taskAsyncThunks';

type TaskState = {
  tasks: Task[];
  isLoadingTasks: boolean;
  fetchingTasksError: string;

  currentTask: Task | null;
  isLoadingTask: boolean;
  isCreatingTask: boolean;
  isUpdatingTask: boolean;
  isDeletingTask: boolean;
  error: string;
};

const initialState: TaskState = {
  tasks: [],
  isLoadingTasks: true,
  fetchingTasksError: '',

  currentTask: null,
  isLoadingTask: false,
  isCreatingTask: false,
  isUpdatingTask: false,
  isDeletingTask: false,
  error: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoadingTasks = true;
        state.fetchingTasksError = '';
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoadingTasks = false;
        state.tasks = action.payload;
        state.fetchingTasksError = '';
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoadingTasks = false;
        state.fetchingTasksError = action.payload as string;
        state.tasks = [];
      })

      .addCase(fetchTaskById.pending, (state) => {
        state.isLoadingTask = true;
        state.error = '';
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload as string;
      })

      .addCase(createTask.pending, (state) => {
        state.isCreatingTask = true;
        state.error = '';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isCreatingTask = false;
        state.error = '';
        console.log('==========action.payload of createTask', action.payload);
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isCreatingTask = false;
        state.error = action.payload as string;
      })

      .addCase(updateTask.pending, (state) => {
        state.isUpdatingTask = true;
        state.error = '';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isUpdatingTask = false;
        state.error = '';
        console.log('==========action.payload of updateTask', action.payload);

        state.tasks = state.tasks.map((t) => {
          const newTask = action.payload;
          if (t.id === newTask.id) {
            return { ...t, ...newTask };
          }
          return t;
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isUpdatingTask = false;
        state.error = action.payload as string;
      })

      .addCase(deleteTask.pending, (state) => {
        state.isDeletingTask = true;
        state.error = '';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isDeletingTask = false;
        state.error = '';
        console.log('==========action.payload of deleteTask', action.payload);
        state.tasks = state.tasks.filter((t) => {
          const id = action.payload;
          return t.id !== id;
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isDeletingTask = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
