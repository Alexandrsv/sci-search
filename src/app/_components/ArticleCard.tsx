"use client";

import DOMPurify from "dompurify";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { CopyButton } from "./CopyButton";

interface Article {
	id: number;
	doi: string;
	title: string;
	author: string;
	year: string;
	abstract?: string;
	citation_count: number;
	highlighted_title: string;
	highlighted_abstract?: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
	const t = useTranslations("ArticleCard");
	const locale = useLocale();

	return (
		<div className="group relative rounded-lg border border-blue-500 bg-white/80 p-6 shadow-blue-200/50 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-lg">
			<Link
				className="absolute inset-0 z-0"
				href={`/${locale}/paper/${article.id}`}
			/>
			<h3 className="pointer-events-none relative z-10 mb-2 font-bold text-slate-900 text-xl">
				<span
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content from backend
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(article.highlighted_title),
					}}
				/>
			</h3>

			<div className="pointer-events-none relative z-10 space-y-2 text-slate-600 text-sm">
				<p>
					<span className="font-medium">{t("author")}</span> {article.author}
				</p>
				<p>
					<span className="font-medium">{t("year")}</span> {article.year}
				</p>
				<p className="pointer-events-auto flex w-full grid-cols-2 items-center">
					<span className="inline-flex font-medium">{t("doi")}</span>
					<CopyButton
						className="relative z-20 w-full truncate whitespace-nowrap"
						text={article.doi}
					>
						<span className="inline-block w-min shrink truncate whitespace-nowrap">
							{article.doi}
						</span>
					</CopyButton>
				</p>
				<p>
					<span className="font-medium text-blue-600">
						{t("citationCount")}
					</span>{" "}
					{article.citation_count}
				</p>
			</div>

			{article.abstract && (
				<div className="pointer-events-none relative z-10 mt-4">
					<h4 className="mb-2 font-medium text-slate-900">{t("abstract")}</h4>
					<p
						className="text-slate-700 leading-relaxed"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content from backend
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(
								article.highlighted_abstract || article.abstract,
							),
						}}
					/>
				</div>
			)}
		</div>
	);
};

export { ArticleCard, type Article };
