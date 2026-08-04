import NoteDetails from '@/components/NoteDetails/NoteDetails'; // або шлях до вашого компонента деталей

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Деталі нотатки</h1>
      {/* Рендеримо компонент, який показує інформацію про нотатку за її id */}
      <NoteDetails id={id} />
    </main>
  );
}