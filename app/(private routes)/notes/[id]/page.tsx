import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/api';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';
import type { Note } from '../../../../types/note';
import type { Metadata } from 'next';
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: `${note.title} — NoteHub`,
    description: `Нотатка з тегом "${note.tag}". Перегляньте її в застосунку NoteHub.`,
    openGraph: {
      title: `${note.title} — NoteHub`,
      description: `Нотатка з тегом "${note.tag}" у NoteHub.`,
      url: `https://notehub.goit.global/notes/${note.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}
export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  const dehydratedState = dehydrate(queryClient);
  const note = queryClient.getQueryData<Note>(['note', params.id]);

  if (!note) {
    notFound(); 
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
}
