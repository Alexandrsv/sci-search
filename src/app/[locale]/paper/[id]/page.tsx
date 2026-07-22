import { notFound } from "next/navigation";
import { PaperView } from "@/app/_components/PaperView";
import { api } from "@/trpc/server";

interface PaperPageProps {
	params: Promise<{ id: string }>;
}

const PaperPage = async ({ params }: PaperPageProps) => {
	const { id } = await params;
	const articleId = Number(id);

	if (!Number.isSafeInteger(articleId) || articleId <= 0) {
		notFound();
	}

	const article = await api.scimag.getArticleById({ id: articleId });

	if (!article) {
		notFound();
	}

	return <PaperView article={article} />;
};

export default PaperPage;
