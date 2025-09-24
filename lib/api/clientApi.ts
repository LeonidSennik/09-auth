import { api } from './api';
import type { User } from '../../types/user';
import type { Note, NotePayload } from '../../types/note';
import { AxiosError } from 'axios';
import type { FetchNotesResponse } from './serverApi';

export const checkSession = async (): Promise<{ email: string } | null> => {
  try {
    const res = await api.get<{ email: string }>('/auth/session');
    return res.data || null;
  } catch {
    return null;
  }
};


export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const res = await api.post<User>('/auth/register', { email, password });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const res = await api.post<User>('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};


export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Logout failed');
  }
};


export const getSession = async (): Promise<{ email: string } | null> => {
  try {
    const res = await api.get<{ email: string }>('/auth/session');
    return res.data || null;
  } catch {
    return null;
  }
};


export const getCurrentUser = async (): Promise<User> => {
  try {
    const res = await api.get<User>('/users/me');
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to fetch user');
  }
};


export const updateUserProfile = async (payload: Partial<User>): Promise<User> => {
  try {
    const res = await api.patch<User>('/users/me', payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to update profile');
  }
};


export const fetchNotes = async (
  page: number,
  tag?: string,
  search?: string
): Promise<FetchNotesResponse> => {
  try {
    const res = await api.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        perPage: 12,
        ...(tag && tag !== 'All' ? { tag } : {}),
        ...(search?.trim() ? { search } : {}),
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to fetch notes');
  }
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to fetch note');
  }
};


export const createNote = async (payload: NotePayload): Promise<Note> => {
  try {
    const res = await api.post<Note>('/notes', payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to create note');
  }
};


export const deleteNote = async (id: string): Promise<void> => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to delete note');
  }
};
