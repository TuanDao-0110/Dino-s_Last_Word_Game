import { ObjectProps } from "../../types/hangman.model";

import {
  Dino0,
  Dino1,
  Dino2,
  Dino3,
  Dino4,
  Dino5,
  Dino6,
  Dino7,
  Dino8,
  Dino9,
} from "../../assets/export_component/resource";

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
