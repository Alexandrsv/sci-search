import Link from "next/link";

import { ArticlesList } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  void api.scimag.getArticles.prefetch({ limit: 10, offset: 0 });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem] drop-shadow-lg">
            Sci <span className="text-cyan-400 drop-shadow-md">Search</span>
          </h1>

          <ArticlesList />
        </div>
      </main>
    </HydrateClient>
  );
}
