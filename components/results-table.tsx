import dateformat from "dateformat";
import type { Schedule } from "@/lib/api";
import { ResultRow } from "@/components/result-row";
import { ResultRowCarnival } from "@/components/result-row-carnival";

const ORDINAL_DAYS: Record<number, string> = {
  1: "st",
  2: "nd",
  3: "rd",
  21: "st",
  22: "nd",
  23: "rd",
  31: "st",
};

function formatResultDate(date: Date) {
  const day = date.getDate();
  return `${dateformat(date, "dd")}${ORDINAL_DAYS[day] ?? "th"} ${dateformat(date, "mmm")}`;
}

function Row({ schedule, byDate }: { schedule: Schedule; byDate: boolean }) {
  const isMulti = schedule.stage === "Carnival" || schedule.stage === "Playoffs";
  return isMulti ? (
    <ResultRowCarnival schedule={schedule} byDate={byDate} />
  ) : (
    <ResultRow schedule={schedule} byDate={byDate} />
  );
}

function withDateHeaderFlags(schedules: Schedule[], byDate: boolean) {
  let currentDate = "";
  return schedules.map((schedule) => {
    const dateKey = dateformat(new Date(schedule.startTime), "dd mm");
    const showDateHeader = byDate && dateKey !== currentDate;
    currentDate = dateKey;
    return { schedule, showDateHeader };
  });
}

export function ResultsTable({
  schedules,
  byDate,
}: {
  schedules: Schedule[];
  byDate: boolean;
}) {
  const rows = withDateHeaderFlags(schedules, byDate);

  return (
    <div className="h-[70vmax] overflow-y-scroll md:h-[53vmax] lg:h-[43vmax] xl:h-[39vmax]">
      {schedules.length === 0 && (
        <p className="text-ihg-taupe py-4 text-center text-[120%] italic">
          Results will be available soon
        </p>
      )}
      {rows.map(({ schedule, showDateHeader }, index) => (
        <div key={schedule._id ?? index} className="border-b">
          {showDateHeader && (
            <p className="text-ihg-taupe px-[2%] pt-[3%] pb-[1%] font-bold">
              {formatResultDate(new Date(schedule.startTime))}
            </p>
          )}
          <Row schedule={schedule} byDate={byDate} />
        </div>
      ))}
    </div>
  );
}
