import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api/api';
import NotesClient from './Notes.client';

export default async function AllNotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag="" />
    </HydrationBoundary>
  );
}
