"use client";

import { useCallback } from "react";
import type { SearchField, SortOption } from "@/stores/searchStore";

const SEARCH_FIELD_LABELS: Record<SearchField, string> = {
	title: "Название",
	abstract: "Аннотация",
};

const SORT_OPTION_LABELS: Record<SortOption, string> = {
	citations: "Цитируемые",
	newest: "Новые",
	oldest: "Старые",
};

interface SearchSettingsProps {
	searchIn: SearchField[];
	onSearchInChange: (fields: SearchField[]) => void;
	sortBy: SortOption;
	onSortByChange: (sort: SortOption) => void;
}

export function SearchSettings({
	searchIn,
	onSearchInChange,
	sortBy,
	onSortByChange,
}: SearchSettingsProps) {
	const handleFieldChange = useCallback(
		(field: SearchField, checked: boolean) => {
			if (checked) {
				if (!searchIn.includes(field)) {
					onSearchInChange([...searchIn, field]);
				}
			} else {
				onSearchInChange(searchIn.filter((f) => f !== field));
			}
		},
		[searchIn, onSearchInChange],
	);

	return (
		<div className="rounded-lg border border-slate-600/50 bg-slate-800/50 p-6">
			<h3 className="mb-6 font-semibold text-lg text-white">
				Настройки поиска
			</h3>

			<div className="space-y-4">
				{/* Sort By Section */}
				<div>
					<h4 className="mb-3 font-semibold text-white">Сортировка</h4>
					<label className="text-gray-400" htmlFor="order-select">
						сначала:
					</label>
					<select
						className="w-full rounded-md border border-slate-600/50 bg-slate-800 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
						id={"order-select"}
						onChange={(e) => onSortByChange(e.target.value as SortOption)}
						value={sortBy}
					>
						{(Object.keys(SORT_OPTION_LABELS) as SortOption[]).map((option) => (
							<option className="bg-slate-800" key={option} value={option}>
								{SORT_OPTION_LABELS[option]}
							</option>
						))}
					</select>
				</div>

				{/* Search Fields Section */}
				<div>
					<h4 className="mb-3 font-semibold text-white">Поля поиска</h4>
					<div className="space-y-2">
						{(Object.keys(SEARCH_FIELD_LABELS) as SearchField[]).map(
							(field) => (
								<label
									className="flex cursor-pointer items-center text-white/80 transition-colors hover:text-white"
									key={field}
								>
									<input
										checked={searchIn.includes(field)}
										className="mr-3 h-4 w-4 rounded border-slate-600 bg-slate-700 text-cyan-600 focus:ring-2 focus:ring-cyan-500"
										onChange={(e) => handleFieldChange(field, e.target.checked)}
										type="checkbox"
									/>
									{SEARCH_FIELD_LABELS[field]}
								</label>
							),
						)}
					</div>
				</div>
			</div>

			{searchIn.length === 0 && (
				<p className="mt-4 text-sm text-yellow-400">
					Выберите хотя бы одно поле для поиска
				</p>
			)}
		</div>
	);
}
