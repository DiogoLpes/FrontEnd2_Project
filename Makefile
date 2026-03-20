# Variáveis corrigidas
DB_URL=postgresql://postgres:admin123@localhost:5432/tspneus?schema=public
SCHEMA_PATH=prisma/schema.prisma

studio:
	bun prisma studio

setup:
	docker compose up -d
	@echo "A dar tempo ao Postgres para tomar café (10s)..."
	@sleep 10
	DATABASE_URL="$(DB_URL)" bunx prisma migrate dev --name inicializacao
	DATABASE_URL="$(DB_URL)" bunx prisma studio --port 5555 --browser none

gen:
	bunx prisma generate

down:
	docker compose down -v --remove-orphans