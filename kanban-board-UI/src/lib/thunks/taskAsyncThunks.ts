/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskDto } from "../types";
import axios from "axios";

const baseUrl = "https://localhost:7086";
export const fetchTasks = createAsyncThunk("tasks", async () => {
  try {
    const response = await fetch(`${baseUrl}/api/tasks`);
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
  "taskById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/tasks/${id}`);
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

export const createTask = createAsyncThunk<Task, TaskDto>(
  "createTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<Task>(`${baseUrl}/api/tasks`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateTask = createAsyncThunk<TaskDto, TaskDto>(
  "updateTask",
  async (data, { rejectWithValue }) => {
    try {
      await axios.put<Task>(`${baseUrl}/api/tasks/${data.id}`, data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  "deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete<Task>(`${baseUrl}/api/tasks/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
