/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

type Props = { row: any };

export function TaskForm({ row }: Props) {
  const originalData = row.original;
  const [title, setTitle] = useState(originalData.title);
  const [description, setDescription] = useState(originalData.description);
  const [status, setStatus] = useState(originalData.status);

  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="flex flex-col mt-4 gap-4">
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            row._valuesCache["title"] = e.target.value;
          }}
        />

        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            row._valuesCache["description"] = e.target.value;
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            id="status"
            value={status}
            label="Status"
            onChange={(e) => {
              setStatus(e.target.value);
              row._valuesCache["status"] = e.target.value;
            }}
          >
            <MenuItem value={0}>To Do</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Done</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
