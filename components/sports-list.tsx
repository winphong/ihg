"use client";

import type { Sport } from "@/lib/api";
import { cn } from "@/lib/utils";

export function SportsList({
  sports,
  selectedSport,
  onSelectSport,
}: {
  sports: Sport[];
  selectedSport: Sport | undefined;
  onSelectSport: (sport: Sport) => void;
}) {
  const firstColumn = sports.slice(0, 9);
  const secondColumn = sports.slice(9);

  return (
    <div className="grid grid-cols-2">
      {[firstColumn, secondColumn].map((column, columnIndex) => (
        <div key={columnIndex}>
          {column.map((sport) => (
            <p
              key={sport._id ?? sport.name}
              onClick={() => onSelectSport(sport)}
              className={cn(
                "font-heading mb-[2vmax] cursor-pointer text-[140%]",
                selectedSport?.name === sport.name ? "text-ihg-taupe" : "text-ihg-silver"
              )}
            >
              {sport.name}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
