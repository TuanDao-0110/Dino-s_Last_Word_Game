import { WordLetterProps } from "../../hangman.model";

import classes from "./wordLetters.module.css";

const WordLetters: React.FC<WordLetterProps> = ({ letter, guessed }) => {
  return (
    <div
      className={`${guessed ? classes.guessed : ""} ${
        classes.letter_container
      }`}
    >
      {guessed ? letter : ""}
    </div>
  );
};

export default WordLetters;
