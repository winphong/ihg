"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

function ChevronOrSpinner({ direction }: { direction: "prev" | "next" }) {
  const { pending } = useLinkStatus();

  if (pending) {
    return <Loader2 className="text-ihg-gold h-6 w-6 animate-spin" />;
  }

  return direction === "prev" ? (
    <ChevronLeft className="text-ihg-gold h-6 w-6" />
  ) : (
    <ChevronRight className="text-ihg-gold h-6 w-6" />
  );
}

export function WeekNavLink({
  href,
  direction,
  ariaLabel,
}: {
  href: string;
  direction: "prev" | "next";
  ariaLabel: string;
}) {
  return (
    <Link href={href} aria-label={ariaLabel} scroll={false}>
      <ChevronOrSpinner direction={direction} />
    </Link>
  );
}
