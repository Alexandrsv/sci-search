import { ArticlesList } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
	// Prefetch initial articles for better performance
	void api.scimag.getArticles.prefetch({ limit: 10, offset: 0 });

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<header className="text-center">
						<h1 className="font-extrabold text-5xl tracking-tight drop-shadow-lg sm:text-[5rem]">
							Sci <span className="text-cyan-400 drop-shadow-md">Search</span>
						</h1>
						<p className="mt-4 text-lg text-slate-300">
							Поиск научных статей в базе данных
						</p>
					</header>

					{/* Search and Results Section */}
					<section className="w-full max-w-7xl">
						<ArticlesList />
					</section>
				</div>
			</main>
		</HydrateClient>
	);
}
