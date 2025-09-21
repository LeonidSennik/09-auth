import { api } from './api';
import type { User } from '../../types/user';
import { AxiosError } from 'axios';

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


export const getSession = async (): Promise<User | null> => {
  try {
    const res = await api.get<User>('/auth/session');
    return res.data || null;
  } catch {
    return null;
  }
};
