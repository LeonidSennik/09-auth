'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../../lib/api';
import Modal from '../../../../components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <div className={css.loading}>Завантаження...</div>}
      {error && <div className={css.error}>Помилка завантаження нотатки</div>}
      {data && (
        <div className={css.content}>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <span className={css.tag}>Тег: {data.tag}</span>
          <span className={css.date}>
            Створено: {new Date(data.createdAt).toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      )}
    </Modal>
  );
}
