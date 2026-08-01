import dateformat from "dateformat";
import type { Schedule } from "@/lib/api";
import { cn } from "@/lib/utils";

const GENDERED_SPORTS = ["Floorball", "Swimming", "Touch Rugby", "Road Relay", "Soccer"];

const POSITION_SUFFIX = ["st", "nd", "rd"];

export function ResultRowCarnival({
  schedule,
  byDate,
}: {
  schedule: Schedule;
  byDate: boolean;
}) {
  const sortedHalls = [...schedule.halls].sort((a, b) => {
    if (schedule.halls[0]?.score != null) {
      return (a.score ?? 0) - (b.score ?? 0);
    }
    return a.name >= b.name ? 1 : -1;
  });

  const dateFormat = byDate ? "HHMM'h'" : "dd mmm', ' HHMM'h'";
  const gender = schedule.gender.substring(0, 1);
  const showGender = GENDERED_SPORTS.includes(schedule.sport);

  return (
    <div className="py-2">
      <div className="ml-[2%] flex w-1/3 gap-1 sm:w-1/6">
        {sortedHalls.map((hall) => (
          <div
            key={hall.abbreviation}
            className="h-[5px] flex-1"
            style={{
              backgroundColor: hall.colourCode,
              border: hall.colourCode === "#ffffff" ? "1px solid black" : undefined,
            }}
          />
        ))}
      </div>

      <div className="my-1 flex flex-wrap items-center">
        <div className="w-1/2 pl-[2%] sm:w-1/3 md:w-1/4">
          <p className="text-ihg-charcoal text-[80%] font-bold sm:text-[90%]">
            {schedule.sport} {showGender && `(${gender})`} {schedule.stage}
          </p>
          <p className="text-ihg-taupe hidden text-[100%] italic sm:block">
            {dateformat(new Date(schedule.startTime), dateFormat)}, {schedule.venue}
          </p>
        </div>
        <div className="w-1/2 sm:hidden">
          <p className="text-ihg-taupe text-[80%] italic">
            {dateformat(new Date(schedule.startTime), dateFormat)}, {schedule.venue}
          </p>
        </div>

        <div className="flex flex-1 flex-wrap justify-around text-center">
          {sortedHalls.map((hall, index) => (
            <p
              key={hall.abbreviation}
              className={cn(
                "text-[70%] font-bold sm:text-[90%]",
                hall.score != null && index === 0 ? "text-ihg-charcoal" : "text-ihg-taupe"
              )}
            >
              {hall.abbreviation}
              {hall.score != null && (
                <span className="block">
                  {hall.score}
                  {POSITION_SUFFIX[index] ?? "th"}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
