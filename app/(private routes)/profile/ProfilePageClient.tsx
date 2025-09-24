'use client';

import type { User } from '../../../types/user';
import css from './Profile.module.css';
import Image from 'next/image';

export default function ProfilePageClient({ user }: { user: User }) {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username || '—'}</p>
          <p>Email: {user.email || '—'}</p>
        </div>
      </div>
    </main>
  );
}

