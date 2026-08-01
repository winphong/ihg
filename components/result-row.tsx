import dateformat from "dateformat";
import type { Schedule } from "@/lib/api";
import { cn } from "@/lib/utils";

export function ResultRow({
  schedule,
  byDate,
}: {
  schedule: Schedule;
  byDate: boolean;
}) {
  const hasHalls = schedule.halls.length > 0;
  const [hall0, hall1] = schedule.halls;

  const hasScore =
    hasHalls &&
    hall0.score != null &&
    hall1.score != null &&
    hall0.score !== hall1.score;
  const firstWinner = hasHalls && hasScore && hall0.score! > hall1.score!;

  const dateFormat = byDate ? "HHMM'h'" : "dd mmm', ' HHMM'h'";
  const gender = schedule.gender.substring(0, 1);

  const barStyle = (colourCode?: string) => ({
    backgroundColor: colourCode ?? "#C8B06B",
    border: colourCode === "#ffffff" ? "1px solid black" : undefined,
  });

  return (
    <div className="py-2">
      <div className="ml-[2%] flex w-1/4 sm:w-1/6">
        <div className="h-[5px] flex-1" style={barStyle(hall0?.colourCode)} />
        <div className="h-[5px] flex-1" style={barStyle(hall1?.colourCode)} />
      </div>

      <div className="my-1 flex flex-wrap items-center">
        <div className="w-1/2 pl-[2%] sm:w-1/3 md:w-1/4">
          <p className="text-ihg-charcoal text-[80%] font-bold sm:text-[90%]">
            {schedule.sport} ({gender}) {schedule.stage}
          </p>
          <p className="text-ihg-taupe hidden text-[100%] italic sm:block">
            {dateformat(new Date(schedule.startTime), dateFormat)},{" "}
            {schedule.venue}
          </p>
        </div>
        <div className="w-1/2 sm:hidden">
          <p className="text-ihg-taupe text-[80%] italic">
            {dateformat(new Date(schedule.startTime), dateFormat)},{" "}
            {schedule.venue}
          </p>
        </div>

        <div className="flex flex-1 items-center justify-around text-center">
          <p
            className={cn(
              "text-[70%] font-bold sm:text-[90%]",
              hasScore && firstWinner ? "text-ihg-charcoal" : "text-ihg-taupe",
            )}
          >
            {hasHalls ? hall0.abbreviation : "TBA"}
          </p>
          <p
            className={cn(
              "text-[70%] font-bold sm:text-[90%]",
              hasScore && firstWinner ? "text-ihg-charcoal" : "text-ihg-taupe",
            )}
          >
            {hasHalls ? hall0.score : ""}
          </p>
          <p className="text-ihg-taupe text-[70%] sm:text-[90%]"> - </p>
          <p
            className={cn(
              "text-[70%] font-bold sm:text-[90%]",
              hasScore && !firstWinner ? "text-ihg-charcoal" : "text-ihg-taupe",
            )}
          >
            {hasHalls ? hall1.score : ""}
          </p>
          <p
            className={cn(
              "text-[70%] font-bold sm:text-[90%]",
              hasScore && !firstWinner ? "text-ihg-charcoal" : "text-ihg-taupe",
            )}
          >
            {hasHalls ? hall1.abbreviation : "TBA"}
          </p>
        </div>
      </div>
    </div>
  );
}
