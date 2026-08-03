'use client';

import { useRouter } from 'next/navigation';
import { NoteForm } from '../../components/NoteForm/NoteForm'; 

export default function CreateNoteModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back(); 
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}>
        <h2 style={{ marginBottom: '16px', marginTop: 0 }}>Create New Note</h2>
        {}
        <NoteForm onClose={handleClose} />
      </div>
    </div>
  );
}