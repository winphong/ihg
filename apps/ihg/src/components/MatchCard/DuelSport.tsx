import Image from "next/image";
import { Sport } from "../../models";

const DuelSport = ({ sport }: { sport: Sport }) => {
  return (
    <section className="text-center">
      <div className="h-[200px] w-[300px] md:h-[400px] flex flex-col items-center justify-center gap-2">
        <div className={"grid grid-cols-2 gap-2 w-full"}>
          {sport.halls.map((hall) => {
            return (
              <div
                key={hall.name}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  alt={hall.name}
                  width={80}
                  height={80}
                  src={`/logos/${hall.name}.png`}
                />
                <p key={hall.name} className="text-2xl md:text-4xl">
                  {hall.name}
                </p>
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-gold rounded-lg text-2xl md:text-7xl">
            {sport.name}
          </p>
          <p className="text-gray-400 rounded-lg text-l md:text-2xl">
            11:00 - 14:00, MPSH 15
          </p>
        </div>
      </div>
    </section>
  );
};

export default DuelSport;
