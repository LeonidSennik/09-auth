import ProfilePageClient from './ProfilePageClient';

export const metadata = {
  title: 'Профіль користувача — NoteHub',
  description: 'Перегляньте свій профіль, змініть ім’я або аватар.',
  openGraph: {
    title: 'Профіль користувача — NoteHub',
    description: 'Інформація про ваш обліковий запис у NoteHub.',
    url: 'https://notehub.goit.global/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
  },
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}