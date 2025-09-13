import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { TaskForm } from './TaskForm';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TaskDto } from '../../lib/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { createTask } from '@/src/lib/thunks/taskAsyncThunks';
import { useDialog } from './useDialog';
import { RHFFormProvider } from '@/src/react-hook-form/RHFFormProvider';

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
};
export function CreateTaskDialog({ open, handleCloseDialog }: Props) {
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

  useEffect(() => {
    if (canCloseDialog) {
      handleCloseDialog();
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
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return; // ignore auto-close
          }
          handleCloseDialog();
        }}
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
            <TaskForm />
          </DialogContent>
          <DialogActions className="m-4">
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>

            <div>
              {isCreatingTask && !error ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  autoFocus
                  disabled={!formValues['title'] || !formValues['description'] || !isValid}
                  variant="contained"
                >
                  Create
                </Button>
              )}
            </div>
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
