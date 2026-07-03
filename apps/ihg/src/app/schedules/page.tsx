import { redirect } from "next/navigation";

export default async function ScheduleRedirect() {
  const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD
  redirect(`/schedules/${today}`);
}
