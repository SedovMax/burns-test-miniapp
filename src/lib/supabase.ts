import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Эти значения нужно будет заменить на ваши из Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Проверяем, настроен ли Supabase
export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY)

// Логируем настройки для отладки
console.log('🔧 Настройки Supabase:', {
  hasUrl: !!SUPABASE_URL,
  hasKey: !!SUPABASE_ANON_KEY,
  urlLength: SUPABASE_URL.length,
  keyLength: SUPABASE_ANON_KEY.length,
  isConfigured: isSupabaseConfigured
})

// Создаем клиент только если есть URL и ключ
let supabaseClient: SupabaseClient | null = null

if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    console.log('✅ Supabase клиент успешно создан')
  } catch (error) {
    console.error('❌ Не удалось создать Supabase клиент:', error)
  }
} else {
  console.warn('⚠️ Supabase не настроен. Проверьте файл .env')
  if (!SUPABASE_URL) {
    console.warn('  - Отсутствует VITE_SUPABASE_URL')
  }
  if (!SUPABASE_ANON_KEY) {
    console.warn('  - Отсутствует VITE_SUPABASE_ANON_KEY')
  }
}

// Создаем заглушку для работы без Supabase
const supabaseStub = {
  from: () => ({
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase не настроен. Создайте файл .env с VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY' } }),
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: { message: 'Supabase не настроен' } })
      })
    })
  })
} as any

// Экспортируем клиент или заглушку
export const supabase: SupabaseClient = supabaseClient || supabaseStub

