import { WordLetterProps } from "../../hangman.model";

import classes from "./wordLetters.module.css";

const WordLetters: React.FC<WordLetterProps> = ({ letter, guessed }) => {
  return (
    <div className={classes.letter_container}>
      <p>{guessed ? letter : "_"}</p>
    </div>
  );
};

export default WordLetters;
