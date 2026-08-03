import { TanStackProvider } from './components/TanStackProvider/TanStackProvider';
import { Header } from './components/Header/Header';
import './globals.css';

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header /> {/* <--- Ось тут з'являться кнопки Home та Notes */}
          <main>{children}</main>
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
