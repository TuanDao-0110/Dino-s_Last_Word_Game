// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addGuessedLetter, setHint } from "../../features/GameSlice";

// Types
import { WordLetterProps } from "../../types/hangman.model";

// Styles
import classes from "./wordLetters.module.css";

const WordLetters: React.FC<WordLetterProps> = ({ letter, guessed }) => {
  const dispatch = useAppDispatch();
  const { score } = useAppSelector((state) => state.game);

  // Here we define function to show the letter once it is clicked
  const showHint = () => {
    if (score > 0) {
      dispatch(addGuessedLetter(letter));
      dispatch(setHint(letter));
    }
  };

  return (
    <button
      disabled={guessed ? true : false}
      className={`${guessed ? classes.guessed : ""} ${classes.letter}`}
      onClick={showHint}
    >
      {guessed ? letter : ""}
    </button>
  );
};

export default WordLetters;
