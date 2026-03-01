# Variáveis
DB_URL=postgresql://admin:password123@localhost:5432/tspneus?schema=public
SCHEMA_PATH=hello-prisma/prisma/schema.prisma

# Abre o Prisma Studio (Apontando para o ficheiro correto)
studio:
	bun prisma studio --schema=$(SCHEMA_PATH)

# Faz as migrações
setup:
	docker compose up -d
	@echo "A dar tempo ao Postgres para tomar café (10s)..."
	@sleep 10
	DATABASE_URL="postgresql://admin:password123@127.0.0.1:5432/tspneus?schema=public" bunx prisma migrate dev --name inicializacao
	DATABASE_URL="postgresql://admin:password123@127.0.0.1:5432/tspneus?schema=public" bunx prisma studio

# Gera o Prisma Client
gen:
	bunx prisma generate

down:
	docker compose down -v --remove-orphans