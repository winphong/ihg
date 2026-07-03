import { ScheduleDocument } from "@/entity/Schedule";

export async function fetchSchedules(
  date: string
): Promise<Record<string, ScheduleDocument[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/schedules?date=${date}&device=mobile`,
    {
      // next: {
      //   revalidate: 1000, // Revalidates every 1 minutes
      // },
      cache: "no-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch sports");
  return res.json();
}
