// Redux
import { useAppSelector } from "../../hooks/hooks";

// Components
import { WordLetters } from "../../assets/export_component/resource";

// Styles
import classes from "./word.module.css";

const Word: React.FC = () => {
  const { wordToGuess, guessedLetters } = useAppSelector((state) => state.game);
  return (
    <div className={classes.word_container}>
      {wordToGuess.split("").map((letter, index) => (
        <WordLetters
          key={index}
          letter={letter}
          guessed={guessedLetters.includes(letter)}
        />
      ))}
    </div>
  );
};

export default Word;
