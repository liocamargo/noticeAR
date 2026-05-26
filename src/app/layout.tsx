import type { Metadata } from 'next';
import { ReactQueryProvider } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoticeAR - Tinder de Noticias',
  description: 'Lee noticias a tu ritmo, swipeando como en Tinder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
