import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getDepressionColor } from '../data/burnsTest'
import './HistoryScreen.css'

interface TestResult {
  id: number
  score: number
  completed_at: string
}

interface HistoryScreenProps {
  userId: string | null
  onBack: () => void
}

export const HistoryScreen = ({ userId, onBack }: HistoryScreenProps) => {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      loadHistory()
    } else {
      setLoading(false)
    }
  }, [userId])

  const loadHistory = async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    if (!isSupabaseConfigured) {
      console.warn('Supabase не настроен. История недоступна. Создайте файл .env с настройками Supabase.')
      setResults([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('test_results')
        .select('id, score, completed_at')
        .eq('user_id', userId)
        .order('completed_at', { ascending: true })

      if (error) {
        console.error('Ошибка загрузки истории:', error)
        setResults([])
      } else {
        setResults(data || [])
      }
    } catch (error) {
      console.error('Ошибка при загрузке:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const chartData = results.map((result, index) => ({
    name: `Тест ${index + 1}`,
    date: formatDate(result.completed_at),
    score: result.score,
    fullDate: result.completed_at
  }))

  const getAverageScore = () => {
    if (results.length === 0) return 0
    const sum = results.reduce((acc, r) => acc + r.score, 0)
    return Math.round(sum / results.length)
  }

  const getLatestScore = () => {
    if (results.length === 0) return null
    return results[results.length - 1].score
  }

  if (loading) {
    return (
      <div className="history-screen">
        <div className="loading">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="history-screen">
      <div className="history-header">
        <button className="back-button" onClick={onBack}>
          ← Назад
        </button>
        <h1>Динамика депрессии</h1>
      </div>

      {results.length === 0 ? (
        <div className="empty-history">
          <p>У вас пока нет сохраненных результатов.</p>
          <p>Пройдите тест, чтобы увидеть динамику.</p>
        </div>
      ) : (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Всего тестов</div>
              <div className="stat-value">{results.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Последний результат</div>
              <div className="stat-value">{getLatestScore()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Средний балл</div>
              <div className="stat-value">{getAverageScore()}</div>
            </div>
          </div>

          <div className="chart-container">
            <h2>График результатов</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value} баллов`, 'Результат']}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `Дата: ${payload[0].payload.date}`
                    }
                    return label
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke={getDepressionColor(getLatestScore() || 0)}
                  strokeWidth={3}
                  dot={{ r: 6, fill: getDepressionColor(getLatestScore() || 0) }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="results-list">
            <h2>История результатов</h2>
            <div className="results-items">
              {results.slice().reverse().map((result) => (
                <div key={result.id} className="result-item">
                  <div className="result-date">{formatDate(result.completed_at)}</div>
                  <div 
                    className="result-score"
                    style={{ color: getDepressionColor(result.score) }}
                  >
                    {result.score} баллов
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <button className="new-test-button" onClick={onBack}>
        Пройти новый тест
      </button>
    </div>
  )
}

