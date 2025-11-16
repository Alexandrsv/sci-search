PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Переходим в корень проекта
cd "$PROJECT_ROOT"

# Загружаем переменные из .env
set -a
source .env
set +a

# Создаём папку для миграции
mkdir -p prisma/migrations/0_init

echo "Экспорт схемы базы данных через Docker..."

# Экспортируем схему через Docker (PostgreSQL 18)
docker run --rm \
  postgres:18 \
  pg_dump "$DATABASE_URL" \
  --schema-only \
  --no-owner \
  --no-privileges \
  --no-tablespaces \
  --no-security-labels \
  --no-comments \
  > prisma/migrations/0_init/migration.sql


  echo "✓ Схема экспортирована в prisma/migrations/0_init/migration.sql"

# Помечаем миграцию как применённую
# npx prisma migrate resolve --applied 0_init

# echo "✓ Миграция 0_init помечена как применённую"
# echo "✓ Готово! Теперь можно работать с Prisma Migrate"