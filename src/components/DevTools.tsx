import { useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { getTelegramUserId } from '../lib/telegram'
import './DevTools.css'

interface DevToolsProps {
  userId: string | null
  onUserIdChange: (userId: string) => void
}

export const DevTools = ({ userId, onUserIdChange }: DevToolsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [testUserId, setTestUserId] = useState(userId || '')

  // Показываем только в режиме разработки (не в Telegram)
  // Проверяем наличие реального пользователя Telegram, а не просто скрипта
  const hasTelegramUser = getTelegramUserId()
  if (hasTelegramUser) {
    return null
  }

  const handleSaveUserId = () => {
    if (testUserId.trim()) {
      localStorage.setItem('test_user_id', testUserId.trim())
      onUserIdChange(testUserId.trim())
      setIsOpen(false)
    }
  }

  const handleClearUserId = () => {
    localStorage.removeItem('test_user_id')
    setTestUserId('')
    onUserIdChange('')
  }

  return (
    <>
      <button 
        className="dev-tools-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Инструменты разработчика"
      >
        🔧
      </button>
      
      {isOpen && (
        <div className="dev-tools-panel">
          <h3>Инструменты разработчика</h3>
          
          <div className="dev-tools-section">
            <h4>Текущий User ID:</h4>
            <code>{userId || 'Не установлен'}</code>
          </div>

          <div className="dev-tools-section">
            <h4>Тестовый User ID:</h4>
            <input
              type="text"
              value={testUserId}
              onChange={(e) => setTestUserId(e.target.value)}
              placeholder="test_123456"
            />
            <div className="dev-tools-buttons">
              <button onClick={handleSaveUserId}>Сохранить</button>
              <button onClick={handleClearUserId}>Очистить</button>
            </div>
          </div>

          <div className="dev-tools-section">
            <h4>Статус Supabase:</h4>
            <div className={`status-badge ${isSupabaseConfigured ? 'success' : 'error'}`}>
              {isSupabaseConfigured ? '✅ Настроен' : '❌ Не настроен'}
            </div>
            {!isSupabaseConfigured && (
              <p className="dev-tools-hint">
                Создайте файл .env с переменными VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY
              </p>
            )}
          </div>

          <button 
            className="dev-tools-close"
            onClick={() => setIsOpen(false)}
          >
            Закрыть
          </button>
        </div>
      )}
    </>
  )
}

