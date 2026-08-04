import type { Metadata } from 'next';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your personal notes efficiently',
};

export default function RootLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode; // <-- Додано знак питання
  modal?: React.ReactNode;   // <-- Додано знак питання
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <div style={{ display: 'flex', minHeight: '80vh' }}>
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