import { getHalls, getResults, getSports } from "@/lib/api";
import { ResultsView } from "@/components/results-view";
import { PageHero } from "@/components/page-hero";

export default async function ResultsPage() {
  const [halls, results, sports] = await Promise.all([
    getHalls(),
    getResults(),
    getSports(),
  ]);

  return (
    <div>
      <PageHero
        image="/headers/results.jpg"
        className="flex h-[24vmax] items-center justify-center px-[8%]"
        imageClassName="object-[center_15%]"
      >
        <h1 className="text-ihg-gold font-heading text-center text-[300%] sm:text-[420%] md:text-[600%]">
          RANKING
        </h1>
      </PageHero>

      <ResultsView halls={halls} results={results} sports={sports} />
    </div>
  );
}
