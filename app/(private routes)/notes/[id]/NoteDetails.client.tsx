'use client';

import css from './NoteDetails.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/clientApi';
import type { Note } from '../../../../types/note';

type Props =
  | { id: string; note?: undefined }
  | { id?: undefined; note: Note };

export default function NoteDetailsClient({ id, note }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => (id ? fetchNoteById(id) : Promise.resolve(note)),
    enabled: !!id,
    initialData: note,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Note not found</div>;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={() => router.back()}>
          ×
        </button>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>
          Created: {new Date(data.createdAt).toLocaleDateString()}
        </p>
        <span className={css.tag}>{data.tag}</span>
      </div>
    </div>
  );
}
