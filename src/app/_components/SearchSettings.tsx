"use client";

import { useTranslations } from "next-intl";
import type { SearchField, SortOption } from "@/stores/searchStore";

interface SearchSettingsProps {
	searchIn: SearchField[];
	sortBy: SortOption;
	onSearchInChange: (fields: SearchField[]) => void;
	onSortByChange: (sort: SortOption) => void;
}

export const SearchSettings = ({
	searchIn,
	sortBy,
	onSearchInChange,
	onSortByChange,
}: SearchSettingsProps) => {
	const t = useTranslations("SearchSettings");

	const handleSearchInChange = (field: SearchField) => {
		if (searchIn.includes(field)) {
			if (searchIn.length > 1) {
				onSearchInChange(searchIn.filter((f) => f !== field));
			}
		} else {
			onSearchInChange([...searchIn, field]);
		}
	};

	return (
		<div className="rounded-lg border border-blue-500 bg-white/80 p-6 shadow-blue-200/50 shadow-md backdrop-blur-sm">
			<h2 className="mb-4 font-bold text-lg text-slate-900">{t("title")}</h2>

			<div className="mb-6">
				<h3 className="mb-2 font-medium text-slate-700">{t("searchIn")}</h3>
				<div className="space-y-2">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							checked={searchIn.includes("title")}
							className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
							onChange={() => handleSearchInChange("title")}
							type="checkbox"
						/>
						<span className="text-slate-600">{t("fields.title")}</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							checked={searchIn.includes("abstract")}
							className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
							onChange={() => handleSearchInChange("abstract")}
							type="checkbox"
						/>
						<span className="text-slate-600">{t("fields.abstract")}</span>
					</label>
				</div>
			</div>

			<div>
				<h3 className="mb-2 font-medium text-slate-700">{t("sortBy")}</h3>
				<div className="space-y-2">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							checked={sortBy === "citations"}
							className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
							name="sortBy"
							onChange={() => onSortByChange("citations")}
							type="radio"
						/>
						<span className="text-slate-600">{t("sortOptions.citations")}</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							checked={sortBy === "newest"}
							className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
							name="sortBy"
							onChange={() => onSortByChange("newest")}
							type="radio"
						/>
						<span className="text-slate-600">{t("sortOptions.newest")}</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							checked={sortBy === "oldest"}
							className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
							name="sortBy"
							onChange={() => onSortByChange("oldest")}
							type="radio"
						/>
						<span className="text-slate-600">{t("sortOptions.oldest")}</span>
					</label>
				</div>
			</div>
		</div>
	);
};
