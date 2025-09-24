'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './EditProfile.module.css';
import { getCurrentUser, updateUserProfile } from '../../../../lib/api/clientApi';
import { useAuthStore } from '../../../../lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const user = await getCurrentUser(); 
        if (!user?.email) {
          router.push('/sign-in');
          return;
        }

        setUsername(user.username || '');
        setEmail(user.email || '');
        setAvatar(user.avatar || '/default-avatar.png');
        setLoading(false);
      } catch {
        router.push('/sign-in');
      }
    };

    hydrate();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUserProfile({ username });
      setUser(updatedUser); 
      router.push('/profile');
    } catch {
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <p className={css.loading}>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
