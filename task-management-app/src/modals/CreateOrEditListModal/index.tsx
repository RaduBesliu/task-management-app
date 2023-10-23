import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Components } from './styled';
import { Dialog, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { ChromePicker, ColorResult } from 'react-color';
import { Button } from 'react-bootstrap';
import { List } from '../../api/list/types';
import { generateRandomFirebaseId } from '../../utils';
import { AuthContext } from '../../providers/AuthProvider/context';
import { createList, updateList } from '../../api/list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import IconWrapper from '../../components/IconWrapper';

const CreateOrEditListModal = ({
  isOpen,
  onClose,
  setLists,
  modalState,
}: {
  isOpen: boolean;
  onClose: () => void;
  setLists: Dispatch<SetStateAction<List[]>>;
  modalState?: List;
}) => {
  const { user } = useContext(AuthContext);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.title) {
      errors.title = 'The title is required';
    } else if (values.title.length > 40) {
      errors.title = 'The title must be 40 characters or less';
    }

    if (values.taskLimit && values.taskLimit < 0) {
      errors.taskLimit = 'The task limit must be greater than 0';
    }

    return errors;
  };

  const formik = useFormik({
    validate,
    enableReinitialize: true,
    initialValues: {
      title: modalState?.title || '',
      color: modalState?.color || '#fff',
      textColor: modalState?.textColor || '#000',
      taskLimit: modalState?.taskLimit || 0,
    },
    onSubmit: async (values) => {
      const _list = {
        ...values,
        tasks: modalState?.tasks || [],
        taskLimit: values.taskLimit ? values.taskLimit : 0,
        id: modalState?.id || generateRandomFirebaseId(),
        userId: user?.uid,
      } as List;

      if (modalState) {
        setLists((prevLists) => prevLists.map((list) => (list.id === _list.id ? _list : list)));
        await updateList(modalState.id, _list);
      } else {
        setLists((prevLists) => [...prevLists, _list]);
        await createList(_list);
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
          label={'Task limit'}
          value={formik.values.taskLimit}
          onChange={formik.handleChange('taskLimit')}
          style={{ width: '100%', marginTop: 32 }}
          type={'number'}
          error={formik.touched.taskLimit && Boolean(formik.errors.taskLimit)}
          helperText={formik.touched.taskLimit && formik.errors.taskLimit}
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
          {modalState ? 'Edit list' : 'Create list'}
        </Button>
      </Components.Container>
    </Dialog>
  );
};

export default CreateOrEditListModal;
