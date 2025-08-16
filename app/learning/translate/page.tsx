'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

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

interface ToolOption {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export default function TranslatePage() {
  const searchParams = useSearchParams()
  const selectedLang = searchParams.get('lang') || 'english'
  
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [fromLanguage, setFromLanguage] = useState('zh')
  const [toLanguage, setToLanguage] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationHistory, setTranslationHistory] = useState<TranslationResult[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const languages: Language[] = [
    { code: 'en', name: '英文', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'vi', name: '越南語', flag: '🇻🇳' },
    { code: 'ja', name: '日文', flag: '🇯🇵' }
  ]

  const toolOptions: ToolOption[] = [
    {
      id: 'translate',
      name: '翻譯工具',
      icon: '🔤',
      color: 'from-blue-500 to-blue-600',
      description: '多語言翻譯服務'
    },
    {
      id: 'ai-speaking',
      name: 'AI SPEAKING',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      description: 'AI口語練習助手'
    },
    {
      id: 'grammar',
      name: '語法檢查',
      icon: '📝',
      color: 'from-green-500 to-green-600',
      description: '語法錯誤檢測'
    },
    {
      id: 'vocabulary',
      name: '詞彙學習',
      icon: '📚',
      color: 'from-orange-500 to-orange-600',
      description: '詞彙記憶訓練'
    },
    {
      id: 'pronunciation',
      name: '發音練習',
      icon: '🎤',
      color: 'from-pink-500 to-pink-600',
      description: '發音準確度訓練'
    }
  ]

  // 根據選擇的語言設置默認翻譯方向
  useEffect(() => {
    switch (selectedLang) {
      case 'english':
        setToLanguage('en')
        break
      case 'chinese':
        setToLanguage('zh')
        break
      case 'vietnamese':
        setToLanguage('vi')
        break
      case 'japanese':
        setToLanguage('ja')
        break
      default:
        setToLanguage('en')
    }
  }, [selectedLang])

  // 語音合成功能
  const speakText = (text: string, languageCode: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      
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

  // 模擬翻譯 API
  const translateText = async (text: string, from: string, to: string) => {
    setIsTranslating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let result = ''
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
      'vi-zh': {
        'xin chào': '你好',
        'cảm ơn': '謝謝',
        'tạm biệt': '再見',
        'tôi yêu bạn': '我愛你',
        'chào buổi sáng': '早上好',
        'chào buổi tối': '晚上好',
        'học tập': '學習',
        'công việc': '工作',
        'bạn bè': '朋友',
        'gia đình': '家庭'
      },
      'zh-vi': {
        '你好': 'xin chào',
        '謝謝': 'cảm ơn',
        '再見': 'tạm biệt',
        '我愛你': 'tôi yêu bạn',
        '早上好': 'chào buổi sáng',
        '晚上好': 'chào buổi tối',
        '學習': 'học tập',
        '工作': 'công việc',
        '朋友': 'bạn bè',
        '家庭': 'gia đình'
      }
    }
    
    const key = `${from}-${to}`
    const translationMap = translations[key]
    
    if (translationMap) {
      result = translationMap[text.toLowerCase()] || `[專業翻譯: ${text}]`
    } else {
      result = `[專業翻譯: ${text}]`
    }
    
    setIsTranslating(false)
    return result
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) return
    
    const result = await translateText(inputText, fromLanguage, toLanguage)
    setTranslatedText(result)
    
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
              <span className="text-gray-600 font-semibold">
                {languages.find(l => l.code === toLanguage)?.flag} {languages.find(l => l.code === toLanguage)?.name} 學習
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 頁面標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {languages.find(l => l.code === toLanguage)?.flag} {languages.find(l => l.code === toLanguage)?.name} 學習工具
          </h1>
          <p className="text-xl text-gray-600">選擇你需要的學習工具，開始你的語言學習之旅</p>
        </div>

        {/* 工具選項 - 橢圓按鈕 */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
            {toolOptions.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  if (tool.id === 'ai-speaking') {
                    // 導航到AI SPEAKING頁面
                    window.location.href = `/learning/ai-speaking?lang=${selectedLang}`
                  } else {
                    setActiveTool(tool.id)
                  }
                }}
                className={`w-48 h-24 rounded-full bg-gradient-to-r ${tool.color} text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center`}
              >
                <div className="text-2xl mb-1">{tool.icon}</div>
                <div>{tool.name}</div>
                <div className="text-xs opacity-80 mt-1">{tool.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 翻譯工具內容 */}
        {activeTool === 'translate' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔤 翻譯工具</h2>
            
            {/* 語言選擇 */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-4">
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
              <div className="bg-gray-50 rounded-lg p-6">
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
              <div className="bg-gray-50 rounded-lg p-6">
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
                <div className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-white overflow-y-auto">
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
              <div className="bg-gray-50 rounded-lg p-6">
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
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
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
          </div>
        )}

        {/* 其他工具提示 */}
        {activeTool && activeTool !== 'translate' && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {toolOptions.find(t => t.id === activeTool)?.icon} {toolOptions.find(t => t.id === activeTool)?.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {toolOptions.find(t => t.id === activeTool)?.description}
            </p>
            <p className="text-gray-500">此功能正在開發中，敬請期待！</p>
          </div>
        )}

        {/* 默認提示 */}
        {!activeTool && (
          <div className="text-center text-gray-500">
            選擇上方的工具開始使用
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
