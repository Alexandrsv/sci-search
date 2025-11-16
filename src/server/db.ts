import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";

const createPrismaClient = () => {
	const connectionString = env.DATABASE_URL;
	const pool = new Pool({ connectionString });
	const adapter = new PrismaPg(pool);

	return new PrismaClient({
		adapter,
		log:
			env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});
};

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
