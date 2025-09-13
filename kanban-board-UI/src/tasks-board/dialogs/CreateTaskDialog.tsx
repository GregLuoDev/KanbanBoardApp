import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { TaskForm } from './TaskForm';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TaskDto } from '../../lib/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { createTask } from '@/src/lib/thunks/taskAsyncThunks';
import { useDialog } from './useDialog';
import { RHFFormProvider } from '@/src/react-hook-form/RHFFormProvider';

export function CreateTaskDialog() {
  const { open, setOpen, handleOpenDialog, handleCloseDialog } = useDialog();
  const dispatch = useAppDispatch();
  const { isCreatingTask, error } = useAppSelector((state) => state.task);
  const Schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.number().required('Status is required'),
  });

  const defaultValues: TaskDto = {
    title: '',
    description: '',
    status: 0,
  };

  const methods = useForm<TaskDto>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const {
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitted, isDirty },
  } = methods;

  const formValues = watch();

  const canCloseDialog = isSubmitted && !error && !isCreatingTask;
  const shouldShowError = isSubmitted && !isDirty && error && !isCreatingTask;
  console.log('=====isSubmitted', isSubmitted);
  console.log('=====error', error);
  console.log('=====isCreatingTask', isCreatingTask);

  useEffect(() => {
    if (canCloseDialog) {
      setOpen(false);
    }
  }, [canCloseDialog]);

  function handleCreateTask() {
    dispatch(createTask(formValues));
    reset(formValues, {
      keepValues: true, // keeps the current form values
      keepErrors: false, // clears errors
      keepDirty: false, // clears dirty state
      keepTouched: false, // clears touched state
      keepIsSubmitted: true,
      keepSubmitCount: true,
    });
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
        Create New Task
      </Button>

      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return; // ignore auto-close
          }
          handleCloseDialog();
        }}
        // onClose={handleCloseDialog}
        aria-labelledby="create-new-task"
        slotProps={{
          paper: {
            sx: {
              width: '500px', // fixed width
              maxWidth: 'none', // prevent shrinking
            },
          },
        }}
      >
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(handleCreateTask)}>
          <DialogTitle variant="h4">Create New Task</DialogTitle>
          <DialogContent>
            <TaskForm methods={methods} />
          </DialogContent>
          <DialogActions className="m-4">
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>

            <Button
              // onClick={handleCreateTask}
              type="submit"
              color="primary"
              autoFocus
              disabled={!formValues['title'] || !formValues['description'] || !isValid}
              variant="contained"
            >
              Create
            </Button>
          </DialogActions>
        </RHFFormProvider>

        {shouldShowError && (
          <Alert severity="error" className="m-6 mt-0">
            Cannot create this task. Please try again.
          </Alert>
        )}
      </Dialog>
    </>
  );
}
