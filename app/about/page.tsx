import Image from "next/image";
import { getSports } from "@/lib/api";
import { SportDetail } from "@/components/sport-detail";
import { PageHero } from "@/components/page-hero";

const HALLS = [
  { name: "Raffles Hall", abbreviation: "RH", director: "Kavin" },
  { name: "Eusoff Hall", abbreviation: "EH", director: "Amos" },
  { name: "Temasek Hall", abbreviation: "TH", director: "Aqil" },
  { name: "Sheares Hall", abbreviation: "SH", director: "Dom" },
  { name: "Kent Ridge Hall", abbreviation: "KR", director: "Ying Hao" },
  { name: "King Edward VII Hall", abbreviation: "KE7", director: "Celine" },
  {
    name: "Prince George's Park Hall",
    abbreviation: "PH",
    director: "Anabelle",
  },
];

export default async function AboutPage() {
  const sports = await getSports();

  return (
    <div>
      <PageHero image="/headers/about.jpg" className="px-[8%] py-[8%] text-center">
        <h1 className="text-ihg-gold text-[300%] sm:text-[420%] md:text-[600%]">
          ABOUT
        </h1>
        <p className="mx-auto max-w-3xl text-[150%] leading-tight text-white">
          <span className="text-ihg-gold">Inter-Hall Games </span>
          IS AN ANNUAL COMPETITION BETWEEN THE 7 RESIDENTIAL HALLS WITHIN NUS:
          SHEARES, KENT RIDGE, TEMASEK, EUSOFF, RAFFLES, KING EDWARD VII, PGP
          HOUSE. THE COMPETITION CONSISTS OF 17 SPORTS WHERE ATHLETES OF THE
          HALLS COMPETE FOR THE TITLE OF IHG CHAMPIONS.
        </p>
      </PageHero>

      <div className="mx-[8%] space-y-16 py-8">
        {/* Halls of NUS */}
        <section className="grid grid-cols-1 gap-8 border-t pt-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <h2 className="font-heading text-ihg-taupe text-center text-[200%] sm:text-[400%] md:pl-[2%] md:text-left md:text-[350%] lg:text-[450%]">
              HALLS OF NUS
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-y-8 text-center md:col-span-9 md:grid-cols-4">
            {HALLS.map((hall) => (
              <div key={hall.abbreviation}>
                <Image
                  src={`/${hall.abbreviation}.png`}
                  alt="crest"
                  width={418}
                  height={418}
                  className="mx-auto w-3/5"
                />
                <p className="text-ihg-charcoal mt-1 text-[120%]">
                  {hall.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sports Director */}
        <section className="grid grid-cols-1 gap-8 border-t pt-8 md:grid-cols-12">
          <h2 className="font-heading text-ihg-taupe text-center text-[200%] sm:text-[400%] md:hidden">
            SPORTS DIRECTOR
          </h2>
          <div className="grid grid-cols-2 gap-y-8 text-center md:col-span-8 md:grid-cols-4">
            {HALLS.map((hall) => (
              <div key={hall.abbreviation}>
                <Image
                  src={`/directors/${hall.director}.png`}
                  alt="director"
                  width={418}
                  height={418}
                  className="mx-auto w-4/5"
                />
                <p className="text-ihg-charcoal mt-1 text-[120%]">
                  {hall.abbreviation} - {hall.director}
                </p>
              </div>
            ))}
          </div>
          <h2 className="font-heading text-ihg-taupe hidden text-center text-[350%] md:col-span-4 md:block md:pb-[10%] md:text-right lg:text-[450%]">
            SPORTS DIRECTOR
          </h2>
        </section>

        {/* Sports */}
        <section className="border-t pt-8">
          <SportDetail sports={sports} />
        </section>
      </div>
    </div>
  );
}
