'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Language {
  code: string
  name: string
  flag: string
}

export default function AISpeakingPage() {
  const searchParams = useSearchParams()
  const selectedLang = searchParams.get('lang') || 'english'
  
  const [showAISpeaking, setShowAISpeaking] = useState(false)
  const [practiceTime, setPracticeTime] = useState(30)
  const [isAIPracticing, setIsAIPracticing] = useState(false)
  const [aiMessages, setAiMessages] = useState<string[]>([])
  const [userInput, setUserInput] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)

  const languages: Language[] = [
    { code: 'en', name: '英文', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'vi', name: '越南語', flag: '🇻🇳' },
    { code: 'ja', name: '日文', flag: '🇯🇵' }
  ]

  // 根據選擇的語言獲取對應的語言信息
  const getSelectedLanguage = () => {
    switch (selectedLang) {
      case 'english':
        return languages.find(l => l.code === 'en')
      case 'chinese':
        return languages.find(l => l.code === 'zh')
      case 'vietnamese':
        return languages.find(l => l.code === 'vi')
      case 'japanese':
        return languages.find(l => l.code === 'ja')
      default:
        return languages.find(l => l.code === 'en')
    }
  }

  const selectedLanguage = getSelectedLanguage()

  // AI Speaking 功能
  const startAIPractice = () => {
    setIsAIPracticing(true)
    setRemainingTime(practiceTime * 60) // 轉換為秒
    setAiMessages([`你好！我是你的${selectedLanguage?.name}AI助手。我們將進行${practiceTime}分鐘的口語練習。準備好了嗎？`])
    
    // 開始倒計時
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsAIPracticing(false)
          setAiMessages(prev => [...prev, '練習時間結束！謝謝你的參與，下次再見！'])
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseAIPractice = () => {
    setIsAIPracticing(false)
    setAiMessages(prev => [...prev, '練習已暫停。點擊繼續按鈕恢復練習。'])
  }

  const sendMessage = () => {
    if (!userInput.trim()) return
    
    setAiMessages(prev => [...prev, `你: ${userInput}`])
    
    // 模擬AI回應
    setTimeout(() => {
      const responses = [
        '很好！你的發音很準確。',
        '試著再說一次，注意語調。',
        '這個詞的發音是這樣的...',
        '你的進步很大！',
        '讓我們練習下一個句子。',
        '說得很棒！繼續保持。',
        '注意這個音節的發音...',
        '你的語調很自然！'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setAiMessages(prev => [...prev, `AI: ${randomResponse}`])
    }, 1000)
    
    setUserInput('')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* 導航欄 */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              OH FREELIFE
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/learning" className="text-gray-600 hover:text-gray-800 transition-colors">
                學習中心
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/learning/translate?lang=${selectedLang}`} className="text-gray-600 hover:text-gray-800 transition-colors">
                翻譯工具
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-semibold">
                🤖 AI SPEAKING
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 頁面標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🤖 AI SPEAKING</h1>
          <p className="text-xl text-gray-600">與AI進行智能口語練習，提升你的語言能力</p>
        </div>

        {!showAISpeaking ? (
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                與AI進行{selectedLanguage?.flag} {selectedLanguage?.name}口語練習
              </h3>
              <p className="text-gray-600 mb-6">設定練習時間，AI將陪伴你進行口語訓練</p>
              
              <div className="flex justify-center items-center space-x-4 mb-8">
                <label className="text-lg font-semibold text-gray-700">練習時間:</label>
                <select
                  value={practiceTime}
                  onChange={(e) => setPracticeTime(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={15}>15分鐘</option>
                  <option value={30}>30分鐘</option>
                  <option value={45}>45分鐘</option>
                  <option value={60}>1小時</option>
                  <option value={90}>1.5小時</option>
                  <option value={120}>2小時</option>
                </select>
              </div>
              
              <button
                onClick={() => setShowAISpeaking(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                開始AI練習
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* 控制面板 */}
            <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-700">
                  剩餘時間: {formatTime(remainingTime)}
                </span>
                {isAIPracticing && (
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="flex space-x-4">
                {!isAIPracticing ? (
                  <button
                    onClick={startAIPractice}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    開始練習
                  </button>
                ) : (
                  <button
                    onClick={pauseAIPractice}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    暫停練習
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setShowAISpeaking(false)
                    setIsAIPracticing(false)
                    setAiMessages([])
                    setRemainingTime(0)
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  結束練習
                </button>
              </div>
            </div>

            {/* 對話區域 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 h-96 overflow-y-auto">
              {aiMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  點擊開始練習按鈕開始與AI對話
                </div>
              ) : (
                <div className="space-y-4">
                  {aiMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        message.startsWith('你:') 
                          ? 'bg-blue-100 text-blue-800 ml-8' 
                          : 'bg-purple-100 text-purple-800 mr-8'
                      }`}
                    >
                      {message}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 輸入區域 */}
            <div className="flex space-x-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="輸入你的回應..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={!isAIPracticing}
              />
              <button
                onClick={sendMessage}
                disabled={!userInput.trim() || !isAIPracticing}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                發送
              </button>
            </div>
          </div>
        )}

        {/* 返回按鈕 */}
        <div className="text-center mt-12">
          <Link
            href={`/learning/translate?lang=${selectedLang}`}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回翻譯工具
          </Link>
        </div>
      </div>
    </div>
  )
}
