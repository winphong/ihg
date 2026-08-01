import dateformat from "dateformat";
import type { Schedule } from "@/lib/api";
import { ScheduleMatchCard } from "@/components/schedule-match-card";

export function ScheduleDayColumn({
  day,
  schedules,
  prevDayScheduleCount = 0,
}: {
  day: Date;
  schedules: Schedule[];
  prevDayScheduleCount?: number;
}) {
  return (
    <div className="lg:border-ihg-silver flex min-w-0 flex-col items-center gap-6 border-b py-6 last:border-b-0 lg:last:border-r-0">
      <div className="text-center">
        <p className="font-heading text-ihg-charcoal text-lg">
          {dateformat(day, "dd'th' mmm")}
        </p>
        <p className="text-ihg-taupe text-sm italic">
          {dateformat(day, "dddd")}
        </p>
      </div>

      {schedules.length > 0 && (
        <div className="flex w-full flex-col gap-6">
          {schedules.map((schedule, i) => (
            <ScheduleMatchCard
              key={schedule._id ?? i}
              schedule={schedule}
              showLeftBorder={i >= prevDayScheduleCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
