'use client';

import { useRouter } from 'next/navigation';
import { NoteForm } from '../../components/NoteForm/NoteForm';

export default function CreateNotePage() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '24px' }}>
      <h1>Create New Note</h1>
      <NoteForm onClose={() => router.push('/notes/filter/all')} />
    </div>
  );
}