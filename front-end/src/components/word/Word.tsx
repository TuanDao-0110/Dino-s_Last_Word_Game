import { WordProps } from "../../types/hangman.model";

import WordLetters from "../wordLetters/WordLetters";

import classes from "./word.module.css";

const Word: React.FC<WordProps> = ({ wordToGuess, guessedLetters }) => {
  return (
    <div className={classes.wordContainer}>
      <div>
        {wordToGuess.split("").map((letter, index) => (
          <WordLetters
            key={index}
            letter={letter}
            guessed={guessedLetters.includes(letter)}
          />
        ))}
      </div>
    </div>
  );
};

export default Word;
