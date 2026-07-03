import { NextResponse } from "next/server";
import databaseConnect from "@/lib/database";
import Schedule, { ScheduleDocument } from "@/entity/Schedule";
import _ from "lodash";
import { addDays, format } from "date-fns";

export async function GET(req: Request) {
  try {
    await databaseConnect();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const date = searchParams.get("date") ?? null;

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(
        new Date(startDate).setDate(new Date(startDate).getDate() + 7)
      );

      const groupedSchedules = await Schedule.aggregate([
        {
          $match: {
            startTime: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $addFields: {
            startDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$startTime" },
            },
          },
        },
        {
          $group: {
            _id: "$startDate",
            schedules: { $push: "$$ROOT" }, // Push all schedules into an array
          },
        },
        {
          $sort: { _id: 1 }, // Sort the grouped data by startDate in descending order
        },
      ]);

      const scheduleMap = groupedSchedules.reduce((acc, { _id, schedules }) => {
        acc[_id] = schedules;
        return acc;
      }, {});

      let currentDate = new Date(startDate);
      const orderedScheduleMap: Record<string, ScheduleDocument[]> = {};
      while (currentDate < endDate) {
        const formattedDate = format(currentDate, "yyyy-MM-dd");
        if (scheduleMap[formattedDate] === undefined) {
          orderedScheduleMap[formattedDate] = [];
        } else {
          orderedScheduleMap[formattedDate] = scheduleMap[formattedDate];
        }

        currentDate = addDays(currentDate, 1);
      }

      return NextResponse.json(orderedScheduleMap, { status: 200 });
    }

    const groupedSchedules = await Schedule.aggregate([
      {
        $addFields: {
          startDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$startTime" },
          },
        },
      },
      {
        $group: {
          _id: "$startDate",
          schedules: { $push: "$$ROOT" }, // Push all schedules into an array
        },
      },
      {
        $sort: { _id: 1 }, // Sort the grouped data by startDate in descending order
      },
    ]);

    const scheduleMap = groupedSchedules.reduce((acc, { _id, schedules }) => {
      acc[_id] = schedules;
      return acc;
    }, {});

    return NextResponse.json(scheduleMap, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
