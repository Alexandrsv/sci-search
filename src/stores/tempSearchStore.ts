import { create } from "zustand";
import type { SearchField } from "./searchStore";

interface TempSearchStore {
	// Temporary search settings (for the search form)
	tempSearchQuery: string;
	tempSearchFields: SearchField[];

	// Methods for updating temporary search settings
	setTempSearchQuery: (query: string) => void;
	setTempSearchFields: (fields: SearchField[]) => void;
	addTempSearchField: (field: SearchField) => void;
	removeTempSearchField: (field: SearchField) => void;

	// Transfer data to main search store and trigger search
	transferToSearch: () => void;

	// Reset temporary search settings
	resetTempSearch: () => void;
}

const initialState = {
	tempSearchQuery: "",
	tempSearchFields: ["title"] as SearchField[],
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

	transferToSearch: async () => {
		const { tempSearchQuery, tempSearchFields } = get();

		// Import the main search store here to avoid circular dependencies
		const { useSearchStore } = await import("./searchStore");
		useSearchStore.getState().setSearchQuery(tempSearchQuery);
		useSearchStore.getState().setSearchFields(tempSearchFields);
	},

	resetTempSearch: () => set(initialState),
}));
