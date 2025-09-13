import { MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Task, TaskDto } from '../../lib/types';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFSelect } from '@/src/react-hook-form/RHFSelect';
import { RHFTextField } from '@/src/react-hook-form/RHFTextField';
import { RHFFormProvider } from '@/src/react-hook-form/RHFFormProvider';

type Props = { methods: UseFormReturn<TaskDto, any, TaskDto> };

export function TaskForm({ methods }: Props) {
  return (
    <div className="mt-2">
      <RHFTextField name="title" label="Title" />

      <div className="my-6">
        <RHFTextField name="description" label="Description" multiline minRows={3} />
      </div>

      <RHFSelect name="status" label="Status">
        <MenuItem value={0}>To Do</MenuItem>
        <MenuItem value={1}>In Progress</MenuItem>
        <MenuItem value={2}>Done</MenuItem>
      </RHFSelect>
    </div>
  );
}
