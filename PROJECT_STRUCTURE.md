# 📁 Структура проекта

## Основные файлы

```
Berns test/
├── 📄 package.json          # Зависимости проекта
├── 📄 tsconfig.json         # Настройки TypeScript
├── 📄 vite.config.ts        # Конфигурация Vite
├── 📄 vercel.json           # Настройки для Vercel
├── 📄 index.html            # HTML шаблон
├── 📄 .env.example          # Пример переменных окружения
├── 📄 .gitignore           # Игнорируемые файлы Git
│
├── 📁 src/                  # Исходный код
│   ├── 📄 main.tsx          # Точка входа приложения
│   ├── 📄 App.tsx           # Главный компонент
│   ├── 📄 index.css         # Глобальные стили
│   │
│   ├── 📁 components/       # React компоненты
│   │   ├── TestScreen.tsx   # Экран прохождения теста
│   │   ├── TestScreen.css
│   │   ├── ResultsScreen.tsx # Экран результатов
│   │   ├── ResultsScreen.css
│   │   ├── HistoryScreen.tsx # Экран истории и графика
│   │   └── HistoryScreen.css
│   │
│   ├── 📁 data/             # Данные и константы
│   │   └── burnsTest.ts     # Вопросы теста и функции
│   │
│   ├── 📁 lib/              # Библиотеки и утилиты
│   │   └── supabase.ts      # Клиент Supabase
│   │
│   └── 📁 types/            # TypeScript типы
│       └── telegram.d.ts    # Типы для Telegram API
│
├── 📁 supabase/             # SQL скрипты
│   └── supabase_setup.sql   # Создание таблицы
│
└── 📁 docs/                 # Документация
    ├── README.md            # Основная документация
    ├── INSTRUCTIONS_RU.md   # Подробные инструкции
    ├── QUICK_START.md       # Быстрый старт
    └── PROJECT_STRUCTURE.md # Этот файл
```

## Описание компонентов

### TestScreen.tsx
- Отображает вопросы теста последовательно
- Управляет навигацией (вперед/назад)
- Сохраняет ответы пользователя
- Вычисляет итоговый балл

### ResultsScreen.tsx
- Показывает результат теста
- Отображает уровень депрессии
- Предоставляет кнопки для просмотра истории

### HistoryScreen.tsx
- Загружает историю результатов из Supabase
- Отображает график динамики (Recharts)
- Показывает статистику (средний балл, количество тестов)

### burnsTest.ts
- Содержит 25 вопросов теста Бернса
- Функции для определения уровня депрессии
- Функции для получения цвета по баллу

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик
- **Supabase** - База данных
- **Recharts** - Графики
- **Telegram Web App API** - Интеграция с Telegram

## Команды

```bash
npm install      # Установка зависимостей
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка для продакшена
npm run preview  # Просмотр собранного приложения
```

