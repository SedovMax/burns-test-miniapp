# 📤 Загрузка проекта в GitHub

## Способ 1: Использование GitHub Desktop (Рекомендуется для начинающих)

GitHub Desktop - это графический интерфейс, который упрощает работу с Git. Это самый простой способ для новичков!

### Шаг 1: Установка GitHub Desktop

1. Если GitHub Desktop еще не установлен, скачайте его с [desktop.github.com](https://desktop.github.com/)
2. Установите и войдите в свой аккаунт GitHub

### Шаг 2: Создание репозитория на GitHub

1. Откройте [github.com](https://github.com) в браузере
2. Войдите в свой аккаунт
3. Нажмите на зеленую кнопку **"+"** в правом верхнем углу
4. Выберите **"New repository"**
5. Заполните форму:
   - **Repository name**: `burns-test-miniapp` (или любое другое имя)
   - **Description**: `Telegram Mini App для теста депрессии Бернса` (опционально)
   - Выберите **Public** (публичный) или **Private** (приватный)
   - **НЕ** отмечайте "Add a README file" (у нас уже есть README)
   - **НЕ** отмечайте "Add .gitignore" (у нас уже есть .gitignore)
   - **НЕ** выбирайте лицензию (можно добавить позже)
6. Нажмите **"Create repository"**

### Шаг 3: Добавление проекта в GitHub Desktop

1. Откройте **GitHub Desktop**
2. Нажмите **"File"** → **"Add local repository"**
3. Нажмите **"Choose..."** и выберите папку проекта:
   ```
   C:\Users\maxse\Downloads\Berns test
   ```
4. Если GitHub Desktop говорит, что это не репозиторий Git, нажмите **"Create a repository"**
5. Заполните:
   - **Name**: `burns-test-miniapp` (или как вы назвали на GitHub)
   - **Description**: `Telegram Mini App для теста депрессии Бернса`
   - **Local path**: `C:\Users\maxse\Downloads\Berns test`
   - **Git ignore**: выберите `Node` (для Node.js проектов)
6. Нажмите **"Create repository"**

### Шаг 4: Первый коммит

1. В GitHub Desktop вы увидите список файлов слева
2. Внизу слева введите сообщение коммита: `Initial commit: Burns depression test mini app`
3. Нажмите кнопку **"Commit to main"** (внизу слева)
4. Дождитесь завершения коммита

### Шаг 5: Публикация на GitHub

1. После коммита нажмите кнопку **"Publish repository"** (вверху)
2. Убедитесь, что:
   - **Name**: совпадает с названием репозитория на GitHub
   - **Keep this code private**: отмечено, если хотите приватный репозиторий
3. Нажмите **"Publish repository"**
4. Дождитесь завершения публикации

### Шаг 6: Проверка

1. Откройте [github.com](https://github.com) в браузере
2. Найдите свой репозиторий в списке
3. Убедитесь, что все файлы загружены

---

## Способ 2: Использование командной строки (Если Git установлен)

Если вы предпочитаете использовать команды или GitHub Desktop не работает:

### Шаг 1: Проверка установки Git

Откройте PowerShell и выполните:
```powershell
git --version
```

Если команда не работает, нужно установить Git:
1. Скачайте Git с [git-scm.com](https://git-scm.com/download/win)
2. Установите Git (при установке выберите "Git from the command line and also from 3rd-party software")
3. Перезапустите PowerShell

### Шаг 2: Настройка Git (только первый раз)

```powershell
git config --global user.name "Ваше Имя"
git config --global user.email "ваш_email@example.com"
```

Замените на ваше имя и email из GitHub.

### Шаг 3: Инициализация репозитория

1. Откройте PowerShell
2. Перейдите в папку проекта:
```powershell
cd "C:\Users\maxse\Downloads\Berns test"
```

3. Инициализируйте репозиторий:
```powershell
git init
```

### Шаг 4: Добавление файлов

Добавьте все файлы:
```powershell
git add .
```

Проверьте статус:
```powershell
git status
```

Вы должны увидеть список файлов, которые будут добавлены (зеленым цветом).

### Шаг 5: Создание первого коммита

```powershell
git commit -m "Initial commit: Burns depression test mini app"
```

### Шаг 6: Создание репозитория на GitHub

1. Откройте [github.com](https://github.com) в браузере
2. Нажмите **"+"** → **"New repository"**
3. Заполните форму (см. Способ 1, Шаг 2)
4. Нажмите **"Create repository"**
5. **НЕ** инициализируйте репозиторий (не добавляйте README, .gitignore, лицензию)

### Шаг 7: Подключение к GitHub

После создания репозитория GitHub покажет инструкции. Выполните:

```powershell
git remote add origin https://github.com/ВАШ_USERNAME/burns-test-miniapp.git
```

Замените `ВАШ_USERNAME` на ваш username GitHub.

### Шаг 8: Загрузка кода на GitHub

```powershell
git branch -M main
git push -u origin main
```

Если Git попросит ввести логин и пароль:
- **Логин**: ваш username GitHub
- **Пароль**: используйте Personal Access Token (см. ниже)

---

## Создание Personal Access Token (для командной строки)

Если Git просит пароль при `git push`:

1. Откройте GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Нажмите **"Generate new token (classic)"**
3. Заполните:
   - **Note**: `Git Push Token`
   - **Expiration**: выберите срок (например, 90 days)
   - Отметьте **`repo`** (все права на репозитории)
4. Нажмите **"Generate token"**
5. **Скопируйте токен** (он показывается только один раз!)
6. Используйте этот токен как пароль при `git push`

---

## Решение проблем

### Проблема: "nothing to commit, working tree clean"

Это означает, что все файлы уже закоммичены или Git не видит изменения.

**Решение**:

1. Проверьте, инициализирован ли репозиторий:
   ```powershell
   git status
   ```

2. Если репозиторий не инициализирован:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Если репозиторий инициализирован, но файлы не добавлены:
   ```powershell
   git add .
   git status  # Проверьте, что файлы добавлены
   git commit -m "Initial commit: Burns depression test mini app"
   ```

### Проблема: "fatal: not a git repository"

**Решение**:
```powershell
git init
```

### Проблема: Git не найден в PowerShell

**Решение**:
1. Установите Git с [git-scm.com](https://git-scm.com/download/win)
2. При установке выберите "Git from the command line and also from 3rd-party software"
3. Перезапустите PowerShell

### Проблема: GitHub Desktop не видит изменения

**Решение**:
1. Убедитесь, что вы открыли правильную папку в GitHub Desktop
2. Нажмите **"Repository"** → **"Show in Explorer"** - должна открыться папка проекта
3. Если папка неправильная, закройте репозиторий и добавьте правильную папку

### Проблема: Файлы не добавляются в коммит

**Проверьте .gitignore**:
- Файл `.env` должен быть в .gitignore (он уже там)
- Папка `node_modules` должна быть в .gitignore (она уже там)

Если файлы в .gitignore, они не будут добавлены в коммит - это нормально!

---

## Рекомендация

Для начинающих **настоятельно рекомендуется использовать GitHub Desktop** - это намного проще и нагляднее!

После того как код загружен на GitHub, вы сможете:
1. Подключить репозиторий к Vercel для деплоя
2. Поделиться кодом с другими
3. Отслеживать изменения

---

## Что делать после загрузки на GitHub

1. ✅ Подключить репозиторий к Vercel (см. `INSTRUCTIONS_RU.md`)
2. ✅ Настроить переменные окружения в Vercel
3. ✅ Задеплоить приложение
4. ✅ Настроить Telegram бота

---

**Удачи! 🚀**

Если возникнут проблемы, проверьте раздел "Решение проблем" выше или обратитесь за помощью.

