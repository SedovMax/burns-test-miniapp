# 🗄️ Руководство по настройке Supabase

## Шаг 1: Создание таблицы

1. Откройте [supabase.com](https://supabase.com)
2. Войдите в свой проект
3. Перейдите в **SQL Editor** (в левом меню)
4. Нажмите **New query**
5. Скопируйте весь SQL из файла `supabase_setup.sql`
6. Вставьте в SQL Editor
7. Нажмите **Run** (или Ctrl+Enter)

## Шаг 2: Проверка таблицы

1. Перейдите в **Table Editor** (в левом меню)
2. Найдите таблицу `test_results`
3. Убедитесь, что структура правильная:

### Структура таблицы:

| Колонка | Тип | Описание |
|---------|-----|----------|
| `id` | bigint | Автоинкремент, первичный ключ |
| `user_id` | text | ID пользователя (из Telegram или тестовый) |
| `score` | integer | Балл теста (0-100) |
| `answers` | integer[] | Массив из 25 ответов |
| `completed_at` | timestamptz | Дата и время прохождения теста |
| `created_at` | timestamptz | Дата и время создания записи |

## Шаг 3: Проверка RLS политик

1. В **Table Editor** → **test_results**
2. Перейдите на вкладку **Policies**
3. Убедитесь, что есть две политики:

### Политика 1: SELECT (чтение)
- **Имя**: "Users can view their own results"
- **Тип**: SELECT
- **USING**: `true`

### Политика 2: INSERT (вставка)
- **Имя**: "Users can insert their own results"
- **Тип**: INSERT
- **WITH CHECK**: `true`

## Шаг 4: Тестирование вставки

### Способ 1: Через Table Editor

1. Откройте **Table Editor** → **test_results**
2. Нажмите **Insert row**
3. Заполните:
   - `user_id`: `test_manual_123`
   - `score`: `50`
   - `answers`: `{0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4}`
   - `completed_at`: оставьте пустым (будет установлено автоматически)
4. Нажмите **Save**
5. Если запись создалась - таблица работает правильно ✅
6. Если ошибка - проверьте структуру таблицы

### Способ 2: Через SQL Editor

Выполните в SQL Editor:

```sql
INSERT INTO test_results (user_id, score, answers, completed_at)
VALUES (
  'test_sql_123',
  50,
  ARRAY[0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4],
  NOW()
);
```

Если запрос выполнился без ошибок - таблица работает правильно ✅

## Решение проблем

### Проблема 1: Таблица не создается

**Решение**:
1. Проверьте, что вы вошли в правильный проект Supabase
2. Убедитесь, что у вас есть права на создание таблиц
3. Проверьте SQL на ошибки (красным цветом в SQL Editor)
4. Попробуйте выполнить SQL по частям

### Проблема 2: Ошибка "relation already exists"

**Решение**:
Таблица уже существует. Это нормально. Если нужно пересоздать:
1. Удалите таблицу: `DROP TABLE IF EXISTS test_results CASCADE;`
2. Выполните SQL из `supabase_setup.sql` снова

### Проблема 3: Ошибка "permission denied"

**Решение**:
1. Убедитесь, что вы используете правильный проект
2. Проверьте права доступа к проекту
3. Попробуйте отключить RLS временно (только для тестирования):
```sql
ALTER TABLE test_results DISABLE ROW LEVEL SECURITY;
```

### Проблема 4: Политики не создаются

**Решение**:
1. Убедитесь, что RLS включен: `ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;`
2. Удалите старые политики вручную через интерфейс
3. Выполните SQL для создания политик снова

### Проблема 5: Неправильный формат массива

**Решение**:
Массив `answers` должен быть в формате PostgreSQL:
- Правильно: `{0,1,2,3,4,...}` или `ARRAY[0,1,2,3,4,...]`
- Неправильно: `"[0,1,2,3,4]"` (строка)

## Проверка через API

### Тест вставки через API:

Откройте консоль браузера и выполните:

```javascript
// Замените на ваши значения из .env
const SUPABASE_URL = 'ваш_url'
const SUPABASE_ANON_KEY = 'ваш_ключ'

fetch(`${SUPABASE_URL}/rest/v1/test_results`, {
  method: 'POST',
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({
    user_id: 'test_api_123',
    score: 50,
    answers: [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4],
    completed_at: new Date().toISOString()
  })
})
.then(response => response.json())
.then(data => console.log('✅ Успех:', data))
.catch(error => console.error('❌ Ошибка:', error));
```

Если запрос выполнился успешно - API работает правильно ✅

## Безопасность

### ⚠️ Внимание: Текущие политики небезопасны!

Текущие политики разрешают всем читать и писать все данные. Это подходит только для тестирования!

### Для продакшена:

Измените политики на проверку пользователя:

```sql
-- Удалите старые политики
DROP POLICY IF EXISTS "Users can view their own results" ON test_results;
DROP POLICY IF EXISTS "Users can insert their own results" ON test_results;

-- Создайте безопасные политики (если используете Supabase Auth)
CREATE POLICY "Users can view their own results"
  ON test_results
  FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own results"
  ON test_results
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);
```

---

**После настройки таблицы** попробуйте пройти тест снова и проверьте сохранение результатов!

