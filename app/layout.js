import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OH-FREELIFE',
  description: 'Welcome to my dynamic website!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}