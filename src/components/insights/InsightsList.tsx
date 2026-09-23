"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import type { Article, ArticleCategory } from "@/lib/cms/types";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function InsightsList({ articles, categories }: { articles: Article[]; categories: ArticleCategory[] }) {
  const [filter, setFilter] = useState<ArticleCategory | "All">("All");
  const visible = filter === "All" ? articles : articles.filter((a) => a.category === filter);
  const counts = new Map(categories.map((c) => [c, articles.filter((a) => a.category === c).length]));

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => {
          const count = c === "All" ? articles.length : (counts.get(c) ?? 0);
          return (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              disabled={count === 0}
              onClick={() => setFilter(c)}
              className="btn btn-secondary h-10! px-4! text-sm! disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:border-cyan aria-pressed:bg-cyan/10 aria-pressed:text-fg"
            >
              {c} <span className="font-mono text-xs text-fg-3">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>

      <ul className="mt-12 border-t border-line">
        {visible.map((a) => (
          <li key={a.slug} className="border-b border-line">
            <TransitionLink href={`/insights/${a.slug}`} data-cursor="open" className="group grid gap-4 py-10 lg:grid-cols-12 lg:gap-8">
              <div className="t-micro flex gap-4 text-fg-3 lg:col-span-3 lg:flex-col lg:gap-2">
                <span className="text-cyan">{a.category}</span>
                <time dateTime={a.publishedAt}>{dateFmt.format(new Date(a.publishedAt))}</time>
              </div>
              <div className="lg:col-span-7">
                <h2 className="t-h3 transition-colors duration-300 group-hover:text-cyan">{a.title}</h2>
                <p className="mt-3 text-fg-2">{a.excerpt}</p>
              </div>
              <div className="flex items-start justify-between lg:col-span-2 lg:flex-col lg:items-end">
                <span className="t-micro text-fg-3">{a.readingMinutes} min read</span>
                <span aria-hidden className="text-2xl transition-transform duration-500 ease-[var(--ease-access)] group-hover:translate-x-2">
                  →
                </span>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </>
  );
}
