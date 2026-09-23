"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNavigate } from "./TransitionProvider";

type Props = ComponentProps<typeof Link> & { href: string };

/** Drop-in `next/link` that plays the gateway transition for internal navigation. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const navigate = useTransitionNavigate();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      !navigate ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank" ||
      !href.startsWith("/") ||
      href.includes("#") ||
      href.split("?")[0] === pathname
    ) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
