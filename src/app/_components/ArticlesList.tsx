"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import {
	getArticlesSearchInput,
	type SearchState,
	serializeSearchState,
} from "@/lib/searchParams";
import { api } from "@/trpc/react";
import { type Article, ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchSettings } from "./SearchSettings";

interface ArticlesListProps {
	initialState: SearchState;
}

const createSearchHref = (pathname: string, state: SearchState) => {
	const query = serializeSearchState(state);

	return query ? `${pathname}?${query}` : pathname;
};

export const ArticlesList: FC<ArticlesListProps> = ({ initialState }) => {
	const t = useTranslations("HomePage");
	const pathname = usePathname();
	const router = useRouter();
	const [draft, setDraft] = useState<SearchState>(initialState);
	const activeSearch = initialState.search;
	const activeSearchInKey = initialState.searchIn.join(",");
	const activeSort = initialState.sortBy;

	useEffect(() => {
		setDraft((current) => {
			if (
				current.search === activeSearch &&
				current.sortBy === activeSort &&
				current.searchIn.join(",") === activeSearchInKey
			) {
				return current;
			}

			return {
				...current,
				search: activeSearch,
				searchIn: activeSearchInKey.split(",") as SearchState["searchIn"],
				sortBy: activeSort,
			};
		});
	}, [activeSearch, activeSearchInKey, activeSort]);

	const hasSearched = Boolean(initialState.search.trim());
	const searchParams = getArticlesSearchInput(initialState);

	const { data, isLoading, error } = api.scimag.getArticles.useQuery(
		searchParams,
		{ enabled: hasSearched },
	);

	const navigateToSearch = (state: SearchState) => {
		router.push(createSearchHref(pathname, state));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigateToSearch({ ...draft, page: 1 });
	};

	if (error) {
		return (
			<div className="py-8 text-center text-blue-400">
				Ошибка загрузки статей: {error.message}
			</div>
		);
	}

	const previousState = { ...initialState, page: initialState.page - 1 };
	const nextState = { ...initialState, page: initialState.page + 1 };
	const hasPreviousPage = initialState.page > 1;
	const hasNextPage = Boolean(data?.hasMore);

	return (
		<div className="flex w-full max-w-7xl flex-wrap gap-8">
			<aside className="w-full shrink-0 sm:w-56">
				<SearchSettings
					onSearchInChange={(searchIn) =>
						setDraft((current) => ({ ...current, searchIn }))
					}
					onSortByChange={(sortBy) =>
						setDraft((current) => ({ ...current, sortBy }))
					}
					searchIn={draft.searchIn}
					sortBy={draft.sortBy}
				/>
			</aside>

			<div className="w-full min-w-0 flex-1 md:min-w-0 md:flex-1">
				<form className="mb-8" onSubmit={handleSubmit}>
					<div className="flex w-full flex-col gap-3 sm:flex-row">
						<input
							className="flex-1 rounded-md border border-blue-500 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 shadow-blue-200/50 shadow-lg transition-colors focus:border-blue-500 focus:outline-none"
							onChange={(event) =>
								setDraft((current) => ({
									...current,
									search: event.target.value,
								}))
							}
							placeholder={t("searchPlaceholder")}
							type="search"
							value={draft.search}
						/>
						<button
							className="w-full rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow-blue-500/50 shadow-lg transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
							disabled={!draft.search.trim() || isLoading}
							type="submit"
						>
							{isLoading ? t("searching") : t("searchButton")}
						</button>
					</div>
				</form>

				{isLoading && <LoadingSpinner message={t("searching")} />}

				{!isLoading && hasSearched && (
					<>
						<div className="mb-6 text-slate-600">
							{data?.articles?.length === 0 && <p>{t("noResults")}</p>}
						</div>

						<div className="space-y-6">
							{data?.articles.map((article: Article) => (
								<ArticleCard article={article} key={article.id} />
							))}
						</div>

						<div className="mt-8 flex items-center justify-center gap-4">
							<Link
								aria-disabled={!hasPreviousPage}
								className={`rounded-md border border-blue-500 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-blue-50 ${!hasPreviousPage ? "pointer-events-none opacity-50" : ""}`}
								href={createSearchHref(pathname, previousState)}
							>
								{t("prevPage")}
							</Link>

							<span className="text-slate-600">
								{t("page")} {initialState.page}
							</span>

							<Link
								aria-disabled={!hasNextPage}
								className={`rounded-md border border-blue-500 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-blue-50 ${!hasNextPage ? "pointer-events-none opacity-50" : ""}`}
								href={createSearchHref(pathname, nextState)}
							>
								{t("nextPage")}
							</Link>
						</div>
					</>
				)}

				{!hasSearched && (
					<div className="py-16 text-center">
						<p className="text-lg text-slate-500">{t("initialState")}</p>
					</div>
				)}
			</div>
		</div>
	);
};
