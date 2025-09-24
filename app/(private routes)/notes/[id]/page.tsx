import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/serverApi'; 
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';
import type { Note } from '../../../../types/note';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);
  const note = queryClient.getQueryData<Note>(['note', id]);

  if (!note) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
}
