import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";

const createPrismaClient = () => {
	const connectionString = env.DATABASE_URL;
	const pool = new Pool({ connectionString });
	const adapter = new PrismaPg(pool);
	console.log("env.NODE_ENV", env.NODE_ENV);

	const prisma = new PrismaClient({
		adapter,
		log:
			env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});

	// Логирование параметров только в development
	// if (env.NODE_ENV === "development") {
	prisma.$on("query", (e) => {
		console.log("Query:", e.query);
		console.log("Params:", e.params);
		console.log("Duration:", `${e.duration}ms`);
		console.log("---");
	});
	// }

	return prisma;
};

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
