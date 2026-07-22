"use client";

import DOMPurify from "isomorphic-dompurify";
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	FileText,
	Link as LinkIcon,
	Quote,
	Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import type { FC } from "react";
import type { RouterOutputs } from "@/trpc/react";

type PaperArticle = NonNullable<RouterOutputs["scimag"]["getArticleById"]>;

interface PaperViewProps {
	article: PaperArticle;
}

export const PaperView: FC<PaperViewProps> = ({ article }) => {
	const locale = useLocale();
	const router = useRouter();

	const handleBack = () => {
		if (document.referrer.startsWith(window.location.origin)) {
			router.back();
			return;
		}

		router.replace(`/${locale}`);
	};

	return (
		<main className="relative flex min-h-screen flex-col items-center text-slate-900">
			<div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
				<div className="w-full max-w-4xl">
					<button
						className="flex items-center gap-2 text-slate-500 transition-colors hover:text-blue-600"
						onClick={handleBack}
						type="button"
					>
						<ArrowLeft size={20} />
						<span className="font-medium">Back to Search</span>
					</button>
				</div>

				<article className="w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-500 bg-white/80 shadow-blue-200/50 shadow-xl backdrop-blur-sm">
					<div className="border-blue-100 border-b bg-blue-50/50 px-8 py-10 sm:px-12">
						<div className="flex flex-wrap items-start justify-between gap-4">
							<div className="space-y-4">
								<div className="flex items-center gap-3 text-blue-600">
									<BookOpen size={20} />
									<span className="font-medium">
										{article.journal || "Unknown Journal"}
									</span>
								</div>
								<h1
									className="font-bold text-3xl text-slate-900 leading-tight sm:text-4xl"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized with DOMPurify
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(article.title),
									}}
								/>
								<div className="flex items-center gap-3 text-slate-600">
									<Users size={18} />
									<span className="text-lg">{article.author}</span>
								</div>
							</div>
							{article.citation_count != null && (
								<div className="flex flex-col items-center rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-blue-100">
									<span className="font-bold text-2xl text-blue-600">
										{article.citation_count}
									</span>
									<span className="text-slate-500 text-xs">Citations</span>
								</div>
							)}
						</div>
					</div>

					<div className="px-8 py-10 sm:px-12">
						<div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
							<div className="space-y-1">
								<div className="flex items-center gap-2 text-slate-400">
									<Calendar size={16} />
									<span className="font-medium text-sm uppercase tracking-wider">
										Date
									</span>
								</div>
								<p className="font-semibold text-slate-700">
									{article.year}
									{article.month ? `-${article.month}` : ""}
									{article.day ? `-${article.day}` : ""}
								</p>
							</div>
							{article.volume && (
								<div className="space-y-1">
									<div className="flex items-center gap-2 text-slate-400">
										<FileText size={16} />
										<span className="font-medium text-sm uppercase tracking-wider">
											Volume
										</span>
									</div>
									<p className="font-semibold text-slate-700">
										{article.volume}
									</p>
								</div>
							)}
							{article.issue && (
								<div className="space-y-1">
									<div className="flex items-center gap-2 text-slate-400">
										<FileText size={16} />
										<span className="font-medium text-sm uppercase tracking-wider">
											Issue
										</span>
									</div>
									<p className="font-semibold text-slate-700">
										{article.issue}
									</p>
								</div>
							)}
							{article.doi && (
								<div className="col-span-2 space-y-1 sm:col-span-1">
									<div className="flex items-center gap-2 text-slate-400">
										<LinkIcon size={16} />
										<span className="font-medium text-sm uppercase tracking-wider">
											DOI
										</span>
									</div>
									<a
										className="block truncate font-semibold text-blue-600 hover:underline"
										href={`https://doi.org/${article.doi}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										{article.doi}
									</a>
								</div>
							)}
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-2 text-slate-900">
								<Quote className="text-blue-500" size={24} />
								<h2 className="font-bold text-xl">Abstract</h2>
							</div>
							<div
								className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized with DOMPurify
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										article.abstract || "No abstract available.",
									),
								}}
							/>
						</div>

						<div className="mt-12 flex flex-wrap gap-4 border-slate-100 border-t pt-8">
							{article.pubmedid && (
								<div className="rounded-full bg-blue-50 px-4 py-1 font-medium text-blue-700 text-sm ring-1 ring-blue-200">
									PMID: {article.pubmedid}
								</div>
							)}
							{article.pmc && (
								<div className="rounded-full bg-blue-50 px-4 py-1 font-medium text-blue-700 text-sm ring-1 ring-blue-200">
									PMC: {article.pmc}
								</div>
							)}
							{article.issne && (
								<div className="rounded-full bg-blue-50 px-4 py-1 font-medium text-blue-700 text-sm ring-1 ring-blue-200">
									ISSN: {article.issne}
								</div>
							)}
						</div>
					</div>
				</article>
			</div>
		</main>
	);
};
