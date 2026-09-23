import Link from "next/link";
import { GatewayMark } from "./GatewayMark";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="The Access Point home">
      <span className="block size-8 shrink-0">
        <GatewayMark className="size-full overflow-visible" />
      </span>
      <span className="text-[15px] font-bold tracking-[-0.01em] text-fg">The Access Point</span>
    </Link>
  );
}
