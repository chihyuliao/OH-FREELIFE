import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-light text-center mb-4">歡迎來到我的網站</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400">這裡可以放置你的最新動態或個人介紹。</p>
    </div>
  );
}