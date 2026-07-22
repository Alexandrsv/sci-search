export type SearchField = "title" | "abstract";
export type SortOption = "newest" | "oldest" | "citations";

export interface SearchState {
	search: string;
	searchIn: SearchField[];
	sortBy: SortOption;
	page: number;
}

export type SearchParamsInput = Record<string, string | string[] | undefined>;

export const SEARCH_PAGE_SIZE = 10;

const DEFAULT_SEARCH_FIELDS: SearchField[] = ["title"];
const DEFAULT_SORT: SortOption = "citations";

const isSearchField = (value: string): value is SearchField =>
	value === "title" || value === "abstract";

const isSortOption = (value: string): value is SortOption =>
	value === "newest" || value === "oldest" || value === "citations";

const getFirstParam = (
	value: string | string[] | undefined,
): string | undefined => (Array.isArray(value) ? value[0] : value);

const getSearchFields = (
	value: string | string[] | undefined,
): SearchField[] => {
	const values = (Array.isArray(value) ? value : [value])
		.filter((item): item is string => Boolean(item))
		.flatMap((item) => item.split(","));
	const fields = values.filter(isSearchField);

	return fields.length > 0 ? [...new Set(fields)] : DEFAULT_SEARCH_FIELDS;
};

export const parseSearchParams = (params: SearchParamsInput): SearchState => {
	const rawPage = Number.parseInt(getFirstParam(params.page) ?? "1", 10);
	const rawSort = getFirstParam(params.sortBy);

	return {
		search: getFirstParam(params.search)?.trim() ?? "",
		searchIn: getSearchFields(params.searchIn),
		sortBy: rawSort && isSortOption(rawSort) ? rawSort : DEFAULT_SORT,
		page: Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1,
	};
};

export const serializeSearchState = (state: SearchState): string => {
	const params = new URLSearchParams();
	const search = state.search.trim();

	if (search) {
		params.set("search", search);
	}

	if (state.searchIn.join(",") !== DEFAULT_SEARCH_FIELDS.join(",")) {
		params.set("searchIn", state.searchIn.join(","));
	}

	if (state.sortBy !== DEFAULT_SORT) {
		params.set("sortBy", state.sortBy);
	}

	if (state.page > 1) {
		params.set("page", String(state.page));
	}

	return params.toString();
};

export const getArticlesSearchInput = (state: SearchState) => ({
	search: state.search || undefined,
	searchIn: state.searchIn,
	sortBy: state.sortBy,
	limit: SEARCH_PAGE_SIZE,
	offset: (state.page - 1) * SEARCH_PAGE_SIZE,
});
