import dateformat from "dateformat";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSchedulesAsc } from "@/lib/api";
import { ScheduleDayColumn } from "@/components/schedule-day-column";
import { WeekNavLink } from "@/components/week-nav-link";
import { PageHero } from "@/components/page-hero";

function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function weekParam(date: Date) {
  return dateformat(date, "yyyy-mm-dd");
}

const SchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) => {
  const { week } = await searchParams;
  const schedules = await getSchedulesAsc();

  const weekStartTimes = new Set<number>();
  for (const schedule of schedules) {
    weekStartTimes.add(startOfWeek(new Date(schedule.startTime)).getTime());
  }
  const weekStarts = Array.from(weekStartTimes)
    .sort((a, b) => a - b)
    .map((t) => new Date(t));

  let currentWeekStart: Date;
  if (week) {
    currentWeekStart = startOfWeek(new Date(week));
  } else {
    const today = startOfWeek(new Date());
    currentWeekStart =
      weekStarts.find((w) => w.getTime() >= today.getTime()) ??
      weekStarts[weekStarts.length - 1] ??
      today;
  }

  const currentIndex = weekStarts.findIndex(
    (w) => w.getTime() === currentWeekStart.getTime(),
  );
  const weekNumber =
    currentIndex >= 0
      ? currentIndex + 1
      : weekStarts.filter((w) => w.getTime() < currentWeekStart.getTime())
          .length + 1;

  const prevWeekStart =
    [...weekStarts]
      .reverse()
      .find((w) => w.getTime() < currentWeekStart.getTime()) ?? null;
  const nextWeekStart =
    weekStarts.find((w) => w.getTime() > currentWeekStart.getTime()) ?? null;

  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i),
  );
  const schedulesByDay = days.map((day) =>
    schedules.filter((s) => isSameDay(new Date(s.startTime), day)),
  );

  return (
    <div>
      <PageHero image="/headers/schedule.jpg" className="px-[8%] py-[8%] text-center">
        <h1 className="text-ihg-gold text-[300%] sm:text-[420%] md:text-[600%]">
          SCHEDULE
        </h1>
      </PageHero>

      <div className="mx-[4%] py-8 sm:mx-[8%]">
        {schedules.length === 0 ? (
          <p className="text-ihg-taupe text-center">No games scheduled.</p>
        ) : (
          <>
            <div className="mb-10 flex items-center justify-center gap-6">
              {prevWeekStart ? (
                <WeekNavLink
                  href={`/schedule?week=${weekParam(prevWeekStart)}`}
                  direction="prev"
                  ariaLabel="Previous week"
                />
              ) : (
                <ChevronLeft className="text-ihg-gold/30 h-6 w-6" />
              )}
              <h2 className="font-heading text-ihg-gold text-[200%] sm:text-[250%]">
                WEEK of {weekParam(currentWeekStart)}
              </h2>
              {nextWeekStart ? (
                <WeekNavLink
                  href={`/schedule?week=${weekParam(nextWeekStart)}`}
                  direction="next"
                  ariaLabel="Next week"
                />
              ) : (
                <ChevronRight className="text-ihg-gold/30 h-6 w-6" />
              )}
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-7 gap-4">
              {days.map((day, i) => (
                <ScheduleDayColumn
                  key={i}
                  day={day}
                  schedules={schedulesByDay[i]}
                  prevDayScheduleCount={
                    i === 0 ? 0 : schedulesByDay[i - 1].length
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
