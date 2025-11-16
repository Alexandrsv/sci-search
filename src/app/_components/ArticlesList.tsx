"use client";

import { useCallback, useMemo, useState } from "react";

import { api } from "@/trpc/react";
import { type Article, ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchSettings } from "./SearchSettings";

type SearchField = "title" | "abstract" | "author";

interface ArticlesResponse {
	articles: Article[];
	total: number;
	hasMore: boolean;
}

export const ArticlesList = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchFields, setSearchFields] = useState<SearchField[]>(["title"]);
	const [limit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [hasSearched, setHasSearched] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const searchParams = useMemo(
		() => ({
			search: searchQuery || undefined,
			searchIn: searchFields,
			limit,
			offset,
		}),
		[searchQuery, searchFields, limit, offset],
	);

	const { data, isLoading, error } = api.scimag.getArticles.useQuery(
		searchParams,
		{
			enabled: hasSearched && !!searchQuery.trim(),
		},
	);

	const utils = api.useUtils();

	const handleSearch = useCallback(() => {
		if (!searchQuery.trim()) return;

		setOffset(0);
		setCurrentPage(1);
		setHasSearched(true);
		utils.scimag.getArticles.invalidate();
	}, [searchQuery, utils]);

	const handleNextPage = useCallback(() => {
		if (!data?.hasMore) return;
		setOffset((prev) => prev + limit);
		setCurrentPage((prev) => prev + 1);
	}, [data?.hasMore, limit]);

	const handlePrevPage = useCallback(() => {
		if (currentPage <= 1) return;
		setOffset((prev) => Math.max(0, prev - limit));
		setCurrentPage((prev) => Math.max(1, prev - 1));
	}, [currentPage, limit]);

	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleSearch();
			}
		},
		[handleSearch],
	);

	if (error) {
		return (
			<div className="py-8 text-center text-red-400">
				Ошибка загрузки статей: {error.message}
			</div>
		);
	}

	return (
		<div className="flex w-full max-w-7xl gap-8">
			{/* Sidebar с настройками поиска */}
			<aside className="w-80 flex-shrink-0">
				<SearchSettings
					onSearchInChange={setSearchFields}
					searchIn={searchFields}
				/>
			</aside>

			{/* Основной контент */}
			<div className="min-w-0 flex-1">
				{/* Search Form */}
				<div className="mb-8">
					<div className="flex gap-3">
						<input
							className="flex-1 rounded-md border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-cyan-400 focus:outline-none"
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Введите поисковый запрос..."
							type="text"
							value={searchQuery}
						/>
						<button
							className="rounded-md bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!searchQuery.trim() || isLoading}
							onClick={handleSearch}
							type="button"
						>
							{isLoading ? "Поиск..." : "Поиск"}
						</button>
					</div>
				</div>

				{/* Loading State */}
				{isLoading && <LoadingSpinner message="Загрузка статей..." />}

				{/* Results */}
				{!isLoading && hasSearched && (
					<>
						{/* Results Info */}
						<div className="mb-6 text-slate-300">
							{data?.articles && data.articles.length > 0 ? (
								<p>Найдено статей: {data.total}</p>
							) : searchQuery.trim() ? (
								<p>Статьи не найдены</p>
							) : null}
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
								className="rounded-md border border-slate-600/50 bg-slate-700/70 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600/70 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={currentPage <= 1}
								onClick={handlePrevPage}
								type="button"
							>
								Назад
							</button>

							<span className="text-slate-300">Страница {currentPage}</span>

							<button
								className="rounded-md border border-slate-600/50 bg-slate-700/70 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600/70 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={!data?.hasMore}
								onClick={handleNextPage}
								type="button"
							>
								Вперед
							</button>
						</div>
					</>
				)}

				{/* Initial State */}
				{!hasSearched && (
					<div className="py-16 text-center">
						<p className="text-lg text-slate-400">
							Введите запрос для поиска научных статей
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
