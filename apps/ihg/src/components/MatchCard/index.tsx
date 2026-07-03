import { Sport } from "../../models";
import DuelSport from "./DuelSport";
import CarnivalSix from "./CarnivalSix";
import CarnivalSeven from "./CarnivalSeven";

const SportCard = ({ sport }: { sport: Sport }) => {
  if (sport.halls.length === 2) {
    return <DuelSport sport={sport} />;
  }

  if (sport.halls.length === 6) {
    return <CarnivalSix sport={sport} />;
  }

  return <CarnivalSeven sport={sport} />;
};

export default SportCard;
