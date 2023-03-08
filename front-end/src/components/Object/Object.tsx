import { ObjectProps } from "../../hangman.model";

import Dino0 from "../Dino/Dino0";
import Dino1 from "../Dino/Dino1";
import Dino2 from "../Dino/Dino2";
import Dino3 from "../Dino/Dino3";
import Dino4 from "../Dino/Dino4";
import Dino5 from "../Dino/Dino5";
import Dino6 from "../Dino/Dino6";
import Dino7 from "../Dino/Dino7";
import Dino8 from "../Dino/Dino8";
import Dino9 from "../Dino/Dino9";

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
      {wrongGuesses > 8 && <Dino9 />}
    </div>
  );
};

export default Object;
