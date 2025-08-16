'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const bubbles = [
    { text: '前端開發', link: '#' },
    { text: '後端技術', link: '#' },
    { text: 'UI/UX 設計', link: '#' },
    { text: '數據分析', link: '#' },
    { text: '人工智慧', link: '#' },
    { text: '專案管理', link: '#' },
    { text: '個人作品', link: '#' },
    { text: '學習心得', link: '#' }
];

export default function Home() {
    useEffect(() => {
        const menuButton = document.getElementById('menu-button');
        const sideMenu = document.getElementById('side-menu');
        const closeButton = document.getElementById('close-button');

        const toggleMenu = () => {
            sideMenu.classList.toggle('sidebar-open');
        };

        if (menuButton && sideMenu && closeButton) {
            menuButton.addEventListener('click', toggleMenu);
            closeButton.addEventListener('click', toggleMenu);
        }

        const createStar = () => {
            const star = document.createElement('div');
            star.className = 'absolute bg-white rounded-full opacity-0 star';
            star.style.width = star.style.height = `${Math.random() * 3 + 1}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(star);
        };

        for (let i = 0; i < 100; i++) {
            createStar();
        }

        return () => {
            if (menuButton && closeButton) {
                menuButton.removeEventListener('click', toggleMenu);
                closeButton.removeEventListener('click', toggleMenu);
            }
        };
    }, []);

    return (
        <main>
            <style jsx global>{`
                body {
                    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                }
                .sidebar {
                    transition: transform 0.3s ease-in-out;
                    transform: translateX(-100%);
                }
                .sidebar-open {
                    transform: translateX(0);
                }
                .star {
                    animation: twinkle 5s infinite;
                }
                @keyframes twinkle {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}</style>
            
            <button id="menu-button" className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>

            <div id="side-menu" className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-40 sidebar">
                <button id="close-button" className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <nav className="p-6 mt-16">
                    <h2 className="text-xl font-bold mb-4">選單</h2>
                    <ul>
                        <li className="mb-2"><a href="#" className="block text-lg hover:text-cyan-400 transition-colors">首頁</a></li>
                        <li className="mb-2"><a href="#" className="block text-lg hover:text-cyan-400 transition-colors">關於我</a></li>
                        <li className="mb-2"><a href="#" className="block text-lg hover:text-cyan-400 transition-colors">聯絡方式</a></li>
                    </ul>
                </nav>
            </div>

            <section className="min-h-screen flex flex-col justify-center items-center p-8 text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 mb-6">oh-freelife</h1>
                <p className="text-xl md:text-2xl mb-12">歡迎來到我的網站！</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {bubbles.map((bubble, index) => (
                        <a key={index} href={bubble.link} className="block p-4 bg-gray-700 rounded-full text-center hover:bg-cyan-600 transition-colors">
                            {bubble.text}
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}