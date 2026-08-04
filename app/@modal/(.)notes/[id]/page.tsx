import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import ModalClient from './Modal.client'; // Клієнтський компонент модального вікна

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Виконуємо prefetch нотатки за її ID
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalClient noteId={id} />
    </HydrationBoundary>
  );
}


