import { useState, useEffect } from 'react'
import { questions } from '../data/burnsTest'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import './TestScreen.css'

interface TestScreenProps {
  userId: string | null
  onComplete: (score: number) => void
}

export const TestScreen = ({ userId, onComplete }: TestScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(25).fill(-1))
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(currentQuestionIndex > 0)
  }, [currentQuestionIndex])

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (answers[currentQuestionIndex] === -1) {
      alert('Пожалуйста, выберите ответ перед переходом к следующему вопросу')
      return
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Все вопросы отвечены, завершаем тест
      handleComplete(0) // Временное значение, реальный подсчет в handleComplete
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleComplete = async (score: number) => {
    // Последний вопрос (25-й) позитивный, поэтому инвертируем его оценку
    const adjustedAnswers = [...answers]
    if (adjustedAnswers[24] !== -1) {
      // Инвертируем: 0->4, 1->3, 2->2, 3->1, 4->0
      adjustedAnswers[24] = 4 - adjustedAnswers[24]
    }
    
    // Пересчитываем итоговый балл с учетом инверсии
    const finalScore = adjustedAnswers.reduce((sum, answer) => sum + answer, 0)
    
    // Сохраняем результат в Supabase
    console.log('💾 Попытка сохранить результат теста')
    console.log('📊 Параметры сохранения:', {
      userId: userId || 'НЕ УСТАНОВЛЕН',
      isSupabaseConfigured,
      finalScore,
      answersCount: adjustedAnswers.length,
      allAnswersFilled: adjustedAnswers.every(a => a !== -1)
    })

    // Проверяем все условия перед сохранением
    if (!userId) {
      console.error('❌ Не могу сохранить: userId не установлен')
      console.warn('⚠️ User ID не получен. Результат не будет сохранен.')
      alert('⚠️ Внимание: User ID не получен. Результат не будет сохранен в базу данных.')
    } else if (!isSupabaseConfigured) {
      console.error('❌ Не могу сохранить: Supabase не настроен')
      console.warn('⚠️ Supabase не настроен. Результат не будет сохранен.')
      console.warn('Проверьте файл .env и наличие переменных VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
      alert('⚠️ Внимание: Supabase не настроен. Результат не будет сохранен. Проверьте настройки в файле .env')
    } else {
      // Все условия выполнены - сохраняем
      try {
        const dataToInsert = {
          user_id: userId,
          score: finalScore,
          answers: adjustedAnswers,
          completed_at: new Date().toISOString()
        }
        
        console.log('📤 Отправка данных в Supabase:')
        console.log('   - user_id:', dataToInsert.user_id)
        console.log('   - score:', dataToInsert.score)
        console.log('   - answers (массив из', dataToInsert.answers.length, 'элементов):', dataToInsert.answers)
        console.log('   - completed_at:', dataToInsert.completed_at)
        
        const insertStartTime = Date.now()
        const { data, error } = await supabase
          .from('test_results')
          .insert(dataToInsert)
          .select()
        
        const insertDuration = Date.now() - insertStartTime
        console.log(`⏱️ Запрос выполнен за ${insertDuration}ms`)

        if (error) {
          console.error('❌ ОШИБКА сохранения результата в Supabase!')
          console.error('📋 Детали ошибки:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          console.error('🔍 Полный объект ошибки:', error)
          
          // Показываем понятное сообщение пользователю
          const errorMessage = error.message || 'Неизвестная ошибка'
          const errorHint = error.hint ? `\n\nПодсказка: ${error.hint}` : ''
          alert(`❌ Ошибка сохранения результата:\n\n${errorMessage}${errorHint}\n\nПроверьте консоль браузера (F12) для деталей.`)
        } else {
          console.log('✅ УСПЕХ! Результат успешно сохранен в Supabase!')
          console.log('📦 Сохраненные данные:', data)
          if (data && data.length > 0) {
            console.log('🆔 ID сохраненной записи:', data[0].id)
          }
        }
      } catch (error) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА при сохранении!')
        console.error('📋 Тип ошибки:', typeof error)
        console.error('📋 Конструктор:', error?.constructor?.name)
        
        if (error instanceof Error) {
          console.error('📋 Сообщение об ошибке:', error.message)
          console.error('📋 Стек ошибки:', error.stack)
          alert(`❌ Критическая ошибка при сохранении:\n\n${error.message}\n\nПроверьте консоль браузера (F12) для деталей.`)
        } else {
          console.error('📋 Неизвестная ошибка:', error)
          alert('❌ Произошла неизвестная ошибка при сохранении. Проверьте консоль браузера (F12).')
        }
      }
    }

    onComplete(finalScore)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  return (
    <div className="test-screen">
      <div className="test-header">
        <h1>Тест депрессии Бернса</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="question-counter">
          Вопрос {currentQuestionIndex + 1} из {questions.length}
        </p>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.text}</h2>
        
        <div className="answers-container">
          {[0, 1, 2, 3, 4].map((value) => (
            <button
              key={value}
              className={`answer-button ${
                answers[currentQuestionIndex] === value ? 'selected' : ''
              }`}
              onClick={() => handleAnswer(value)}
            >
              {value === 0 && 'Никогда'}
              {value === 1 && 'Редко'}
              {value === 2 && 'Иногда'}
              {value === 3 && 'Часто'}
              {value === 4 && 'Постоянно'}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button back-button"
          onClick={handlePrevious}
          disabled={!canGoBack}
        >
          ← Назад
        </button>
        <button
          className="nav-button next-button"
          onClick={handleNext}
        >
          {isLastQuestion ? 'Завершить тест' : 'Далее →'}
        </button>
      </div>
    </div>
  )
}

