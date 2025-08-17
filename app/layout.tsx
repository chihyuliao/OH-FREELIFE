'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OH-FREELIFE',
  description: '我的個人網站',
};

const menuItems = [
  '首頁',
  '學習',
  '音樂',
  '私人日記',
  '收藏',
  '繪畫',
  '打卡記錄',
  '電影娛樂評價',
  '記錄',
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex flex-col items-start p-4">
          <div className="text-xl font-bold">OH-FREELIFE</div>
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="開啟側邊欄"
          >
            <div className="space-y-1.5 w-6 h-6">
              <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg"></div>
              <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg"></div>
              <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg"></div>
            </div>
          </button>
          {isMenuOpen && (
            <aside className="mt-2 w-48 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md py-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </header>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}