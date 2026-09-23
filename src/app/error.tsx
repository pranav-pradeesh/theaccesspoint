"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-40 pb-24">
      <div className="container-ap">
        <p className="eyebrow">Error</p>
        <h1 className="t-h1 mt-3">Something went wrong</h1>
        <p className="t-lead mt-4 max-w-lg">Please try again. If the problem continues, contact us by phone or email.</p>
        <button type="button" onClick={reset} className="btn btn-primary mt-8">
          Try again
        </button>
      </div>
    </section>
  );
}
