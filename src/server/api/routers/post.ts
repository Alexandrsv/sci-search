import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
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
      })
    )
    .query(async ({ ctx, input }) => {
      const where = input.search
        ? {
            OR: [
              { title: { contains: input.search } },
              { author: { contains: input.search } },
              { journal: { contains: input.search } },
            ],
          }
        : {};

      const articles = await ctx.db.scimag.findMany({
        where,
        orderBy: { year: "desc" },
        take: input.limit,
        skip: input.offset,
        select: {
          id: true,
          doi: true,
          title: true,
          author: true,
          year: true,
          month: true,
          day: true,
          journal: true,
          issnp: true,
          issne: true,
          abstract: true,
          visible: true,
        },
      });

      return {
        articles,
        total: 99,
        hasMore: true,
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
});
