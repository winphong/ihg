import Image from "next/image";
import { Hall, Sport } from "../../models";

const CarnivalSix = ({ sport }: { sport: Sport }) => {
  return (
    <section>
      <div className="h-[200px] w-[300px] md:h-[400px] flex flex-col items-center justify-center gap-2 text-center">
        <div className={"grid grid-cols-3 gap-4"}>
          {sport.halls.slice(0, 3).map((hall) => (
            <SportHall key={hall.name} hall={hall} />
          ))}
        </div>
        <div className={`grid grid-cols-4 gap-2`}>
          {sport.halls.slice(3).map((hall) => (
            <SportHall key={hall.name} hall={hall} />
          ))}
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

const SportHall = ({ hall }: { hall: Hall }) => {
  return (
    <div key={hall.name} className="flex flex-col items-center justify-center">
      <Image
        alt={hall.name}
        width={50}
        height={50}
        src={`/logos/${hall.name}.png`}
      />
    </div>
  );
};

export default CarnivalSix;
