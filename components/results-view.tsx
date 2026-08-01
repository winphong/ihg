"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultBar } from "@/components/result-bar";
import { SportsList } from "@/components/sports-list";
import { ResultsTable } from "@/components/results-table";
import type { Hall, Schedule, Sport } from "@/lib/api";
import { cn } from "@/lib/utils";

// Fixed AY19/20 term weeks, mirroring the hardcoded window in
// pkg/handlers/schedules.go (this migration preserves it verbatim rather
// than genericizing it).
const startDaysOfWeek = [
  new Date("5 Jan 2020"),
  new Date("12 Jan 2020"),
  new Date("19 Jan 2020"),
  new Date("26 Jan 2020"),
  new Date("2 Feb 2020"),
  new Date("9 Feb 2020"),
];

function schedulesInWeek(schedules: Schedule[], startDate: Date) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  return schedules.filter((schedule) => {
    const t = new Date(schedule.startTime);
    return t >= startDate && t < endDate;
  });
}

function currentWeekNum(now: Date) {
  let weekNum = 0;
  for (let i = 1; i < startDaysOfWeek.length; i++) {
    if (now >= startDaysOfWeek[i]) weekNum = i;
  }
  return weekNum;
}

export function ResultsView({
  halls,
  results,
  sports,
}: {
  halls: Hall[];
  results: Schedule[];
  sports: Sport[];
}) {
  const [byDate, setByDate] = useState(true);
  const [selectedSport, setSelectedSport] = useState<Sport | undefined>(
    undefined,
  );
  const [weekNum, setWeekNum] = useState(() => currentWeekNum(new Date()));

  const filteredSchedules = useMemo(() => {
    if (!byDate) {
      if (!selectedSport) return [];
      return results.filter(
        (schedule) => schedule.sport === selectedSport.name,
      );
    }
    return schedulesInWeek(results, startDaysOfWeek[weekNum]);
  }, [byDate, selectedSport, weekNum, results]);

  const handleSortByDate = () => {
    setByDate(true);
    setWeekNum(currentWeekNum(new Date()));
  };

  const handleSortBySport = (sport: Sport) => {
    setByDate(false);
    setSelectedSport(sport);
  };

  return (
    <>
      <section className="px-[6vw] lg:px-[10vw]">
        <div className="hidden items-end gap-6 md:flex">
          <div className="flex-1">
            <ResultBar halls={halls} dataKey="malePoint" />
            <p className="font-heading text-ihg-gold mt-1 text-center text-[160%]">
              MALE
            </p>
          </div>
          <div className="flex-[2]">
            <ResultBar
              halls={halls}
              dataKey="totalPoint"
              height={320}
              barSize={28}
            />
            <p className="font-heading text-ihg-gold mt-1 text-center text-[220%]">
              OVERALL
            </p>
          </div>
          <div className="flex-1">
            <ResultBar halls={halls} dataKey="femalePoint" />
            <p className="font-heading text-ihg-gold mt-1 text-center text-[160%]">
              FEMALE
            </p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-scroll pb-4 md:hidden">
          <div className="w-[260px] shrink-0">
            <ResultBar halls={halls} dataKey="totalPoint" />
            <p className="font-heading text-ihg-gold mt-1 text-center text-[160%]">
              OVERALL
            </p>
          </div>
          <div className="w-[260px] shrink-0">
            <ResultBar halls={halls} dataKey="malePoint" />
            <p className="font-heading text-ihg-gold mt-1 text-center text-[160%]">
              MALE
            </p>
          </div>
          <div className="w-[260px] shrink-0">
            <ResultBar halls={halls} dataKey="femalePoint" />
            <p className="font-heading text-ihg-gold mt-1 text-center text-[160%]">
              FEMALE
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[6%] px-[6vw] pb-16 lg:px-[10vw]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-heading text-ihg-taupe text-[200%] sm:text-[300%] md:text-[280%]">
              RESULTS
            </h2>
            <div className="mt-2 flex gap-6">
              <p
                onClick={handleSortByDate}
                className={cn(
                  "font-heading cursor-pointer text-[130%]",
                  byDate ? "text-ihg-charcoal" : "text-ihg-silver",
                )}
              >
                BY WEEK
              </p>
              <p
                onClick={() => handleSortBySport(selectedSport ?? sports[0])}
                className={cn(
                  "font-heading cursor-pointer text-[130%]",
                  !byDate ? "text-ihg-charcoal" : "text-ihg-silver",
                )}
              >
                BY SPORTS
              </p>
            </div>

            {!byDate && (
              <>
                <div className="mt-6 hidden md:block">
                  <SportsList
                    sports={sports}
                    selectedSport={selectedSport}
                    onSelectSport={handleSortBySport}
                  />
                </div>
                <div className="mt-4 flex gap-6 overflow-x-scroll pb-4 md:hidden">
                  {sports.map((sport) => (
                    <p
                      key={sport._id ?? sport.name}
                      onClick={() => handleSortBySport(sport)}
                      className={cn(
                        "font-heading shrink-0 cursor-pointer text-[120%]",
                        selectedSport?.name === sport.name
                          ? "text-ihg-gold"
                          : "text-ihg-silver",
                      )}
                    >
                      {sport.name}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="md:col-span-8">
            {byDate && (
              <div className="mb-4 flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setWeekNum((w) => Math.max(0, w - 1))}
                  disabled={weekNum === 0}
                  aria-label="Previous week"
                >
                  <ChevronLeft />
                </Button>
                <p className="font-heading text-[200%]">Week {weekNum}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setWeekNum((w) =>
                      Math.min(startDaysOfWeek.length - 1, w + 1),
                    )
                  }
                  disabled={weekNum === startDaysOfWeek.length - 1}
                  aria-label="Next week"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
            <ResultsTable schedules={filteredSchedules} byDate={byDate} />
          </div>
        </div>
      </section>
    </>
  );
}
