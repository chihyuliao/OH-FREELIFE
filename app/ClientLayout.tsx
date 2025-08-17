"use client";

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

// 定義側拉式選單的項目
const menuItems = [
  { name: '首頁', href: '/' },
  { name: '學習', href: '/learning' },
  { name: '音樂', href: '/music' },
  { name: '私人日記', href: '/private-journal' },
  { name: '收藏', href: '/collection' },
  { name: '繪畫', href: '/drawing' },
  { name: '打卡記錄', href: '/check-in' },
  { name: '電影娛樂評價', href: '/movie-review' },
  { name: '記錄', href: '/records' },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative min-h-screen flex flex-col">

        {/* 頂部導航列和標題 */}
        <header className="p-4 flex flex-col items-start z-10">
            {/* 這裡我們將標題獨立出來 */}
            <div className="text-5xl font-bold">OH-FREELIFE</div>
            {/* 選單按鈕 */}
            <button
                onClick={toggleMenu}
                className="mt-2 lg:hidden p-2 focus:outline-none rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="開啟側邊欄"
            >
                <div className="space-y-1.5 w-8 h-8">
                  <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg transition-transform duration-300 ease-in-out"></div>
                  <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg transition-transform duration-300 ease-in-out"></div>
                  <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg transition-transform duration-300 ease-in-out"></div>
                </div>
            </button>
        </header>

        {/* 側拉選單 */}
        <aside
            className={`
                fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl z-20 transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">選單</h2>
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>

        {/* 主要內容區域 */}
        <main className="flex-grow">
            {children}
        </main>
    </div>
  );
}