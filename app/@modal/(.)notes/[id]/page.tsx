import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';

async function fetchNoteDetails(id: string) {
  const res = await fetch(`https://notehub-public.goit.study/api/notes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

interface ModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: ModalPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteDetails(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}