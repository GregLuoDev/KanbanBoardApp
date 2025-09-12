/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@mui/material";

export function TopToolbarCustomActions({ table }: any) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        table.setCreatingRow(true);
      }}
    >
      Create New Task
    </Button>
  );
}
