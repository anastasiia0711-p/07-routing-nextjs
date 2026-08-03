'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNotes } from '../../../../lib/api'; // скоригуйте шлях за потреби (кількість крапок залежить від глибини папки)
import { NotePreview } from '../../../components/NotePreview/NotePreview';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

export default function NotesPage() {
  const params = useParams();
  
  // Оскільки це catch-all маршрут [...slug], params.slug — це масив (наприклад, ['Work'] або ['all'])
  const slug = params.slug;
  const tagParam = Array.isArray(slug) && slug.length > 0 ? slug[slug.length - 1] : 'all';
  const apiTag = tagParam.toLowerCase() === 'all' ? undefined : tagParam;

  const [searchQuery, setSearchQuery] = useState('');

  // Запит передає поточний тег і пошуковий рядок
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', tagParam, searchQuery],
    queryFn: () => fetchNotes({ tag: apiTag, search: searchQuery }),
  });

  const notesList: Note[] = Array.isArray(data) 
    ? data 
    : (data as { notes?: Note[]; data?: Note[] })?.notes 
    || (data as { notes?: Note[]; data?: Note[] })?.data 
    || [];

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '15px' }}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
          }}
        />
        <Link
          href="/notes/create"
          style={{
            background: '#0366d6',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          + Create Note
        </Link>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {error instanceof Error && <p style={{ color: 'red' }}>Помилка: {error.message}</p>}

      {!isLoading && !error && (
        <NotePreview notes={notesList} />
      )}
    </div>
  );
}