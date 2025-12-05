import { z } from "zod";
import { searchArticles } from "@/modules/scimag/scimagSystem";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const scimagRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	getArticles: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(10),
				offset: z.number().min(0).default(0),
				search: z.string().optional(),
				searchIn: z
					.array(z.enum(["title", "abstract", "author"]))
					.default(["title"]),
				sortBy: z.enum(["citations", "newest", "oldest"]).default("citations"),
			}),
		)
		.query(async ({ input }) => {
			if (!input.search || input.search.trim() === "") {
				// Если нет поиска, возвращаем пустой результат или базовый список
				return {
					articles: [],
					total: 0,
					hasMore: false,
				};
			}

			const articles = await searchArticles({
				query: input.search,
				searchIn: input.searchIn,
				sortBy: input.sortBy,
				limit: input.limit,
				offset: input.offset,
			});

			const hasMore = articles.length === input.limit;

			return {
				articles,
				total: articles.length, // Пока используем длину, позже можно добавить счетчик
				hasMore,
			};
		}),

	getArticleByDoi: publicProcedure
		.input(z.object({ doi: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db.scimag.findUnique({
				where: { doi: input.doi },
				select: {
					id: true,
					doi: true,
					title: true,
					author: true,
					year: true,
					month: true,
					day: true,
					volume: true,
					issue: true,
					first_page: true,
					last_page: true,
					journal: true,
					isbn: true,
					issnp: true,
					issne: true,
					md5: true,
					filesize: true,
					timeadded: true,
					abstracturl: true,
					attribute1: true,
					attribute2: true,
					attribute3: true,
					attribute4: true,
					attribute5: true,
					attribute6: true,
					visible: true,
					pubmedid: true,
					pmc: true,
					pii: true,
					citation_count: true,
					abstract: true,
					type: true,
				},
			});
		}),

	getArticleById: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			return ctx.db.scimag.findUnique({
				where: { id: input.id },
				select: {
					id: true,
					doi: true,
					title: true,
					author: true,
					year: true,
					month: true,
					day: true,
					volume: true,
					issue: true,
					first_page: true,
					last_page: true,
					journal: true,
					isbn: true,
					issnp: true,
					issne: true,
					md5: true,
					filesize: true,
					timeadded: true,
					abstracturl: true,
					attribute1: true,
					attribute2: true,
					attribute3: true,
					attribute4: true,
					attribute5: true,
					attribute6: true,
					visible: true,
					pubmedid: true,
					pmc: true,
					pii: true,
					citation_count: true,
					abstract: true,
					type: true,
				},
			});
		}),
});
