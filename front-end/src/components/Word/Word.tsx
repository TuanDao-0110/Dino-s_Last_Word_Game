import { WordLetters } from "../../assets/export_component/resource";
import { useAppSelector } from "../../hooks/hooks";

import classes from "./word.module.css";

const Word: React.FC = () => {
  const { wordToGuess, guessedLetters } = useAppSelector((state) => state.game);
  console.log(wordToGuess);

  return (
    <div className={classes.word_container}>
      {wordToGuess.split("").map((letter, index) => (
        <WordLetters key={index} letter={letter} guessed={guessedLetters.includes(letter)} />
      ))}
    </div>
  );
};

export default Word;
