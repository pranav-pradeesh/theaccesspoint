import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-24">
      <div className="container-ap">
        <p className="eyebrow">Error 404</p>
        <h1 className="t-h1 mt-3">Page not found</h1>
        <p className="t-lead mt-4 max-w-lg">The page you are looking for may have moved, or the link may be incorrect.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Go to the home page
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
