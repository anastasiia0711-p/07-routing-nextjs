'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Modal } from '../../../components/Modal/Modal';
import css from '../../../components/NotePreview/NotePreview.module.css';

async function fetchNoteDetails(id: string) {
  const res = await fetch(`https://notehub-public.goit.study/api/notes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteDetails(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <p>Loading note details...</p>}
        {note && (
          <>
            <div className={css.header}>
              <h2 className={css.title}>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}