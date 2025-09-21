import { jwtVerify } from 'jose';

export async function getSession(token: string | undefined) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return { email: payload.email }; 
  } catch {
    return null;
  }
}