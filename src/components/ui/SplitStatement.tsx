import type { ElementType } from "react";

/** Large statement with optional highlighted words. */
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
    <Tag data-reveal className={className}>
      {words.map((word, i) => (
        <span key={i}>
          {highlight.includes(word.replace(/[.,]/g, "")) ? <span className="text-cyan">{word}</span> : word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
