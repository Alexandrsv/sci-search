import { create } from "zustand";

export type SearchField = "title" | "abstract";
export type SortOption = "newest" | "oldest" | "citations";

interface SearchStore {
	// Search settings
	searchQuery: string;
	searchFields: SearchField[];
	sortBy: SortOption;

	// Methods for updating search settings
	setSearchQuery: (query: string) => void;
	setSearchFields: (fields: SearchField[]) => void;
	addSearchField: (field: SearchField) => void;
	removeSearchField: (field: SearchField) => void;
	setSortBy: (sort: SortOption) => void;

	// Reset search settings
	resetSearch: () => void;
}

const initialState = {
	searchQuery: "",
	searchFields: ["title"] as SearchField[],
	sortBy: "citations" as SortOption,
};

export const useSearchStore = create<SearchStore>((set, _get) => ({
	...initialState,

	setSearchQuery: (query: string) => set({ searchQuery: query }),

	setSearchFields: (fields: SearchField[]) => set({ searchFields: fields }),

	addSearchField: (field: SearchField) =>
		set((state) => ({
			searchFields: state.searchFields.includes(field)
				? state.searchFields
				: [...state.searchFields, field],
		})),

	removeSearchField: (field: SearchField) =>
		set((state) => ({
			searchFields: state.searchFields.filter((f) => f !== field),
		})),

	setSortBy: (sort: SortOption) => set({ sortBy: sort }),

	resetSearch: () => set(initialState),
}));
