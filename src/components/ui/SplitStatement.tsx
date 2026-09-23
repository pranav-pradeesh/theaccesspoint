import type { ElementType } from "react";

/** Server-rendered words that light up on scroll (wired by MotionController via data-split). */
export function SplitStatement({
  text,
  as: Tag = "p",
  className = "",
  highlight = [],
}: {
  text: string;
  as?: ElementType;
  className?: string;
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <Tag data-split className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span data-word className={highlight.includes(word.replace(/[.,]/g, "")) ? "text-cyan" : undefined}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
