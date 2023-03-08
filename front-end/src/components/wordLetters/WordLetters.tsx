import { WordLetterProps } from "../../types/hangman.model";

import classes from "./wordLetters.module.css";

const WordLetters: React.FC<WordLetterProps> = ({ letter, guessed }) => {
  return (
    <div className={classes.letterContainer}>{guessed ? letter : "_"}</div>
  );
};

export default WordLetters;
