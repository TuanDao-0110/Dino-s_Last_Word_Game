import { KeyProps } from "../../hangman.model";
import { useAppDispatch } from "../../hooks/hooks";
import { addGuessedLetter } from "../../features/GameSlice";

import classes from "./key.module.css";

const Key: React.FC<KeyProps> = ({ letter, status }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={classes.key_container}>
      <button
        className={status}
        onClick={() => dispatch(addGuessedLetter(letter))}
        disabled={status !== "blank"}
      >
        {letter}
      </button>
    </div>
  );
};

export default Key;
