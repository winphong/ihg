import Image from "next/image";
import { BackToTopButton } from "@/components/back-to-top-button";

export function Footer() {
  const academicYear = process.env.ACADEMIC_YEAR ?? "";

  return (
    <footer className="mt-16 bg-black p-5 sm:p-8">
      <div className="grid grid-cols-12 items-center gap-y-4">
        <div className="col-span-3 sm:col-span-2 md:col-span-1">
          <Image
            src="/Logo.png"
            alt="ihg-logo"
            width={80}
            height={80}
            className="-mt-[2vh] w-full sm:-mt-[3vh]"
          />
        </div>

        <div className="col-span-5 md:col-span-4">
          <p className="font-heading text-ihg-gold text-[90%] sm:text-[110%] md:text-[150%]">
            IHG Convening {academicYear}
          </p>
        </div>

        <div className="col-span-4 pl-[5vw] md:col-span-4">
          <p className="font-heading text-ihg-gold text-[90%] sm:text-[110%] md:text-[150%]">
            NUS Raffles Hall
          </p>
          <p className="text-[80%] text-white sm:text-[100%] md:text-[130%]">
            19 Kent Ridge Crescent
          </p>
          <p className="text-[80%] text-white sm:text-[100%] md:text-[130%]">
            Singapore 119278
          </p>
          <p className="text-[80%] text-white sm:text-[100%] md:text-[130%]">
            +65 6516 2078
          </p>
        </div>

        <div className="col-span-12 mt-[2vmax] flex items-end justify-end sm:mt-0 md:col-span-3">
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
