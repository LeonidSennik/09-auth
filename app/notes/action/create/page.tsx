import NoteForm from '../../../../components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Створити нотатку — NoteHub',
  description: 'Сторінка для створення нової нотатки у застосунку NoteHub.',
  openGraph: {
    title: 'Створити нотатку — NoteHub',
    description: 'Створіть нову нотатку з тегом, заголовком і контентом.',
    url: 'https://notehub.goit.global/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
