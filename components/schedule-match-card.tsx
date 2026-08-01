import dateformat from "dateformat";
import type { Schedule } from "@/lib/api";
import { cn } from "@/lib/utils";

export function ScheduleMatchCard({
  schedule,
  showLeftBorder,
}: {
  schedule: Schedule;
  showLeftBorder: boolean;
}) {
  const { halls, sport, gender, stage, startTime, venue } = schedule;

  return (
    <div className="border-ihg-gold/60 relative text-center min-h-[154px]">
      <div className="mb-3 flex h-1.5 w-full overflow-hidden rounded-full">
        {halls.map((hall, i) => (
          <div
            key={i}
            className="h-full flex-1"
            style={{
              backgroundColor: hall.colourCode,
              boxShadow:
                hall.colourCode === "#ffffff"
                  ? "inset 0 0 0 1px #25252740"
                  : undefined,
            }}
          />
        ))}
      </div>

      {showLeftBorder && (
        <div className="absolute top-[24%] right-[5%] hidden h-[65%] w-full border-l-2 border-ihg-gold/60 lg:block" />
      )}
      <div className="absolute top-[24%] left-[5%] hidden h-[65%] w-full border-r-2 border-ihg-gold/60 lg:block" />

      <div className="px-4 pb-2">
        {halls.length === 2 ? (
          <p className="font-heading text-lg">
            {halls[0].abbreviation}
            <span className="text-ihg-taupe mx-2 text-xs font-normal">vs</span>
            {halls[1].abbreviation}
          </p>
        ) : (
          <div
            className={cn(
              "font-heading flex flex-nowrap justify-center gap-x-1 tracking-tighter",
              halls.length === 7 && "text-[90%]",
            )}
          >
            {halls.map((hall, i) => (
              <span key={i}>{hall.abbreviation}</span>
            ))}
          </div>
        )}

        <p className="text-ihg-taupe mt-1 whitespace-nowrap">
          {sport} ({gender.substring(0, 1)})
          <br />
          <span className="font-semibold">{stage}</span>
        </p>

        <p className="text-ihg-taupe/80 mt-1 text-sm whitespace-nowrap italic">
          {dateformat(new Date(startTime), "dd'th' mmm, HHMM'h', ")}
        </p>

        <p className="text-ihg-taupe/80 mt-1 text-sm whitespace-nowrap italic">
          {venue}
        </p>
      </div>
    </div>
  );
}
