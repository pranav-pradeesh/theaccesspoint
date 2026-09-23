import type { Faq } from "@/lib/cms";

/** Questions and answers, always visible so search engines and answer engines can read them. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <div key={f.q} className="py-5">
          <h3 className="text-lg font-semibold">{f.q}</h3>
          <p className="mt-2 max-w-3xl text-fg-2">{f.a}</p>
        </div>
      ))}
    </div>
  );
}
