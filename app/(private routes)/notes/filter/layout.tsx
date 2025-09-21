import '../../../app/globals.css';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const roboto = Roboto({
  weight: ['400', '700'],           
  style: ['normal'],                
  subsets: ['latin', 'cyrillic'],   
  display: 'swap',                 
  variable: '--font-roboto',        
  adjustFontFallback: false,       
});

export const metadata: Metadata = {
  title: 'NoteHub — Менеджер нотаток',
  description: 'Створюй, фільтруй та переглядай нотатки зручним способом.',
  openGraph: {
    title: 'NoteHub — Менеджер нотаток',
    description: 'Зручний застосунок для роботи з нотатками.',
    url: 'https://notehub.goit.global',
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

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body>
        <div style={{ display: 'flex', height: '100vh' }}>
          <aside style={{ width: '300px', borderRight: '1px solid #ddd' }}>
            {sidebar}
          </aside>
          <main style={{ flex: 1, overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
