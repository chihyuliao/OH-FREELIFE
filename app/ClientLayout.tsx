"use client";


import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

// 定義側拉式選單的項目，可以根據需要修改。
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
  // 使用 useState 來控制側拉式選單的開關
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切換選單狀態的函式
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* 網站標題和選單按鈕的頂部區域 */}
      <header className="flex flex-col items-start p-4">
        {/* 網站標題 */}
        <div className="text-2xl font-bold">OH-FREELIFE</div>
        {/* 側拉選單的按鈕（三條槓） */}
        <button
          onClick={toggleMenu}
          className="mt-2 focus:outline-none"
          aria-label="開啟側邊欄"
        >
          <div className="space-y-1.5 w-6 h-6">
            <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg transition-transform duration-300 ease-in-out"></div>
            <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg transition-transform duration-300 ease-in-out"></div>
            <div className="bg-gray-900 dark:bg-gray-100 w-full h-0.5 rounded-lg transition-transform duration-300 ease-in-out"></div>
          </div>
        </button>
        {/* 側拉式選單區塊，根據 isMenuOpen 的狀態顯示或隱藏 */}
        {isMenuOpen && (
          <aside className="mt-2 w-48 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg py-2 transition-transform duration-300 ease-in-out">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </header>

      {/* 頁面主要內容區域 */}
      <main className="p-4">
        {children}
      </main>
    </>
  );
}
