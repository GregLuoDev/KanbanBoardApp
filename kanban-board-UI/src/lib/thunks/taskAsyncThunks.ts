/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("api/tasks", async () => {
  try {
    const response = await fetch(`https://localhost:7086/api/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // return rejectWithValue(JSON.stringify(error));
  }
});

export const fetchTaskById = createAsyncThunk(
  "api/tasks/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/tasks/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch task");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  }
);
