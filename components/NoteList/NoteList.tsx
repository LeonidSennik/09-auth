'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'], exact: false });
    },
    onError: (error) => {
      console.error('Failed to delete note:', error);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      mutation.mutate(id);
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/notes/${id}`);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.actions}>
              <button
                className={css.link}
                onClick={() => handleViewDetails(note.id)}
                aria-label={`View details for ${note.title}`}
              >
                View details
              </button>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                disabled={mutation.isPending}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
