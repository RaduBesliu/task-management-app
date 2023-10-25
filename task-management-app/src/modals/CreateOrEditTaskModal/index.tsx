import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Components } from './styled';
import { Task } from '../../api/task/types';
import { useFormik } from 'formik';
import { generateRandomFirebaseId } from '../../utils';
import { AuthContext } from '../../providers/AuthProvider/context';
import { Dialog, TextField } from '@mui/material';
import IconWrapper from '../../components/IconWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ChromePicker, ColorResult } from 'react-color';
import { Button } from 'react-bootstrap';
import { List } from '../../api/list/types';
import { updateList } from '../../api/list';
import { createTask, updateTask } from '../../api/task';

const CreateOrEditTaskModal = ({
  isOpen,
  onClose,
  list,
  setLists,
  modalState,
}: {
  isOpen: boolean;
  onClose: () => void;
  list: List;
  setLists: Dispatch<SetStateAction<List[]>>;
  modalState?: Task;
}) => {
  const { user } = useContext(AuthContext);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.title) {
      errors.title = 'The title is required';
    } else if (values.title.length > 40) {
      errors.title = 'The title must be 40 characters or less';
    }

    if (values.description && values.description.length > 200) {
      errors.description = 'The description must be 200 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    validate,
    enableReinitialize: true,
    initialValues: {
      title: modalState?.title || '',
      description: modalState?.description || '',
      color: modalState?.color || '#fff',
      textColor: modalState?.textColor || '#000',
    },
    onSubmit: async (values) => {
      const _task = {
        ...values,
        id: modalState?.id || generateRandomFirebaseId(),
        userId: user?.uid,
        isCompleted: modalState?.isCompleted || false,
      } as Task;

      if (modalState) {
        setLists((prev) => {
          const _prev = [...prev];
          const listToUpdate = _prev.find((_list) => _list.id === list.id);
          if (listToUpdate) {
            listToUpdate.tasks = listToUpdate.tasks.map((__task) => (__task.id === modalState?.id ? _task : __task));
          }

          return _prev;
        });

        const _firebaseList = {
          ...list,
          tasks: list.tasks.map((task) => task.id),
        };

        await updateList(list.id, _firebaseList);
        await updateTask(_task.id, _task);
      } else {
        setLists((prev) => {
          const _prev = [...prev];
          const listToUpdate = _prev.find((_list) => _list.id === list.id);
          if (listToUpdate) {
            listToUpdate.tasks = [...listToUpdate.tasks, _task];
          }

          return _prev;
        });

        const _firebaseList = {
          ...list,
          tasks: list.tasks.map((task) => task.id),
        };

        await updateList(list.id, _firebaseList);
        await createTask(_task);
      }

      onClose();
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Components.Container>
        <IconWrapper onClick={onClose} top={8} left={8}>
          <FontAwesomeIcon icon={faX} />
        </IconWrapper>
        <TextField
          label={'Title'}
          value={formik.values.title}
          onChange={formik.handleChange('title')}
          style={{ width: '100%' }}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label={'Description'}
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          style={{ width: '100%', marginTop: 32 }}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Components.ColorPickersContainer>
          <Components.ColorPickerContainer>
            <Components.ColorPickerName>Color</Components.ColorPickerName>
            <ChromePicker
              color={formik.values.color}
              onChange={(color: ColorResult) => formik.setFieldValue('color', color.hex)}
            />
          </Components.ColorPickerContainer>
          <Components.ColorPickerContainer>
            <Components.ColorPickerName>Text color</Components.ColorPickerName>
            <ChromePicker
              color={formik.values.textColor}
              onChange={(color: ColorResult) => formik.setFieldValue('textColor', color.hex)}
            />
          </Components.ColorPickerContainer>
        </Components.ColorPickersContainer>
        <Button variant='primary' onClick={() => formik.handleSubmit()} style={{ width: '100%', height: '48px' }}>
          {modalState ? 'Edit task' : 'Create task'}
        </Button>
      </Components.Container>
    </Dialog>
  );
};

export default CreateOrEditTaskModal;
