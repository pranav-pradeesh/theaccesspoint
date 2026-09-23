"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-svh items-center py-32">
      <div className="container-ap text-center">
        <p className="t-micro text-cyan">Error</p>
        <h1 className="t-h1 mx-auto mt-6 max-w-[16ch]">Something went wrong on our side.</h1>
        <p className="t-lead mx-auto mt-6 max-w-lg text-fg-2">Please try again. If it keeps happening, email us and we&apos;ll look into it.</p>
        <button type="button" onClick={reset} className="btn btn-primary btn-lg mt-10">
          Try again
        </button>
      </div>
    </section>
  );
}
