/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function TopToolbarCustomActions({ table }: any) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        table.setCreatingRow(true); //simplest way to open the create row modal with no default values
        //or you can pass in a row object to set default values with the `createRow` helper function
        // table.setCreatingRow(
        //   createRow(table, {
        //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
        //   }),
        // );
      }}
    >
      Create New User
    </Button>
  );
}
