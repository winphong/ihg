"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTopButton() {
  console.log("back to top");
  return (
    <Button
      variant="ghost"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-ihg-silver hover:text-ihg-silver hover:bg-transparent"
    >
      <ChevronUp className="size-4" />
      <span className="font-heading text-sm sm:text-base md:text-lg">
        BACK TO TOP
      </span>
    </Button>
  );
}
