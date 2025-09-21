
import { Geist, Geist_Mono } from 'next/font/google';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'NoteHub — Зручний менеджер нотаток',
  description: 'NoteHub — це сучасний застосунок для створення, фільтрації та перегляду нотаток з підтримкою тегів і модального перегляду.',
  openGraph: {
    title: 'NoteHub — Зручний менеджер нотаток',
    description: 'Створюйте, фільтруйте та переглядайте нотатки з тегами у NoteHub.',
    url: 'https://notehub.goit.global',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function RootLayout({
  children,
  modal,
  sidebar,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TanStackProvider>
          <Header />
          <div style={{ display: 'flex' }}>
            {sidebar && <aside>{sidebar}</aside>}
            <main style={{ flex: 1 }}>{children}</main>
          </div>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
