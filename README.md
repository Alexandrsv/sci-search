# Поисковый интерфейс для научных статей (sci-search)

Этот проект представляет собой веб-приложение для поиска научных статей.

## Технологии

- [Next.js](https://nextjs.org/) - Фреймворк для React-приложений с серверным рендерингом.
- [tRPC](https://trpc.io/) - Для создания типизированных API без необходимости кодогенерации.
- [Prisma](https://prisma.io/) - ORM для взаимодействия с базой данных.
- [PostgreSQL](https://www.postgresql.org/) - Реляционная база данных.
- [Tailwind CSS](https://tailwindcss.com/) - CSS-фреймворк для быстрой вёрстки.
- [Zustand](https://zustand-demo.pmnd.rs/) - Простое и быстрое управление состоянием.
- [Biome](https://biomejs.dev/) - Форматер и линтер для кода.

## Начало работы

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта, скопировав содержимое `.env.example`. Этот файл содержит все необходимые переменные окружения, включая настройки базы данных (PostgreSQL), данные для подключения (например, `DATABASE_URL` и `DATABASE_URL_DOCKER`), а также публичные переменные для фронтенда, такие как `NEXT_PUBLIC_YANDEX_METRIKA_ID`.

Обязательно замените значения-заполнители своими собственными, особенно для секретных данных, таких как пароли.

```bash
cp .env.example .env
```

Пример `.env` (для полной информации смотрите `.env.example`):
```
APP_NAME="sci-search"
# ... другие переменные
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXT_PUBLIC_YANDEX_METRIKA_ID="YOUR_YANDEX_METRIKA_ID"
```

### 3. Применение миграций базы данных

Выполните миграции для создания необходимых таблиц в базе данных.

```bash
npm run db:generate
```

### 4. Запуск приложения

Запустите сервер для разработки.

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Доступные скрипты

- `npm run dev` - Запуск сервера для разработки.
- `npm run build` - Сборка production-версии приложения.
- `npm run start` - Запуск production-сборки.
- `npm run check` - Проверка кода с помощью Biome.
- `npm run db:generate` - Применение миграций базы данных.
- `npm run db:studio` - Запуск Prisma Studio для просмотра и редактирования данных.