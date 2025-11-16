"use client";

import { useState } from "react";

type SearchField = "title" | "abstract" | "author";

interface SearchSettingsProps {
	searchIn: SearchField[];
	onSearchInChange: (fields: SearchField[]) => void;
}

export function SearchSettings({
	searchIn,
	onSearchInChange,
}: SearchSettingsProps) {
	const handleFieldChange = (field: SearchField, checked: boolean) => {
		if (checked) {
			onSearchInChange([...searchIn, field]);
		} else {
			onSearchInChange(searchIn.filter((f) => f !== field));
		}
	};

	return (
		<div className="border border-slate-600/50 bg-slate-800/50 p-4">
			<h3 className="mb-4 font-semibold text-white">Настройки поиска</h3>
			<div className="space-y-3">
				<label className="flex items-center text-white/80">
					<input
						checked={searchIn.includes("title")}
						className="mr-2"
						onChange={(e) => handleFieldChange("title", e.target.checked)}
						type="checkbox"
					/>
					Название
				</label>
				<label className="flex items-center text-white/80">
					<input
						checked={searchIn.includes("abstract")}
						className="mr-2"
						onChange={(e) => handleFieldChange("abstract", e.target.checked)}
						type="checkbox"
					/>
					Аннотация
				</label>
				<label className="flex items-center text-white/80">
					<input
						checked={searchIn.includes("author")}
						className="mr-2"
						onChange={(e) => handleFieldChange("author", e.target.checked)}
						type="checkbox"
					/>
					Автор
				</label>
			</div>
		</div>
	);
}
