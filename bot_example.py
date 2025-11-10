"""
Пример кода для Telegram бота, который запускает Mini App
Требуется установка: pip install python-telegram-bot
"""

import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Замените на ваш токен от BotFather
BOT_TOKEN = os.getenv("BOT_TOKEN", "ВАШ_ТОКЕН_ОТ_BOTFATHER")
# Замените на URL вашего приложения на Vercel
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://ваш-домен.vercel.app")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    keyboard = [
        [InlineKeyboardButton(
            "🧠 Пройти тест Бернса",
            web_app={"url": WEB_APP_URL}
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "👋 Добро пожаловать!\n\n"
        "Этот бот поможет вам пройти тест депрессии Бернса и отслеживать динамику вашего эмоционального состояния.\n\n"
        "Нажмите кнопку ниже, чтобы начать:",
        reply_markup=reply_markup
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    await update.message.reply_text(
        "📖 Помощь:\n\n"
        "/start - Начать работу с ботом\n"
        "/help - Показать это сообщение\n\n"
        "Тест депрессии Бернса состоит из 25 вопросов. "
        "После прохождения вы увидите результат и сможете отслеживать динамику."
    )


def main() -> None:
    """Запуск бота"""
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()

    # Регистрируем обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))

    # Запускаем бота
    logger.info("Бот запущен...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()

