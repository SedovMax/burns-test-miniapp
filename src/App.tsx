import { useState, useEffect } from 'react'
import { TestScreen } from './components/TestScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { HistoryScreen } from './components/HistoryScreen'
import { DevTools } from './components/DevTools'
import './App.css'

type Screen = 'test' | 'results' | 'history'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('test')
  const [testResult, setTestResult] = useState<number | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Логируем изменения userId
  useEffect(() => {
    if (userId) {
      console.log('👤 userId установлен:', userId)
    } else {
      console.log('⚠️ userId не установлен (null)')
    }
  }, [userId])

  useEffect(() => {
    console.log('🔍 Инициализация приложения...')
    console.log('Проверка Telegram Web App:', {
      hasTelegram: !!window.Telegram,
      hasWebApp: !!window.Telegram?.WebApp,
      initData: window.Telegram?.WebApp?.initDataUnsafe
    })

    // Проверяем, действительно ли мы в Telegram (проверяем наличие user в initData)
    const tg = window.Telegram?.WebApp
    const initData = tg?.initDataUnsafe
    const telegramUserId = initData?.user?.id

    if (tg && telegramUserId) {
      // Мы в Telegram - используем реальный userId
      const telegramUserIdString = telegramUserId.toString()
      console.log('✅ Обнаружен Telegram, используем userId из Telegram:', telegramUserIdString)
      tg.ready()
      tg.expand()
      setUserId(telegramUserIdString)
    } else {
      // Локальное тестирование - создаем или используем тестовый userId
      console.log('🌐 Локальный режим (не в Telegram)')
      const localUserId = localStorage.getItem('test_user_id')
      
      if (localUserId) {
        console.log('📋 Используется сохраненный тестовый userId:', localUserId)
        setUserId(localUserId)
      } else {
        // Создаем новый тестовый userId
        const newUserId = 'test_' + Date.now()
        localStorage.setItem('test_user_id', newUserId)
        console.log('✨ Создан новый тестовый userId:', newUserId)
        setUserId(newUserId)
      }
    }
  }, [])

  const handleTestComplete = (score: number) => {
    setTestResult(score)
    setCurrentScreen('results')
  }

  const handleViewHistory = () => {
    setCurrentScreen('history')
  }

  const handleNewTest = () => {
    setTestResult(null)
    setCurrentScreen('test')
  }

  const handleUserIdChange = (newUserId: string) => {
    setUserId(newUserId)
  }

  return (
    <div className="app">
      {currentScreen === 'test' && (
        <TestScreen 
          userId={userId}
          onComplete={handleTestComplete}
        />
      )}
      {currentScreen === 'results' && testResult !== null && (
        <ResultsScreen
          score={testResult}
          userId={userId}
          onViewHistory={handleViewHistory}
          onNewTest={handleNewTest}
        />
      )}
      {currentScreen === 'history' && (
        <HistoryScreen
          userId={userId}
          onBack={handleNewTest}
        />
      )}
      <DevTools userId={userId} onUserIdChange={handleUserIdChange} />
    </div>
  )
}

export default App

