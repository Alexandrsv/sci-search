import { db } from "@/server/db";

export type SearchField = "title" | "abstract" | "author";

interface ArticleResult {
	id: number;
	doi: string;
	citation_count: number;
	year: number;
	title: string;
	highlighted_title: string;
	abstract: string;
	highlighted_abstract: string;
	author: string;
}

interface SearchParams {
	query: string;
	searchIn?: SearchField[];
	limit?: number;
	offset?: number;
}

export const searchArticles = async ({
	query,
	searchIn = ["title"],
	limit = 20,
	offset = 0,
}: SearchParams) => {
	if (searchIn.length === 1) {
		switch (searchIn[0]) {
			case "title":
				return searchArticlesByTitle({ query, limit, offset });
			case "abstract":
				return searchArticlesByAbstract({ query, limit, offset });
			default:
				return searchArticlesByALL({ query, limit, offset });
		}
	} else {
		return searchArticlesByALL({ query, limit, offset });
	}
};

export const searchArticlesByTitle = async ({
	query,
	limit = 20,
	offset = 0,
}: Omit<SearchParams, "searchIn">) => {
	const results = await db.$queryRaw<ArticleResult[]>`
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
    FROM scimag
    WHERE to_tsvector('english', title) @@ websearch_to_tsquery('english', ${query})
    ORDER BY citation_count DESC NULLS LAST
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	return results;
};

export const searchArticlesByAbstract = async ({
	query,
	limit = 20,
	offset = 0,
}: Omit<SearchParams, "searchIn">) => {
	const results = await db.$queryRaw<ArticleResult[]>`
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
    FROM scimag
    WHERE to_tsvector('english', abstract) @@ websearch_to_tsquery('english', ${query})
    ORDER BY citation_count DESC NULLS LAST
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	return results;
};

export const searchArticlesByALL = async ({
	query,
	limit = 20,
	offset = 0,
}: Omit<SearchParams, "searchIn">) => {
	const results = await db.$queryRaw<ArticleResult[]>`
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
    FROM scimag
    WHERE 
      to_tsvector('english', title) @@ websearch_to_tsquery('english', ${query})
      OR to_tsvector('english', abstract) @@ websearch_to_tsquery('english', ${query})
    ORDER BY citation_count DESC NULLS LAST
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	return results;
};
