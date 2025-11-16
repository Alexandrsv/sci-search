"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function ArticlesList() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, isLoading } = api.post.getArticles.useQuery({
    search: search || undefined,
    limit,
    offset,
  });

  const utils = api.useUtils();

  const handleSearch = () => {
    setOffset(0);
    utils.post.getArticles.invalidate();
  };

  if (isLoading) {
    return <div className="text-white">Loading articles...</div>;
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <input
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder-white/50"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          type="text"
          value={search}
        />
        <button
          className="mt-2 rounded-full bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20"
          onClick={handleSearch}
          type="button"
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        {data?.articles.map((article) => (
          <div
            key={article.id}
            className="rounded-xl bg-white/10 p-4 hover:bg-white/20"
          >
            <h3 className="font-bold text-xl text-white">{article.title}</h3>
            <p className="text-sm text-white/70">
              {article.author} • {article.year}-{article.month}-{article.day}
            </p>
            <p className="text-sm text-white/70">{article.journal}</p>
            <p className="text-sm text-white/70">DOI: {article.doi}</p>
            {article.abstract && (
              <p className="mt-2 text-white/80">{article.abstract}</p>
            )}
          </div>
        ))}
      </div>

      {data?.hasMore && (
        <button
          className="mt-4 rounded-full bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20"
          onClick={() => {
            setOffset(offset + limit);
          }}
          type="button"
        >
          Load More
        </button>
      )}
    </div>
  );
}
