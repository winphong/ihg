"use client";

import ScheduleMatch from "../ScheduleMatch";
import _ from "lodash";
import { ScheduleDocument } from "@/entity/Schedule";
import { format, sub } from "date-fns";
import { useMediaQuery } from "react-responsive";

export default function ScheduleGrid({
  schedulesByDay,
  date,
}: {
  schedulesByDay: Record<string, ScheduleDocument[]>;
  date: string;
}) {
  if (_.isEmpty(schedulesByDay)) {
    return <p>No schedules found for {date}</p>;
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-7 w-full p-4 md:p-6 lg:p-24">
      {_.map(schedulesByDay, (schedules, date) => {
        const dates = Object.keys(schedulesByDay);
        const columnIndex = dates.indexOf(date);

        const schedulesForDayBefore =
          schedulesByDay[
            format(sub(new Date(date), { days: 1 }), "yyyy-MM-dd")
          ];

        return (
          <div key={date} className={columnIndex >= 3 ? "hidden lg:block" : ""}>
            <span className="text-center flex justify-center">{date}</span>
            {schedules.map((schedule, scheduleIdx) => {
              const hasLeftSchedule =
                schedulesForDayBefore?.[scheduleIdx] !== undefined;

              const leftBorder = !hasLeftSchedule;

              return (
                <ScheduleMatch
                  key={schedule._id}
                  schedule={schedule}
                  leftBorder={leftBorder}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
