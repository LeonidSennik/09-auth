import type { User } from '../../types/user';
import { cookies } from 'next/headers';
import { api } from './api'; 
import type { AxiosResponse } from 'axios';
import type { Note } from '../../types/note';
import type { AxiosError } from 'axios';

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || 'Failed to fetch note');
  }
};
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
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

export async function getSession(): Promise<AxiosResponse<{ email: string }> | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) return null;

  try {
    const res = await api.get<{ email: string }>('/auth/session', {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
      withCredentials: true,
    });

    const newAccessToken = res.headers['x-access-token'];
    const newRefreshToken = res.headers['x-refresh-token'];

    if (newAccessToken) {
      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return res;
  } catch {
    return null;
  }
}

export async function checkSession(token: string): Promise<AxiosResponse<User> | null> {
  if (!token) return null;

  try {
    const res = await api.get<User>('/auth/session', {
      headers: {
        Cookie: `accessToken=${token}`,
      },
      withCredentials: true,
    });

    return res;
  } catch {
    return null;
  }
}

export async function refreshSession(refreshToken: string): Promise<AxiosResponse<{ user: User; accessToken: string }> | null> {
  if (!refreshToken) return null;

  try {
    const res = await api.post<{ user: User; accessToken: string }>('/auth/refresh', null, {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      withCredentials: true,
    });

    return res;
  } catch {
    return null;
  }
}
