import NotesClient from '../../../@modal/notes/Notes.client'; 


interface FilterPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilterNotesPage({ params }: FilterPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const tag = slug[0] || 'all';

  return (
    <main>
      <NotesClient tag={tag} />{}
    </main>
  );
}