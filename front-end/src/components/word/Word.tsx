import { WordLetters } from "../../assets/export_component/resource";
import { useAppSelector } from "../../hooks/hooks";

import classes from "./word.module.css";

const Word: React.FC = () => {
  const wordToGuess = useAppSelector((state) => state.game.wordToGuess);
  const guessedLetters = useAppSelector((state) => state.game.guessedLetters);

  return (
    <div className={classes.word_container}>
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
