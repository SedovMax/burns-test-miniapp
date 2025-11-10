-- Создание таблицы для хранения результатов теста депрессии Бернса
-- ВАЖНО: Если таблица уже существует, этот скрипт не изменит её структуру
-- Для пересоздания таблицы сначала удалите её: DROP TABLE IF EXISTS test_results;

-- Удаляем старую таблицу, если нужно пересоздать (раскомментируйте следующую строку)
-- DROP TABLE IF EXISTS test_results CASCADE;

CREATE TABLE IF NOT EXISTS test_results (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  answers INTEGER[] NOT NULL CHECK (array_length(answers, 1) = 25),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Создание индекса для быстрого поиска результатов по user_id
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);

-- Создание индекса для сортировки по дате
CREATE INDEX IF NOT EXISTS idx_test_results_completed_at ON test_results(completed_at DESC);

-- Включение Row Level Security (RLS)
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Удаляем старые политики, если они существуют (чтобы пересоздать)
DROP POLICY IF EXISTS "Users can view their own results" ON test_results;
DROP POLICY IF EXISTS "Users can insert their own results" ON test_results;

-- Политика безопасности: пользователи могут видеть все результаты
-- ВАЖНО: В продакшене измените на проверку auth.uid() для безопасности
CREATE POLICY "Users can view their own results"
  ON test_results
  FOR SELECT
  USING (true); -- Разрешаем всем читать все результаты (для тестирования)

-- Политика безопасности: пользователи могут вставлять результаты
-- ВАЖНО: В продакшене измените на проверку auth.uid() для безопасности
CREATE POLICY "Users can insert their own results"
  ON test_results
  FOR INSERT
  WITH CHECK (true); -- Разрешаем всем вставлять результаты (для тестирования)

-- Комментарии к таблице
COMMENT ON TABLE test_results IS 'Результаты теста депрессии Бернса';
COMMENT ON COLUMN test_results.user_id IS 'ID пользователя из Telegram';
COMMENT ON COLUMN test_results.score IS 'Общий балл теста (0-100)';
COMMENT ON COLUMN test_results.answers IS 'Массив ответов на 25 вопросов';
COMMENT ON COLUMN test_results.completed_at IS 'Дата и время прохождения теста';

