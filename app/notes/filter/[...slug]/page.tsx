import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api/api';
import NotesClient from '../Notes.client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const tag = params.slug?.[0] ?? 'Усі';

  return {
    title: `Нотатки з тегом "${tag}" — NoteHub`,
    description: `Переглядайте нотатки, відфільтровані за тегом "${tag}" у застосунку NoteHub.`,
    openGraph: {
      title: `Нотатки з тегом "${tag}" — NoteHub`,
      description: `Фільтровані нотатки за тегом "${tag}" у NoteHub.`,
      url: `https://notehub.goit.global/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}
export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0] ?? ''; 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag],
    queryFn: () => fetchNotes(1, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
