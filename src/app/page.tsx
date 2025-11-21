import { SiGithub, SiReact } from "@icons-pack/react-simple-icons";
import { ArticlesList } from "@/app/_components/ArticlesList";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="relative flex min-h-screen flex-col items-center text-slate-900">
				<div className="absolute top-4 right-4 text-slate-400">
					<a
						className="text-blue-500 hover:underline"
						href="https://github.com/Alexandrsv/sci-search"
						rel="noopener noreferrer"
						target="_blank"
					>
						<SiGithub className="text-blue-500" size={24} />
					</a>
				</div>
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<header className="text-center">
						<h1 className="font-extrabold text-5xl tracking-tight drop-shadow-sm sm:text-[5rem]">
							Sci <span className="text-blue-500 drop-shadow-sm">Search</span>
						</h1>
						<p className="mt-4 text-lg text-slate-600">
							Полнотекстовый поиск по <b>81&nbsp;903&nbsp;411</b> публикациям
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
