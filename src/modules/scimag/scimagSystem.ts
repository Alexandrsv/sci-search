import { Prisma } from "generated/prisma";
import { db } from "@/server/db";

type SearchField = "title" | "abstract" | "author";

interface SearchParams {
	query: string;
	searchIn?: SearchField[]; // По умолчанию ['title']
	limit?: number;
	offset?: number;
}

export const searchArticles = async ({
	query,
	searchIn = ["title"],
	limit = 20,
	offset = 0,
}: SearchParams) => {
	const results = await db.$queryRaw<any[]>`
    SELECT
      id,
      doi,
      citation_count,
      year,
      title,
      ts_headline(
        'english',
        title,
        websearch_to_tsquery('english', ${query}),
        'StartSel=<mark>, StopSel=</mark>'
      ) as highlighted_title,
      abstract,
      author
    FROM scimag
    WHERE to_tsvector('english', title) @@ websearch_to_tsquery('english', ${query})
    ORDER BY citation_count DESC NULLS LAST
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	return results;
};
