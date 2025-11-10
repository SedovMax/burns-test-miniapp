import { getDepressionLevel, getDepressionColor } from '../data/burnsTest'
import './ResultsScreen.css'

interface ResultsScreenProps {
  score: number
  userId: string | null
  onViewHistory: () => void
  onNewTest: () => void
}

export const ResultsScreen = ({ 
  score, 
  onViewHistory, 
  onNewTest 
}: ResultsScreenProps) => {
  const level = getDepressionLevel(score)
  const color = getDepressionColor(score)
  const maxScore = 100
  const percentage = (score / maxScore) * 100

  return (
    <div className="results-screen">
      <div className="results-header">
        <h1>Результаты теста</h1>
      </div>

      <div className="results-content">
        <div className="score-circle">
          <div 
            className="score-circle-inner"
            style={{ 
              background: `conic-gradient(${color} ${percentage * 3.6}deg, #e0e0e0 0deg)`
            }}
          >
            <div className="score-value">
              <span className="score-number">{score}</span>
              <span className="score-max">/ 100</span>
            </div>
          </div>
        </div>

        <div className="depression-level" style={{ color }}>
          <h2>{level}</h2>
        </div>

        <div className="score-description">
          <p>
            Ваш результат: <strong>{score} баллов</strong>
          </p>
          <p className="description-text">
            {score <= 5 && 'Отличные новости! Ваше эмоциональное состояние в норме.'}
            {score >= 6 && score <= 10 && 'Вы чувствуете себя нормально, но возможно, стоит обратить внимание на свое эмоциональное состояние.'}
            {score >= 11 && score <= 25 && 'У вас легкая депрессия. Рекомендуется обратиться к специалисту для консультации.'}
            {score >= 26 && score <= 50 && 'У вас умеренная депрессия. Настоятельно рекомендуется обратиться к психологу или психотерапевту.'}
            {score >= 51 && score <= 75 && 'У вас тяжелая депрессия. Необходимо обратиться за профессиональной помощью.'}
            {score >= 76 && score <= 100 && 'У вас экстремальная депрессия. Срочно обратитесь за профессиональной помощью.'}
          </p>
        </div>
      </div>

      <div className="results-actions">
        <button 
          className="action-button primary"
          onClick={onViewHistory}
        >
          Посмотреть динамику
        </button>
        <button 
          className="action-button secondary"
          onClick={onNewTest}
        >
          Пройти тест снова
        </button>
      </div>
    </div>
  )
}

