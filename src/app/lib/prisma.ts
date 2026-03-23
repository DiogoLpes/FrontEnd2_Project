// Altera o import para o teu caminho customizado
import { PrismaClient } from "../../generated/prisma"; 
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Aqui também tens de usar o tipo vindo da pasta gerada
const globalForPrisma = global as unknown as {
  prisma: any; 
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;