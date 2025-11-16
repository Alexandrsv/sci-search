import { create } from "zustand";

export type SearchField = "title" | "abstract" | "author";

interface SearchStore {
	// Search settings
	searchQuery: string;
	searchFields: SearchField[];

	// Methods for updating search settings
	setSearchQuery: (query: string) => void;
	setSearchFields: (fields: SearchField[]) => void;
	addSearchField: (field: SearchField) => void;
	removeSearchField: (field: SearchField) => void;

	// Reset search settings
	resetSearch: () => void;
}

const initialState = {
	searchQuery: "",
	searchFields: ["title"] as SearchField[],
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

	resetSearch: () => set(initialState),
}));
