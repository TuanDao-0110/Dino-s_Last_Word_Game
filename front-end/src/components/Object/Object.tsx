import { ObjectProps } from "../../types/hangman.model";

import { Dino } from "../../assets/export_component/resource";

import classes from "./object.module.css";

const Object: React.FC<ObjectProps> = ({ wrongGuesses }) => {
  return (
    <div className={classes.object_container}>
      <Dino wrongGuesses={wrongGuesses} />
    </div>
  );
};

export default Object;
