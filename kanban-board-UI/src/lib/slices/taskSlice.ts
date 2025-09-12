/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "../types";
import { fetchTaskById, fetchTasks } from "../thunks/taskAsyncThunks";

type TaskState = {
  tasks: TaskItem[];
  isLoadingTasks: boolean;
  fetchingTasksError: string;

  currentTask: TaskItem | null;
  isLoadingTask: boolean;
  fetchingTaskError: string;
};

const initialState: TaskState = {
  tasks: [],
  isLoadingTasks: false,
  fetchingTasksError: "",

  currentTask: null,
  isLoadingTask: false,
  fetchingTaskError: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoadingTasks = true;
        state.fetchingTasksError = "";
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoadingTasks = false;
        state.tasks = action.payload;
        state.fetchingTasksError = "";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoadingTasks = false;
        state.fetchingTasksError = action.payload as string;
        state.tasks = [];
      })

      .addCase(fetchTaskById.pending, (state) => {
        state.isLoadingTask = true;
        state.fetchingTaskError = "";
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.fetchingTaskError = action.payload as string;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = taskSlice.actions;

export default taskSlice.reducer;
