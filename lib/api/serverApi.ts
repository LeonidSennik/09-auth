import { cookies } from 'next/headers';
import { api } from './api';
import type { AxiosResponse, AxiosError } from 'axios';
import type { User } from '../../types/user';
import type { Note } from '../../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return null;

  try {
    const res = await api.get<User>('/auth/session', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch {
    return null;
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
    const res = await api.get<{ email: string }>('/api/auth/session', {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
      withCredentials: true,
    });

    return res; 
  } catch (error) {
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


export async function refreshSession(refreshToken: string): Promise<{ user: User; accessToken?: string } | null> {
  if (!refreshToken) return null;

  try {
    const res = await api.post<{ user: User; accessToken: string }>('/auth/refresh', null, {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      withCredentials: true,
    });

    const tokens = extractTokensFromHeaders(res.headers);
    return { user: res.data.user, ...tokens };
  } catch {
    return null;
  }
}


function extractTokensFromHeaders(headers: AxiosResponse['headers']) {
  const accessToken = headers['x-access-token'];
  const refreshToken = headers['x-refresh-token'];

  return {
    accessToken,
    refreshToken,
  };
}
