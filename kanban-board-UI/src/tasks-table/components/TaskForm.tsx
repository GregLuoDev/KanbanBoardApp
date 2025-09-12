import { MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Task, TaskDto } from '../../lib/types';
import { MRT_Row } from 'material-react-table';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFSelect } from '../../react-hook-form/RHFSelect';
import { RHFTextField } from '../../react-hook-form/RHFTextField';
import { RHFFormProvider } from '../../react-hook-form/RHFFormProvider';

type Props = { row: MRT_Row<Task> };

export function TaskForm({ row }: Props) {
  const originalData = row.original;

  const Schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.number().required('Status is required'),
  });

  const defaultValues: TaskDto = {
    title: originalData.title,
    description: originalData.description,
    status: +originalData.status,
  };

  const methods = useForm<TaskDto>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const { watch } = methods;

  const formValues = watch();

  useEffect(() => {
    row._valuesCache['title'] = formValues.title;
    row._valuesCache['description'] = formValues.description;
    row._valuesCache['status'] = formValues.status;
  }, [formValues]);

  return (
    <div className="mt-2">
      <RHFFormProvider methods={methods}>
        <RHFTextField name="title" label="Title" />

        <div className="my-6">
          <RHFTextField name="description" label="Description" />
        </div>

        <RHFSelect name="status" label="Status">
          <MenuItem value={0}>To Do</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Done</MenuItem>
        </RHFSelect>
      </RHFFormProvider>
    </div>
  );
}
