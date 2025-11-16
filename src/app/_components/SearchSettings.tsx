"use client";

import { useCallback } from "react";

type SearchField = "title" | "abstract";

const SEARCH_FIELD_LABELS: Record<SearchField, string> = {
	title: "Название",
	abstract: "Аннотация",
};

interface SearchSettingsProps {
	searchIn: SearchField[];
	onSearchInChange: (fields: SearchField[]) => void;
}

export function SearchSettings({
	searchIn,
	onSearchInChange,
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
				{(Object.keys(SEARCH_FIELD_LABELS) as SearchField[]).map((field) => (
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
				))}
			</div>

			{searchIn.length === 0 && (
				<p className="mt-4 text-sm text-yellow-400">
					Выберите хотя бы одно поле для поиска
				</p>
			)}
		</div>
	);
}
