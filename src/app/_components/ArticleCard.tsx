"use client";

import DOMPurify from "dompurify";
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
	return (
		<div className="rounded-lg border border-blue-500 bg-white/80 p-6 shadow-blue-200/50 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-lg">
			<h3 className="mb-2 font-bold text-slate-900 text-xl">
				<span
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(article.highlighted_title),
					}}
				/>
			</h3>

			<div className="space-y-2 text-slate-600 text-sm">
				<p>
					<span className="font-medium">Автор:</span> {article.author}
				</p>
				<p>
					<span className="font-medium">Год:</span> {article.year}
				</p>
				<p className="flex w-full grid-cols-2 items-center">
					<span className="inline-flex font-medium">DOI:</span>
					<CopyButton
						className="w-full truncate whitespace-nowrap"
						text={article.doi}
					>
						<span className="inline-block w-min shrink truncate whitespace-nowrap">
							{article.doi}
						</span>
					</CopyButton>
				</p>
				<p>
					<span className="font-medium text-blue-600">
						Вероятная цитируемость:
					</span>{" "}
					{article.citation_count}
				</p>
			</div>

			{article.abstract && (
				<div className="mt-4">
					<h4 className="mb-2 font-medium text-slate-900">Аннотация:</h4>
					<p
						className="text-slate-700 leading-relaxed"
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
