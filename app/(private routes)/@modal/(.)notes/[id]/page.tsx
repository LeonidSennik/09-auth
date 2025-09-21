import { fetchNoteById } from '../../../../../lib/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import NotePreview from './NotePreview.client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
