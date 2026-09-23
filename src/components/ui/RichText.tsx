import type { RichBlock } from "@/lib/cms/types";

export function RichText({ blocks }: { blocks: RichBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "quote":
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
        }
      })}
    </>
  );
}
