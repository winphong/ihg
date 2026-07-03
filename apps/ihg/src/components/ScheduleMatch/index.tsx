import { ScheduleDocument } from "@/entity/Schedule";
import { format } from "date-fns";

const ScheduleMatch = ({
  schedule,
  leftBorder,
}: {
  schedule: ScheduleDocument;
  leftBorder: boolean;
}) => {
  const { halls } = schedule;
  const isDuelSport = halls.length === 2;
  const isCarnivalSix = halls.length === 6;
  const isCarnivalSeven = halls.length === 7;

  return (
    <section>
      <div
        className="h-[150px] flex flex-col items-center justify-center text-center p-2"
        style={{
          borderRight: "2px solid transparent",
          borderLeft: leftBorder
            ? "2px solid transparent"
            : "" /* Border on the left */,
          borderImageSource:
            "linear-gradient(to bottom, transparent 30%, #C8B06B 30%, #C8B06B 80%, transparent 80%)",
          borderImageSlice: 1,
        }}
      >
        {isDuelSport && (
          <div className={"grid grid-cols-2 w-full sm:px-2"}>
            <HallColorBar halls={schedule.halls} />
          </div>
        )}
        {isCarnivalSix && (
          <div className={"grid grid-cols-6 w-full sm:px-2"}>
            <HallColorBar halls={schedule.halls} />
          </div>
        )}
        {isCarnivalSeven && (
          <div className={"grid grid-cols-7 w-full sm:px-2"}>
            <HallColorBar halls={schedule.halls} />
          </div>
        )}
        <div className="h-[45px] flex justify-center flex-col w-full">
          {isDuelSport && (
            <div className={"grid grid-cols-3 w-full"}>
              <span key={schedule.halls[0].abbreviation}>
                {schedule.halls[0].abbreviation}
              </span>
              <span className="text-xs flex items-center justify-center">
                vs
              </span>
              <span key={schedule.halls[1].abbreviation}>
                {schedule.halls[1].abbreviation}
              </span>
            </div>
          )}
          {isCarnivalSix && (
            <div className={"grid grid-cols-3 w-full"}>
              {schedule.halls.map((hall) => {
                return (
                  <span className="text-xs" key={hall.abbreviation}>
                    {hall.abbreviation}
                  </span>
                );
              })}
            </div>
          )}
          {isCarnivalSeven && (
            <>
              <div className={"grid grid-cols-3 w-full"}>
                {schedule.halls.slice(0, 3).map((hall) => {
                  return (
                    <span className="text-xs" key={hall.abbreviation}>
                      {hall.abbreviation}
                    </span>
                  );
                })}
              </div>
              <div className={"grid grid-cols-4 w-full"}>
                {schedule.halls.slice(3).map((hall) => {
                  return (
                    <span className="text-xs" key={hall.abbreviation}>
                      {hall.abbreviation}
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="text-[#958F87] leading-[1.2] font-medium text-sm lg:text-l">
          <p>
            {schedule.sport} {schedule.gender === "Female" ? "(F)" : "(M)"}
          </p>
          <p>{schedule.stage}</p>
        </div>
        <div className="text-gray-400 leading-none italic text-xs lg:text-xs">
          <p>{format(schedule.startTime, "dd MMM yyyy, hhmm'h'")}</p>
          <p>{schedule.venue}</p>
        </div>
      </div>
    </section>
  );
};

const HallColorBar = ({ halls }: { halls: ScheduleDocument["halls"] }) => {
  return halls.map((hall) => {
    return (
      <div
        key={hall.name}
        style={{
          backgroundColor: hall.colourCode,
          height: 10,
          border:
            hall.colourCode === "#ffffff" ? "0.5px solid #000000" : "none",
        }}
      />
    );
  });
};
export default ScheduleMatch;
