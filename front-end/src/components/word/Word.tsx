import { WordProps } from "../../hangman.model";

import { WordLetters } from "../../assets/export_component/resource";

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
