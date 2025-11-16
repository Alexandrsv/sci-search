"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import { SearchSettings } from "./SearchSettings";

type SearchField = "title" | "abstract" | "author";

export function ArticlesList() {
	const [search, setSearch] = useState("");
	const [searchIn, setSearchIn] = useState<SearchField[]>(["title"]);
	const [limit, setLimit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [hasSearched, setHasSearched] = useState(false);

	const { data, isLoading } = api.scimag.getArticles.useQuery(
		{
			search: search || undefined,
			searchIn,
			limit,
			offset,
		},
		{
			enabled: hasSearched && !!search.trim(),
		},
	);

	const utils = api.useUtils();

	const handleSearch = () => {
		setOffset(0);
		setHasSearched(true);
		utils.scimag.getArticles.invalidate();
	};

	const renderHighlightedText = (
		text: string | null,
		highlightedField?: string,
	) => {
		if (!text) return null;

		// Если есть highlighted версия, используем её
		if (highlightedField && (data as any)?.articles?.[0]?.[highlightedField]) {
			return (
				<span
					dangerouslySetInnerHTML={{
						__html: (data as any).articles[0][highlightedField],
					}}
				/>
			);
		}

		return text;
	};

	if (isLoading) {
		return <div className="text-white">Loading articles...</div>;
	}

	return (
		<div className="flex w-full max-w-6xl gap-6">
			{/* Sidebar с настройками поиска */}
			<aside className="w-80 flex-shrink-0">
				<SearchSettings onSearchInChange={setSearchIn} searchIn={searchIn} />
			</aside>

			{/* Основной контент */}
			<div className="flex-1">
				<div className="mb-6">
					<input
						className="w-full border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-cyan-400 focus:outline-none"
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search articles..."
						type="text"
						value={search}
					/>
					<button
						className="mt-3 border border-slate-600/50 bg-slate-700/70 px-6 py-2 font-semibold shadow-md transition-all duration-200 hover:bg-slate-600/70 hover:shadow-lg"
						onClick={handleSearch}
						type="button"
					>
						Search
					</button>
				</div>

				<div className="space-y-4">
					{data?.articles.map((article: any) => (
						<div
							className="border border-slate-600/50 bg-slate-800/50 p-6 shadow-lg transition-all duration-300 hover:bg-slate-700/70 hover:shadow-xl"
							key={article.id}
						>
							<h3 className="font-bold text-white text-xl">
								<span
									dangerouslySetInnerHTML={{
										__html: article.highlighted_title,
									}}
								/>
							</h3>
							<p className="text-sm text-white/70">
								{article.author} • {article.year}
							</p>
							<p className="text-sm text-white/70">DOI: {article.doi}</p>
							{article.abstract && (
								<p className="mt-2 text-white/80">{article.abstract}</p>
							)}
							<p className="mt-2 text-cyan-400 text-sm">
								Цитаты: {article.citation_count}
							</p>
						</div>
					))}
				</div>

				{data?.hasMore && (
					<button
						className="mt-6 border border-slate-600/50 bg-slate-700/70 px-6 py-3 font-semibold shadow-md transition-all duration-200 hover:bg-slate-600/70 hover:shadow-lg"
						onClick={() => {
							setOffset(offset + limit);
						}}
						type="button"
					>
						Load More
					</button>
				)}
			</div>
		</div>
	);
}
