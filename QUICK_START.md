# 🚀 Быстрый старт

Краткая инструкция для тех, кто хочет быстро запустить проект.

## ⚡ За 5 минут

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Скопируйте URL и anon key из Settings → API
3. Создайте файл `.env`:
```
VITE_SUPABASE_URL=ваш_url
VITE_SUPABASE_ANON_KEY=ваш_ключ
```
4. Выполните SQL из `supabase_setup.sql` в SQL Editor

### 3. Запуск локально
```bash
npm run dev
```

### 4. Деплой на Vercel

1. Загрузите код в GitHub
2. Подключите репозиторий к Vercel
3. Добавьте переменные окружения (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. Деплой!

### 5. Настройка бота

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Создайте Mini App: `/newapp`
3. Укажите URL из Vercel
4. Готово! 🎉

---

**Подробные инструкции**: см. `INSTRUCTIONS_RU.md`

