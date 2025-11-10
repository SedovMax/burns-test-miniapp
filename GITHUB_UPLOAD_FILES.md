# 📤 Загрузка файлов на GitHub без GitHub Desktop

Если GitHub Desktop не работает, можно загрузить файлы напрямую через веб-интерфейс GitHub.

## 🚀 Способ 1: Загрузка через веб-интерфейс (Самый простой!)

### Шаг 1: Создайте репозиторий на GitHub.com

1. Откройте [github.com](https://github.com)
2. Нажмите **"+"** → **"New repository"**
3. Заполните:
   ```
   Repository name: burns-test-miniapp
   Description: Telegram Mini App для теста депрессии Бернса
   Public: ☑
   ⬜ Add a README file (НЕ отмечайте!)
   ```
4. Нажмите **"Create repository"**

### Шаг 2: Загрузите файлы через веб-интерфейс

1. На странице репозитория нажмите кнопку **"uploading an existing file"** (или просто перетащите файлы)
2. Откройте папку проекта: `C:\Users\maxse\Downloads\Berns test`
3. Перетащите файлы в окно браузера ИЛИ нажмите **"choose your files"** и выберите файлы

**Важно:** Загружайте файлы по частям (не все сразу):
- Сначала основные файлы: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`
- Потом папку `src/` (можно загрузить как zip и распаковать, или по файлам)
- Потом документацию: `README.md`, `INSTRUCTIONS_RU.md`, и т.д.

4. Внизу введите сообщение коммита: `Initial commit: All project files`
5. Нажмите **"Commit changes"**

### Шаг 3: Загрузите папку src/

Для папки `src/` с подпапками:
1. Нажмите **"Add file"** → **"Upload files"**
2. Перетащите всю папку `src/` в окно
3. GitHub автоматически создаст структуру папок
4. Нажмите **"Commit changes"**

**Примечание:** Этот способ может занять время, если файлов много.

---

## 🚀 Способ 2: Использование Git через командную строку (Если Git установлен)

Если у вас установлен Git (проверьте: `git --version` в PowerShell):

### Шаг 1: Создайте репозиторий на GitHub.com

1. Создайте репозиторий на [github.com](https://github.com) (см. выше)

### Шаг 2: Откройте PowerShell в папке проекта

1. Откройте Проводник Windows
2. Перейдите в: `C:\Users\maxse\Downloads\Berns test`
3. В адресной строке введите: `powershell` и нажмите Enter
4. Или нажмите Shift+ПКМ в папке → "Open PowerShell window here"

### Шаг 3: Инициализируйте репозиторий

Выполните команды по порядку:

```powershell
# Инициализация репозитория
git init

# Добавление всех файлов
git add .

# Создание коммита
git commit -m "Initial commit: Burns depression test mini app"

# Подключение к GitHub (замените YOUR_USERNAME на ваш username)
git remote add origin https://github.com/YOUR_USERNAME/burns-test-miniapp.git

# Переименование ветки в main
git branch -M main

# Загрузка на GitHub
git push -u origin main
```

**Важно:** При `git push` Git попросит логин и пароль:
- **Логин:** ваш username GitHub
- **Пароль:** используйте Personal Access Token (см. ниже)

### Создание Personal Access Token

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. Заполните:
   - **Note:** `Git Push Token`
   - **Expiration:** выберите срок
   - Отметьте **`repo`** (все права)
4. **Generate token**
5. **Скопируйте токен** (показывается только один раз!)
6. Используйте этот токен как пароль при `git push`

---

## 🚀 Способ 3: Использование VS Code (Если установлен)

Если у вас установлен Visual Studio Code:

1. Откройте VS Code
2. **File** → **Open Folder** → выберите `C:\Users\maxse\Downloads\Berns test`
3. В левой панели нажмите на иконку Git (ветка дерева)
4. Нажмите **"Initialize Repository"**
5. Нажмите **"+"** рядом с файлами, чтобы добавить их
6. Введите сообщение коммита: `Initial commit`
7. Нажмите галочку (Commit)
8. Нажмите **"..."** → **"Publish Branch"**
9. Выберите GitHub и следуйте инструкциям

---

## ✅ Рекомендация

**Для начинающих лучше всего использовать Способ 1** (загрузка через веб-интерфейс):
- ✅ Не требует установки дополнительных программ
- ✅ Работает прямо в браузере
- ✅ Просто и понятно

**Недостаток:** Может занять время, если файлов много.

---

## 📋 Что загружать

### Обязательно загрузить:
- ✅ package.json
- ✅ index.html
- ✅ vite.config.ts
- ✅ tsconfig.json
- ✅ vercel.json
- ✅ supabase_setup.sql
- ✅ Папка src/ (со всеми файлами)
- ✅ README.md
- ✅ Все .md файлы документации

### НЕ загружать:
- ❌ .env (секретные данные)
- ❌ node_modules/ (слишком большая папка)
- ❌ dist/ (сгенерированные файлы)

---

**Выберите способ, который вам удобнее, и следуйте инструкциям!** 🚀

