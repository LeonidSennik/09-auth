import { fetchNoteById } from '../../../../lib/api/serverApi';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const queryClient = new QueryClient();

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
