'use client';

import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import NoteDetails from '../../app/notes/[id]/NoteDetails.client'; 
export default function NotePreview({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); 
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={handleClose}>
          ×
        </button>
        <NoteDetails id={params.id} />
      </div>
    </div>
  );
}