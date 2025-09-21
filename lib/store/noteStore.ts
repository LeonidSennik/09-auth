import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '../../types/note';

export interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

export const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface DraftState {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
  getDraft: () => NoteDraft;
}

export const useNoteStore = create<DraftState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
      getDraft: () => get().draft,
    }),
    {
      name: 'note-draft',
    }
  )
);
