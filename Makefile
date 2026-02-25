# Variáveis
DB_URL=postgresql://admin:password123@localhost:5432/tspneus?schema=public
SCHEMA_PATH=hello-prisma/prisma/schema.prisma

# Abre o Prisma Studio (Apontando para o ficheiro correto)
studio:
	DATABASE_URL="$(DB_URL)" npx prisma studio --schema $(SCHEMA_PATH)

# Faz as migrações
setup:
	docker compose up -d
	@echo "A aguardar o Postgres..."
	@sleep 3
	bunx prisma migrate dev
	bunx prisma studio

# Gera o Prisma Client
gen:
	DATABASE_URL="$(DB_URL)" npx prisma generate --schema $(SCHEMA_PATH)

down:
	docker compose down -v --remove-orphans