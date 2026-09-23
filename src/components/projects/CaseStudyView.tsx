"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

export function CaseStudyView({ slug }: { slug: string }) {
  useEffect(() => track("Case Study View", { slug }), [slug]);
  return null;
}
