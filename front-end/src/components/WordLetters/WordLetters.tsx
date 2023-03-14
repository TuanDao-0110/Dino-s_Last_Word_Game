import { WordLetterProps } from "../../types/hangman.model";
import { useAppDispatch } from "../../hooks/hooks";
import { addGuessedLetter, setHint } from "../../features/GameSlice";
import classes from "./wordLetters.module.css";

const WordLetters: React.FC<WordLetterProps> = ({ letter, guessed }) => {
  const dispatch = useAppDispatch();

  // Here we define function to show the letter once it is clicked
  const showHint = () => {
    dispatch(addGuessedLetter(letter));
    dispatch(setHint(letter));
  };

  return (
    <button
      className={`${guessed ? classes.guessed : ""} ${
        classes.letter_container
      }`}
      onClick={showHint}
    >
      {guessed ? letter : ""}
    </button>
  );
};

export default WordLetters;
