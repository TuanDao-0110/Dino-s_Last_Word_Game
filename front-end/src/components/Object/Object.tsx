// Components
import { Dino } from "../../assets/export_component/resource";

// Types
import { ObjectProps } from "../../types/hangman.model";

// Styles
import classes from "./object.module.css";

const Object: React.FC<ObjectProps> = ({ wrongGuesses }) => {
  return (
    <div className={classes.object_container}>
      <Dino wrongGuesses={wrongGuesses} />
    </div>
  );
};

export default Object;
