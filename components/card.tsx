import dateformat from "dateformat";
import Image from "next/image";
import type { Schedule } from "@/lib/api";
import { cn } from "@/lib/utils";

const containerVariants = {
  center: "p-[1%]",
};

export function Card({
  schedule,
  white,
}: {
  schedule: Schedule;
  white?: boolean;
}) {
  const halls = schedule.halls;
  const hasHalls = halls.length > 0;

  const hallTextClass = cn(
    "font-heading text-[140%] sm:text-[130%] md:text-[170%] leading-none",
    white && "text-ihg-bg",
  );

  const descriptionClass = cn(
    "mt-[1%] leading-none text-[#808080]",
    "text-[130%] sm:text-[120%] md:text-[130%]",
    white && "text-ihg-bg",
  );

  return (
    <div className={cn("text-center p-[1%]")}>
      {halls.length <= 2 && (
        <>
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <Image
                src={hasHalls ? halls[0].imgUrl : "/blank.png"}
                alt="hall-1"
                width={418}
                height={418}
                className="w-[90%]"
              />
            </div>
            <div className="col-span-2" />
            <div className="col-span-5">
              <Image
                src={hasHalls ? halls[1].imgUrl : "/blank.png"}
                alt="hall-2"
                width={418}
                height={418}
                className="w-[90%]"
              />
            </div>
          </div>
          <div className="grid h-10 grid-cols-12 items-center sm:h-10 md:h-20">
            <div className="col-span-5">
              <p className={hallTextClass}>
                {hasHalls ? halls[0].name.toUpperCase() : "TBA"}
              </p>
            </div>
            <div className="col-span-2" />
            <div className="col-span-5">
              <p className={hallTextClass}>
                {hasHalls ? halls[1].name.toUpperCase() : "TBA"}
              </p>
            </div>
          </div>
        </>
      )}

      {halls.length === 6 && (
        <div className="grid grid-cols-12">
          {halls.map((hall, index) => (
            <div key={index} className="col-span-4">
              <Image
                src={hall.imgUrl}
                alt="hall-img"
                width={418}
                height={418}
                className="w-[55%]"
              />
            </div>
          ))}
        </div>
      )}

      {halls.length === 7 && (
        <div className="grid grid-cols-12">
          {halls.slice(0, 4).map((hall, index) => (
            <div key={index} className="col-span-3">
              <Image
                src={hall.imgUrl}
                alt="hall-img"
                width={418}
                height={418}
                className="w-[70%]"
              />
            </div>
          ))}
          <div className="col-span-4">
            <Image
              src={halls[4].imgUrl}
              alt="hall-img"
              width={418}
              height={418}
              className="ml-[46%] w-[60%]"
            />
          </div>
          <div className="col-span-4">
            <Image
              src={halls[5].imgUrl}
              alt="hall-img"
              width={418}
              height={418}
              className="w-[60%]"
            />
          </div>
          <div className="col-span-4">
            <Image
              src={halls[6].imgUrl}
              alt="hall-img"
              width={418}
              height={418}
              className="ml-[-46%] w-[60%]"
            />
          </div>
        </div>
      )}

      {halls.length > 2 && (
        <div className="flex h-10 items-center sm:h-10 md:h-20">
          {halls.map((hall, index) => (
            <div key={index} className="flex-1">
              <p className={hallTextClass}>{hall.abbreviation}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className={cn("leading-none", "text-lg sm:text-xl md:text-2xl")}>
          {schedule.sport.toUpperCase()} ({schedule.gender.substring(0, 1)}){" "}
          {schedule.stage.toUpperCase()}
        </p>
        <p className={descriptionClass}>
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h', ")}
        </p>
        <p className={descriptionClass}>{schedule.venue}</p>
      </div>
    </div>
  );
}
