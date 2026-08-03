'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createNote } from '../../../lib/api';
import type { CreateNotePayload } from '../../../lib/api';
import type { NoteTag } from '../../../types/note';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose?: () => void; // Робимо пропс необов'язковим
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Maximum 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as NoteTag[])
    .required('Tag is required'),
});

export const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newNote: CreateNotePayload) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
      onClose?.(); // Використовуємо безпечний виклик з бульбашкою (опціональний ланцюжок)
    },
    onError: () => {
      toast.error('Failed to create note.');
    },
  });

  const formik = useFormik<CreateNotePayload>({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo',
    },
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate(values);
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={css.input}
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && <ErrorMessage message={formik.errors.title} />}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          className={css.textarea}
          {...formik.getFieldProps('content')}
        />
        {formik.touched.content && <ErrorMessage message={formik.errors.content} />}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          {...formik.getFieldProps('tag')}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.touched.tag && <ErrorMessage message={formik.errors.tag} />}
      </div>

      <div className={css.actions}>
        {onClose && (
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};