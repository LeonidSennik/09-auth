import axios from 'axios';
import type { Note, NoteTag } from '../../types/note';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  page: number,
  tag?: string,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search?.trim()) params.search = search;
  if (tag && tag.trim() !== '' && tag !== 'All') params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
