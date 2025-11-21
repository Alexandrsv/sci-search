import { siGithub } from "simple-icons";
import { ArticlesList } from "@/app/_components/ArticlesList";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="relative flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
				<div className="absolute top-4 right-4 text-slate-400">
					<a
						className="text-cyan-400 hover:underline"
						href="https://github.com/Alexandrsv/sci-search"
						rel="noopener noreferrer"
						target="_blank"
					>
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="inline-block h-6 w-6 fill-current"
						>
							<title>{siGithub.title}</title>
							<path d={siGithub.path} />
						</svg>
					</a>
				</div>
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<header className="text-center">
						<h1 className="font-extrabold text-5xl tracking-tight drop-shadow-lg sm:text-[5rem]">
							Sci <span className="text-cyan-400 drop-shadow-md">Search</span>
						</h1>
						<p className="mt-4 text-lg text-slate-300">
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
