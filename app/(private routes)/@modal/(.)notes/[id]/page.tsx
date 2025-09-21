import { fetchNoteById } from '../../../../../lib/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import NotePreview from './NotePreview.client';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

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
