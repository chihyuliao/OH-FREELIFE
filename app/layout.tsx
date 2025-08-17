import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';

// 定義網站的元數據
// ⚠️ 注意：metadata 必須在一個沒有 'use client' 的檔案中定義
export const metadata = {
  title: 'OH-FREELIFE',
  description: '我的個人網站',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        {/* 使用客戶端元件來包裹主體內容，以處理互動功能 */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
