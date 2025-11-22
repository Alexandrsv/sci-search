"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSearchStore } from "@/stores/searchStore";
import { useTempSearchStore } from "@/stores/tempSearchStore";
import { api } from "@/trpc/react";
import { type Article, ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchSettings } from "./SearchSettings";

export const ArticlesList = () => {
	const t = useTranslations("HomePage");
	// Use Zustand stores
	const {
		searchQuery,
		searchFields,
		sortBy,
		setSearchQuery,
		setSearchFields,
		setSortBy,
	} = useSearchStore();
	const {
		tempSearchQuery,
		tempSearchFields,
		tempSortBy,
		setTempSearchQuery,
		setTempSearchFields,
		setTempSortBy,
	} = useTempSearchStore();

	const transferToSearchLocal = () => {
		setSearchQuery(tempSearchQuery);
		setSearchFields(tempSearchFields);
		setSortBy(tempSortBy);
	};

	const [limit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [hasSearched, setHasSearched] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const searchParams = {
		search: searchQuery || undefined,
		searchIn: searchFields,
		sortBy,
		limit,
		offset,
	};

	const { data, isLoading, error } = api.scimag.getArticles.useQuery(
		searchParams,
		{
			enabled: hasSearched && !!searchQuery.trim(),
		},
	);

	const utils = api.useUtils();

	const handleSearch = () => {
		setOffset(0);
		setCurrentPage(1);
		setHasSearched(true);
		utils.scimag.getArticles.invalidate();
	};

	const handleNextPage = () => {
		if (!data?.hasMore) return;
		setOffset((prev) => prev + limit);
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrevPage = () => {
		if (currentPage <= 1) return;
		setOffset((prev) => Math.max(0, prev - limit));
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	if (error) {
		return (
			<div className="py-8 text-center text-blue-400">
				Ошибка загрузки статей: {error.message}
			</div>
		);
	}

	return (
		<div className="flex w-full max-w-7xl flex-wrap gap-8">
			{/* Sidebar с настройками поиска */}
			<aside className="w-full shrink-0 sm:w-56">
				<SearchSettings
					onSearchInChange={setTempSearchFields}
					onSortByChange={setTempSortBy}
					searchIn={tempSearchFields}
					sortBy={tempSortBy}
				/>
			</aside>

			{/* Основной контент */}
			<div className="w-full min-w-0 flex-1 md:min-w-0 md:flex-1">
				{/* Search Form */}
				<form
					className="mb-8"
					onSubmit={(e) => {
						e.preventDefault();
						transferToSearchLocal();
						handleSearch();
					}}
				>
					<div className="flex w-full flex-col gap-3 sm:flex-row">
						<input
							className="flex-1 rounded-md border border-blue-500 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 shadow-blue-200/50 shadow-lg transition-colors focus:border-blue-500 focus:outline-none"
							onChange={(e) => setTempSearchQuery(e.target.value)}
							placeholder={t("searchPlaceholder")}
							type="search"
							value={tempSearchQuery}
						/>
						<button
							className="w-full rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow-blue-500/50 shadow-lg transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
							disabled={!tempSearchQuery.trim() || isLoading}
							type="submit"
						>
							{isLoading ? t("searching") : t("searchButton")}
						</button>
					</div>
				</form>

				{/* Loading State */}
				{isLoading && <LoadingSpinner message={t("searching")} />}

				{/* Results */}
				{!isLoading && hasSearched && (
					<>
						{/* Results Info */}
						<div className="mb-6 text-slate-600">
							{searchQuery.trim() && data?.articles?.length === 0 && (
								<p>{t("noResults")}</p>
							)}
						</div>

						{/* Articles List */}
						<div className="space-y-6">
							{data?.articles.map((article: Article) => (
								<ArticleCard article={article} key={article.id} />
							))}
						</div>

						{/* Pagination */}
						<div className="mt-8 flex items-center justify-center gap-4">
							<button
								className="rounded-md border border-blue-500 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={currentPage <= 1}
								onClick={handlePrevPage}
								type="button"
							>
								{t("prevPage")}
							</button>

							<span className="text-slate-600">
								{t("page")} {currentPage}
							</span>

							<button
								className="rounded-md border border-blue-500 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={!data?.hasMore}
								onClick={handleNextPage}
								type="button"
							>
								{t("nextPage")}
							</button>
						</div>
					</>
				)}

				{/* Initial State */}
				{!hasSearched && (
					<div className="py-16 text-center">
						<p className="text-lg text-slate-500">{t("initialState")}</p>
					</div>
				)}
			</div>
		</div>
	);
};
