"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import type { Schedule } from "@/lib/api";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 4;

export function UpcomingScheduleCarousel({
  schedules,
}: {
  schedules: Schedule[];
}) {
  const [index, setIndex] = useState(0);
  const visible = schedules.slice(index, index + PAGE_SIZE);

  return (
    <div>
      {/* Desktop: paginated 2x2 grid */}
      <div className="hidden items-center gap-4 lg:flex">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIndex((i) => Math.max(0, i - PAGE_SIZE))}
          disabled={index === 0}
          aria-label="Previous"
        >
          <ChevronLeft />
        </Button>
        <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6">
          {visible.map((schedule, i) => (
            <div
              key={schedule._id ?? i}
              className={cn(i < 2 && "border-ihg-gold border-b pb-6")}
            >
              <Card schedule={schedule} />
            </div>
          ))}
          {visible.length === 0 && (
            <p className="text-ihg-taupe col-span-2 text-center">
              No upcoming games.
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setIndex((i) =>
              i + PAGE_SIZE >= schedules.length ? i : i + PAGE_SIZE,
            )
          }
          disabled={index + PAGE_SIZE >= schedules.length}
          aria-label="Next"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Mobile: horizontal scroll, all schedules */}
      <div className="flex gap-4 overflow-x-scroll pb-4 lg:hidden">
        {schedules.length === 0 && (
          <p className="text-ihg-taupe">No upcoming games.</p>
        )}
        {schedules.map((schedule, i) => (
          <div
            key={schedule._id ?? i}
            className="w-[70vw] auto max-w-sm shrink-0"
          >
            <Card schedule={schedule} />
          </div>
        ))}
      </div>
    </div>
  );
}
