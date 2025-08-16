'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Language {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export default function LearningPage() {
  const [showBubbles, setShowBubbles] = useState(false)
  const [activeBubble, setActiveBubble] = useState<string | null>(null)

  const languages: Language[] = [
    {
      id: 'english',
      name: '英文',
      icon: '🇺🇸',
      color: 'from-blue-400 to-blue-600',
      description: '英語學習與翻譯'
    },
    {
      id: 'chinese',
      name: '中文',
      icon: '🇨🇳',
      color: 'from-red-400 to-red-600',
      description: '中文學習與寫作'
    },
    {
      id: 'japanese',
      name: '日文',
      icon: '🇯🇵',
      color: 'from-pink-400 to-pink-600',
      description: '日語學習與翻譯'
    },
    {
      id: 'vietnamese',
      name: '越南語',
      icon: '🇻🇳',
      color: 'from-green-400 to-green-600',
      description: '越南語學習與翻譯'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubbles(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleLanguageClick = (languageId: string) => {
    setActiveBubble(languageId)
    // 所有語言都導航到統一的翻譯頁面
    window.location.href = `/learning/translate?lang=${languageId}`
    console.log(`Navigating to language: ${languageId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 導航欄 */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              OH FREELIFE
            </Link>
            <div className="text-gray-600">
              <span className="font-semibold">學習中心</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 學習中心</h1>
          <p className="text-xl text-gray-600">選擇你想要學習的語言，開始你的學習之旅</p>
        </div>

        {/* 語言泡泡區域 */}
        <div className="relative h-96 flex items-center justify-center mb-16">
          {/* 中心裝飾 */}
          <div className="absolute text-6xl animate-pulse">
            🎓
          </div>

                   {/* 語言泡泡 */}
         {showBubbles && (
           <div className="absolute inset-0">
             {languages.map((language, index) => {
               const angle = (index * 90) * (Math.PI / 180) // 90度間隔，四個語言
               const radius = 150
               const x = Math.cos(angle) * radius
               const y = Math.sin(angle) * radius
                
                return (
                  <div
                    key={language.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-1000 ease-out hover:scale-110 ${
                      activeBubble === language.id ? 'scale-125' : ''
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animationDelay: `${index * 0.3}s`
                    }}
                    onClick={() => handleLanguageClick(language.id)}
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${language.color} flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse`}>
                      {language.icon}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white px-4 py-2 rounded-lg shadow-md text-center">
                      <div className="text-sm font-semibold text-gray-800">{language.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{language.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

                 {/* 語言卡片網格 */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {languages.map((language) => (
            <div
              key={language.id}
              className={`bg-gradient-to-br ${language.color} rounded-lg p-8 text-center text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              onClick={() => handleLanguageClick(language.id)}
            >
              <div className="text-5xl mb-4">{language.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{language.name}</h3>
              <p className="text-sm opacity-90 mb-4">{language.description}</p>
              <div className="text-xs opacity-80">
                點擊開始學習
              </div>
            </div>
          ))}
        </div>

        {/* 學習特色 */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              為什麼選擇我們的學習平台？
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">精準翻譯</h4>
                <p className="text-gray-600 text-sm">使用專業翻譯引擎，提供準確的語言轉換</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold text-gray-900 mb-2">快速學習</h4>
                <p className="text-gray-600 text-sm">簡潔的界面設計，讓學習更加高效</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <h4 className="font-semibold text-gray-900 mb-2">智能推薦</h4>
                <p className="text-gray-600 text-sm">根據學習進度推薦適合的內容</p>
              </div>
            </div>
          </div>
        </div>

        {/* 返回首頁按鈕 */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
