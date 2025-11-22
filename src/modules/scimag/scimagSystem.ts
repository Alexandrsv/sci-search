import { db } from "@/server/db";
import { Prisma } from "../../../generated/prisma";

export type SearchField = "title" | "abstract" | "author";
export type SortOption = "citations" | "newest" | "oldest";

const getOrderBy = (sortBy: SortOption) => {
	switch (sortBy) {
		case "newest":
			return Prisma.sql`year DESC NULLS LAST, month DESC NULLS LAST, day DESC NULLS LAST`;
		case "oldest":
			return Prisma.sql`year ASC NULLS LAST, month ASC NULLS LAST, day ASC NULLS LAST`;
		default:
			return Prisma.sql`citation_count DESC NULLS LAST, year DESC NULLS LAST, month DESC NULLS LAST, day DESC NULLS LAST`;
	}
};

interface ArticleResult {
	id: number;
	doi: string;
	citation_count: number;
	year: string;
	month: string;
	day: string;
	title: string;
	highlighted_title: string;
	abstract: string;
	highlighted_abstract: string;
	author: string;
}

interface SearchParams {
	query: string;
	searchIn?: SearchField[];
	sortBy?: SortOption;
	limit?: number;
	offset?: number;
}

export const searchArticles = async ({
	query,
	searchIn = ["title"],
	sortBy = "citations",
	limit = 20,
	offset = 0,
}: SearchParams) => {
	if (searchIn.length === 1) {
		switch (searchIn[0]) {
			case "title":
				return searchArticlesByTitle({ query, sortBy, limit, offset });
			case "abstract":
				return searchArticlesByAbstract({ query, sortBy, limit, offset });
			default:
				return searchArticlesByALL({ query, sortBy, limit, offset });
		}
	} else {
		return searchArticlesByALL({ query, sortBy, limit, offset });
	}
};

export const searchArticlesByTitle = async ({
	query,
	sortBy = "citations",
	limit = 20,
	offset = 0,
}: Omit<SearchParams, "searchIn">) => {
	const results = await db.$queryRaw<ArticleResult[]>(
		Prisma.sql`
    WITH filtered_articles AS (
      SELECT
        id,
        doi,
        citation_count,
        year,
        month,
        day,
        title,
        abstract,
        author
      FROM scimag
      WHERE to_tsvector('english', title) @@ websearch_to_tsquery('english', ${query})
      OFFSET 0
    )
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
      ts_headline(
        'english',
        abstract,
        websearch_to_tsquery('english', ${query}),
        'StartSel=<mark>, StopSel=</mark>'
      ) as highlighted_abstract,
      author
    FROM filtered_articles
    ORDER BY ${getOrderBy(sortBy)}
    LIMIT ${limit}
    OFFSET ${offset}
  `,
	);

	return results;
};

export const searchArticlesByAbstract = async ({
	query,
	sortBy = "citations",
	limit = 20,
	offset = 0,
}: Omit<SearchParams, "searchIn">) => {
	const results = await db.$queryRaw<ArticleResult[]>`
    WITH filtered_articles AS (
      SELECT
        id,
        doi,
        citation_count,
        year,
        month,
        day,
        title,
        abstract,
        author
      FROM scimag
      WHERE to_tsvector('english', abstract) @@ websearch_to_tsquery('english', ${query})
      OFFSET 0
    )
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
      ts_headline(
        'english',
        abstract,
        websearch_to_tsquery('english', ${query}),
        'StartSel=<mark>, StopSel=</mark>'
      ) as highlighted_abstract,
      author
    FROM filtered_articles
    ORDER BY ${getOrderBy(sortBy)}
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	return results;
};

export const searchArticlesByALL = async ({
	query,
	sortBy = "citations",
	limit = 20,
	offset = 0,
}: Omit<SearchParams, "searchIn">) => {
	const results = await db.$queryRaw<ArticleResult[]>`
    WITH filtered_articles AS (
      SELECT
        id,
        doi,
        citation_count,
        year,
        month,
        day,
        title,
        abstract,
        author
      FROM scimag
      WHERE 
        to_tsvector('english', title) @@ websearch_to_tsquery('english', ${query})
        OR to_tsvector('english', abstract) @@ websearch_to_tsquery('english', ${query})
      OFFSET 0
    )
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
      ts_headline(
        'english',
        abstract,
        websearch_to_tsquery('english', ${query}),
        'StartSel=<mark>, StopSel=</mark>, MaxWords=100, MaxFragments=2'
      ) as highlighted_abstract,
      author
    FROM filtered_articles
    ORDER BY ${getOrderBy(sortBy)}
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	return results;
};
