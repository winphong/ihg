import { fetchSchedules } from "@/services/schedule";
import ScheduleGrid from "@/components/ScheduleGrid";

export default async function SchedulePage({
  params,
}: {
  params: { date: string };
}) {
  const schedulesByDay = await fetchSchedules(params.date);

  return <ScheduleGrid schedulesByDay={schedulesByDay} date={params.date} />;
}

// ✅ Enable ISR (Revalidate every 60 seconds)
export const revalidate = 60;
