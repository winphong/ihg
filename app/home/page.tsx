import Link from "next/link";
import { getHalls, getUpcomingSchedules } from "@/lib/api";
import { UpcomingScheduleCarousel } from "@/components/upcoming-schedule-carousel";
import { ResultBarHorizontal } from "@/components/result-bar-horizontal";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Fetches the Go API same-origin, which isn't reachable yet during this
// deployment's own build - force request-time rendering so it only ever
// fetches once the deployment is live.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const academicYear = process.env.ACADEMIC_YEAR ?? "";
  const [schedules, halls] = await Promise.all([
    getUpcomingSchedules(new Date()),
    getHalls(),
  ]);

  return (
    <div>
      <PageHero
        image="/headers/home.jpg"
        className="flex h-[45vmax] items-center px-[8%]"
      >
        <div>
          <h1 className="text-ihg-gold font-heading text-[300%] leading-tight sm:text-[450%] md:text-[650%] lg:text-[800%]">
            INTER-HALL
          </h1>
          <h1 className="text-ihg-gold font-heading text-[300%] leading-tight sm:text-[450%] md:text-[650%] lg:text-[800%]">
            GAMES
          </h1>
          <h1 className="text-[300%] leading-tight text-white sm:text-[450%] md:text-[650%] lg:text-[800%]">
            {academicYear}
          </h1>
        </div>
      </PageHero>

      <section className="pt-[4%] md:pt-[2%] px-[6vw] lg:px-[10vw]">
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-ihg-gold text-[180%] sm:text-[400%] lg:text-[450%]">
            UPCOMING GAMES
          </h2>
          <Link
            href="/schedule"
            className={cn(
              buttonVariants(),
              "bg-ihg-gold text-white hover:bg-ihg-gold/90",
            )}
          >
            VIEW SCHEDULE
          </Link>
        </div>
        <UpcomingScheduleCarousel schedules={schedules} />
      </section>

      <section className="mt-[10%] px-[6vw] pb-16 lg:px-[7vw]">
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-ihg-gold text-[180%] sm:text-[400%] lg:text-[450%]">
            CURRENT STANDINGS
          </h2>
          <Link
            href="/results"
            className={cn(
              buttonVariants(),
              "bg-ihg-gold text-white hover:bg-ihg-gold/90",
            )}
          >
            VIEW RESULT
          </Link>
        </div>
        <ResultBarHorizontal halls={halls} />
      </section>
    </div>
  );
}
