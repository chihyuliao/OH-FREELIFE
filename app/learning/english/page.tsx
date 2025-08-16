'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TranslationResult {
  original: string
  translated: string
  fromLanguage: string
  toLanguage: string
  timestamp: string
}

interface Language {
  code: string
  name: string
  flag: string
}

export default function EnglishTranslationPage() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [fromLanguage, setFromLanguage] = useState('en')
  const [toLanguage, setToLanguage] = useState('zh')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationHistory, setTranslationHistory] = useState<TranslationResult[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  const languages: Language[] = [
    { code: 'en', name: '英文', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'vi', name: '越南語', flag: '🇻🇳' },
    { code: 'ja', name: '日文', flag: '🇯🇵' }
  ]

  // 語音合成功能
  const speakText = (text: string, languageCode: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      
      // 設置語言
      switch (languageCode) {
        case 'en':
          utterance.lang = 'en-US'
          break
        case 'zh':
          utterance.lang = 'zh-TW'
          break
        case 'vi':
          utterance.lang = 'vi-VN'
          break
        case 'ja':
          utterance.lang = 'ja-JP'
          break
        default:
          utterance.lang = 'en-US'
      }
      
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      speechSynthesis.speak(utterance)
    } else {
      alert('您的瀏覽器不支持語音合成功能')
    }
  }

  // 停止語音
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  // 模擬專業翻譯 API
  const translateText = async (text: string, from: string, to: string) => {
    setIsTranslating(true)
    
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let result = ''
    
    // 英文翻譯示例
    const translations: { [key: string]: { [key: string]: string } } = {
      'en-zh': {
        'hello': '你好',
        'thank you': '謝謝',
        'goodbye': '再見',
        'i love you': '我愛你',
        'good morning': '早上好',
        'good evening': '晚上好',
        'study': '學習',
        'work': '工作',
        'friend': '朋友',
        'family': '家庭'
      },
      'zh-en': {
        '你好': 'Hello',
        '謝謝': 'Thank you',
        '再見': 'Goodbye',
        '我愛你': 'I love you',
        '早上好': 'Good morning',
        '晚上好': 'Good evening',
        '學習': 'Study',
        '工作': 'Work',
        '朋友': 'Friend',
        '家庭': 'Family'
      },
      'en-vi': {
        'hello': 'xin chào',
        'thank you': 'cảm ơn',
        'goodbye': 'tạm biệt',
        'i love you': 'tôi yêu bạn',
        'good morning': 'chào buổi sáng',
        'good evening': 'chào buổi tối',
        'study': 'học tập',
        'work': 'công việc',
        'friend': 'bạn bè',
        'family': 'gia đình'
      },
      'vi-en': {
        'xin chào': 'hello',
        'cảm ơn': 'thank you',
        'tạm biệt': 'goodbye',
        'tôi yêu bạn': 'i love you',
        'chào buổi sáng': 'good morning',
        'chào buổi tối': 'good evening',
        'học tập': 'study',
        'công việc': 'work',
        'bạn bè': 'friend',
        'gia đình': 'family'
      },
      'en-ja': {
        'hello': 'こんにちは',
        'thank you': 'ありがとう',
        'goodbye': 'さようなら',
        'i love you': '愛してる',
        'good morning': 'おはよう',
        'good evening': 'こんばんは',
        'study': '勉強',
        'work': '仕事',
        'friend': '友達',
        'family': '家族'
      },
      'ja-en': {
        'こんにちは': 'hello',
        'ありがとう': 'thank you',
        'さようなら': 'goodbye',
        '愛してる': 'i love you',
        'おはよう': 'good morning',
        'こんばんは': 'good evening',
        '勉強': 'study',
        '仕事': 'work',
        '友達': 'friend',
        '家族': 'family'
      }
    }
    
    const key = `${from}-${to}`
    const translationMap = translations[key]
    
    if (translationMap) {
      result = translationMap[text.toLowerCase()] || `[Professional Translation: ${text}]`
    } else {
      result = `[Professional Translation: ${text}]`
    }
    
    setIsTranslating(false)
    return result
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) return
    
    const result = await translateText(inputText, fromLanguage, toLanguage)
    setTranslatedText(result)
    
    // 保存到歷史記錄
    const fromLang = languages.find(l => l.code === fromLanguage)?.name || fromLanguage
    const toLang = languages.find(l => l.code === toLanguage)?.name || toLanguage
    
    const newTranslation: TranslationResult = {
      original: inputText,
      translated: result,
      fromLanguage: fromLang,
      toLanguage: toLang,
      timestamp: new Date().toLocaleString('zh-TW')
    }
    
    setTranslationHistory([newTranslation, ...translationHistory])
  }

  const handleSwapDirection = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp)
    setInputText(translatedText)
    setTranslatedText('')
  }

  const clearHistory = () => {
    setTranslationHistory([])
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
            <div className="flex items-center space-x-4">
              <Link href="/learning" className="text-gray-600 hover:text-gray-800 transition-colors">
                學習中心
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-semibold">🇺🇸 英文翻譯</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 頁面標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🇺🇸 英文翻譯工具</h1>
          <p className="text-xl text-gray-600">專業的中英文翻譯服務，提供準確的語言轉換</p>
        </div>

        {/* 語言選擇 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-700">從:</span>
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleSwapDirection}
              className="text-blue-500 hover:text-blue-700 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-700">到:</span>
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 翻譯區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 輸入區域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {languages.find(l => l.code === fromLanguage)?.flag} {languages.find(l => l.code === fromLanguage)?.name} 輸入
              </h3>
              <button
                onClick={() => speakText(inputText, fromLanguage)}
                disabled={!inputText.trim() || isSpeaking}
                className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
              >
                {isSpeaking ? (
                  <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="請輸入要翻譯的文字..."
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {inputText.length} 字符
              </span>
              <button
                onClick={() => setInputText('')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                清空
              </button>
            </div>
          </div>

          {/* 輸出區域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {languages.find(l => l.code === toLanguage)?.flag} {languages.find(l => l.code === toLanguage)?.name} 輸出
              </h3>
              <button
                onClick={() => speakText(translatedText, toLanguage)}
                disabled={!translatedText.trim() || isSpeaking}
                className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
              >
                {isSpeaking ? (
                  <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
              {isTranslating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">翻譯中...</span>
                </div>
              ) : (
                <div className="text-gray-700 whitespace-pre-wrap">
                  {translatedText || '翻譯結果將顯示在這裡'}
                </div>
              )}
            </div>
            {translatedText && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigator.clipboard.writeText(translatedText)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  複製結果
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 翻譯按鈕 */}
        <div className="text-center mb-8">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isTranslating}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isTranslating ? '翻譯中...' : '開始翻譯'}
          </button>
        </div>

        {/* 翻譯歷史 */}
        {translationHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">翻譯歷史</h3>
              <button
                onClick={clearHistory}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                清空歷史
              </button>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {translationHistory.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                     <div className="flex justify-between items-start mb-2">
                     <span className="text-xs text-gray-500">
                       {item.fromLanguage} → {item.toLanguage}
                     </span>
                     <span className="text-xs text-gray-500">{item.timestamp}</span>
                   </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">原文</div>
                      <div className="text-gray-900">{item.original}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">譯文</div>
                      <div className="text-gray-900">{item.translated}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 返回按鈕 */}
        <div className="text-center mt-12">
          <Link
            href="/learning"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回學習中心
          </Link>
        </div>
      </div>
    </div>
  )
}
