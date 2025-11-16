interface Article {
	id: number;
	doi: string;
	title: string;
	author: string;
	year: number;
	abstract?: string;
	citation_count: number;
	highlighted_title: string;
	highlighted_abstract?: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
	return (
		<div className="rounded-lg border border-slate-600/50 bg-slate-800/50 p-6 shadow-lg transition-all duration-300 hover:bg-slate-700/70 hover:shadow-xl">
			<h3 className="mb-2 font-bold text-white text-xl">
				<span
					dangerouslySetInnerHTML={{
						__html: article.highlighted_title,
					}}
				/>
			</h3>

			<div className="space-y-2 text-slate-300 text-sm">
				<p>
					<span className="font-medium">Автор:</span> {article.author}
				</p>
				<p>
					<span className="font-medium">Год:</span> {article.year}
				</p>
				<p>
					<span className="font-medium">DOI:</span> {article.doi}
				</p>
				<p>
					<span className="font-medium text-cyan-400">Цитаты:</span>{" "}
					{article.citation_count}
				</p>
			</div>

			{article.abstract && (
				<div className="mt-4">
					<h4 className="mb-2 font-medium text-white">Аннотация:</h4>
					<p
						className="text-slate-200 leading-relaxed"
						dangerouslySetInnerHTML={{
							__html: article.highlighted_abstract || article.abstract,
						}}
					/>
				</div>
			)}
		</div>
	);
};

export { ArticleCard, type Article };
