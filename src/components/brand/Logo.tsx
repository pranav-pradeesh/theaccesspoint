import Link from "next/link";
import { GatewayMark } from "./GatewayMark";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="block size-9 shrink-0">
        <GatewayMark className="size-full overflow-visible" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-[-0.02em] text-fg">THE ACCESS POINT</span>
        <span
          className={`t-micro mt-1 text-[10px]! text-fg-2 transition-all duration-300 ${compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100"}`}
        >
          Gateway to Knowledge
        </span>
        <span className="sr-only"> — home</span>
      </span>
    </Link>
  );
}
