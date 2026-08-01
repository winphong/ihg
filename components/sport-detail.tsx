"use client";

import { useState } from "react";
import Image from "next/image";
import { SportsList } from "@/components/sports-list";
import type { Sport } from "@/lib/api";
import { cn } from "@/lib/utils";

export function SportDetail({ sports }: { sports: Sport[] }) {
  const [selectedSport, setSelectedSport] = useState<Sport | undefined>(sports[0]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      <div className="md:col-span-4">
        <div className="hidden md:block">
          <SportsList sports={sports} selectedSport={selectedSport} onSelectSport={setSelectedSport} />
        </div>
        <div className="flex gap-6 overflow-x-scroll pb-4 md:hidden">
          {sports.map((sport) => (
            <p
              key={sport._id ?? sport.name}
              onClick={() => setSelectedSport(sport)}
              className={cn(
                "font-heading shrink-0 cursor-pointer text-[120%]",
                selectedSport?.name === sport.name ? "text-ihg-gold" : "text-ihg-silver"
              )}
            >
              {sport.name}
            </p>
          ))}
        </div>
        <h2 className="font-heading text-ihg-taupe mt-4 text-[200%] sm:text-[400%] md:text-[350%] lg:text-[450%]">
          SPORTS
        </h2>
      </div>

      <div className="md:col-span-8">
        {selectedSport && (
          <div className="flex flex-col md:w-[55%] md:pl-[5%]">
            <Image
              src={`/sports/${selectedSport.imgUrl}`}
              alt={selectedSport.name}
              width={1600}
              height={900}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="w-full"
            />
            <p className="text-ihg-charcoal mt-2 text-[80%] md:text-[120%]">
              {selectedSport.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
