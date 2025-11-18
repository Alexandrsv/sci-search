import { create } from "zustand";
import type { SearchField, SortOption } from "./searchStore";

interface TempSearchStore {
	// Temporary search settings (for the search form)
	tempSearchQuery: string;
	tempSearchFields: SearchField[];
	tempSortBy: SortOption;

	// Methods for updating temporary search settings
	setTempSearchQuery: (query: string) => void;
	setTempSearchFields: (fields: SearchField[]) => void;
	addTempSearchField: (field: SearchField) => void;
	removeTempSearchField: (field: SearchField) => void;
	setTempSortBy: (sort: SortOption) => void;

	// Transfer data to main search store and trigger search
	transferToSearch: () => void;

	// Reset temporary search settings
	resetTempSearch: () => void;
}

const initialState = {
	tempSearchQuery: "",
	tempSearchFields: ["title"] as SearchField[],
	tempSortBy: "citations" as SortOption,
};

export const useTempSearchStore = create<TempSearchStore>((set, get) => ({
	...initialState,

	setTempSearchQuery: (query: string) => set({ tempSearchQuery: query }),

	setTempSearchFields: (fields: SearchField[]) =>
		set({ tempSearchFields: fields }),

	addTempSearchField: (field: SearchField) =>
		set((state) => ({
			tempSearchFields: state.tempSearchFields.includes(field)
				? state.tempSearchFields
				: [...state.tempSearchFields, field],
		})),

	removeTempSearchField: (field: SearchField) =>
		set((state) => ({
			tempSearchFields: state.tempSearchFields.filter((f) => f !== field),
		})),

	setTempSortBy: (sort: SortOption) => set({ tempSortBy: sort }),

	transferToSearch: async () => {
		const { tempSearchQuery, tempSearchFields, tempSortBy } = get();

		// Import the main search store here to avoid circular dependencies
		const { useSearchStore } = await import("./searchStore");
		useSearchStore.getState().setSearchQuery(tempSearchQuery);
		useSearchStore.getState().setSearchFields(tempSearchFields);
		useSearchStore.getState().setSortBy(tempSortBy);
	},

	resetTempSearch: () => set(initialState),
}));
