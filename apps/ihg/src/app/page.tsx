import SportCard from "../components/MatchCard";

import localFont from "next/font/local";

// Define the font with different weights/styles
const TheNextFont = localFont({
  src: [
    {
      path: "../../public/fonts/TheNextFont.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-the-next", // Optional: CSS variable for Tailwind integration
  display: "swap", // Improves font loading behavior
});

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */

  return (
    <div className={TheNextFont.className}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome" className="flex flex-row overflow-x-scroll">
            <SportCard
              sport={{
                halls: [
                  { name: "SH" },
                  { name: "RH" },
                  { name: "TH" },
                  { name: "EH" },
                  { name: "KE7" },
                  { name: "KR" },
                ],
                name: "Floorball",
              }}
            />
            <SportCard
              sport={{
                halls: [{ name: "SH" }, { name: "KR" }],
                name: "Badminton",
              }}
            />
            <SportCard
              sport={{
                halls: [
                  { name: "SH" },
                  { name: "RH" },
                  { name: "TH" },
                  { name: "EH" },
                  { name: "KE7" },
                  { name: "KR" },
                  { name: "PH" },
                ],
                name: "Floorball",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
