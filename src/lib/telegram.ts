export interface TelegramUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
}

export interface TelegramWebApp {
  ready?: () => void
  expand?: () => void
  initDataUnsafe?: {
    user?: TelegramUser
  }
}

interface TelegramNamespace {
  WebApp?: TelegramWebApp
}

const getTelegramNamespace = (): TelegramNamespace | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  return (window as typeof window & { Telegram?: TelegramNamespace }).Telegram
}

export const getTelegramWebApp = (): TelegramWebApp | undefined => {
  return getTelegramNamespace()?.WebApp
}

export const getTelegramUserId = (): string | null => {
  const rawId = getTelegramWebApp()?.initDataUnsafe?.user?.id
  return typeof rawId === 'number' ? rawId.toString() : null
}

export const ensureTelegramReady = () => {
  const telegram = getTelegramWebApp()
  telegram?.ready?.()
  telegram?.expand?.()
}

export const getTelegramDebugInfo = () => {
  const telegram = getTelegramWebApp()
  return {
    hasTelegram: Boolean(getTelegramNamespace()),
    hasWebApp: Boolean(telegram),
    initData: telegram?.initDataUnsafe
  }
}
