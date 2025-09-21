import css from './not-found.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено — NoteHub',
  description: 'На жаль, такої сторінки не існує. Перевірте адресу або поверніться на головну.',
  openGraph: {
    title: 'Сторінку не знайдено — NoteHub',
    description: 'Ця сторінка не існує. Спробуйте іншу або поверніться на головну.',
    url: 'https://notehub.goit.global/not-found',
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

export default function NotFoundPage() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
