import { ObjectProps } from "../../types/hangman.model";

import Dino0 from "../dino/Dino0";
import Dino1 from "../dino/Dino1";
import Dino2 from "../dino/Dino2";
import Dino3 from "../dino/Dino3";
import Dino4 from "../dino/Dino4";
import Dino5 from "../dino/Dino5";
import Dino6 from "../dino/Dino6";
import Dino7 from "../dino/Dino7";
import Dino8 from "../dino/Dino8";
import Dino9 from "../dino/Dino9";
import Dino10 from "../dino/Dino10";

import classes from "./object.module.css";

const Object: React.FC<ObjectProps> = ({ wrongGuesses }) => {
  return (
    <div className={classes.object_container}>
      {wrongGuesses === 0 && <Dino0 />}
      {wrongGuesses === 1 && <Dino1 />}
      {wrongGuesses === 2 && <Dino2 />}
      {wrongGuesses === 3 && <Dino3 />}
      {wrongGuesses === 4 && <Dino4 />}
      {wrongGuesses === 5 && <Dino5 />}
      {wrongGuesses === 6 && <Dino6 />}
      {wrongGuesses === 7 && <Dino7 />}
      {wrongGuesses === 8 && <Dino8 />}
      {wrongGuesses === 9 && <Dino9 />}
      {wrongGuesses > 9 && <Dino10 />}
    </div>
  );
};

export default Object;
