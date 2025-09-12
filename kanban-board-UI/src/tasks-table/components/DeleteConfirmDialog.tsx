import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { deleteTask } from "../../lib/thunks/taskAsyncThunks";
import { useAppDispatch } from "../../lib/store";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  taskId: string;
};

export default function DeleteConfirmDialog({ open, setOpen, taskId }: Props) {
  const dispatch = useAppDispatch();

  function handleClose() {
    setOpen(false);
  }

  function handleDeleteTask() {
    dispatch(deleteTask(taskId));
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Please confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-4 mb-4">
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={handleDeleteTask}
            autoFocus
            variant="outlined"
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
