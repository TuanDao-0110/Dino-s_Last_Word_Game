import { KeyboardProps } from "../../hangman.model";
import { useAppSelector } from "../../hooks/hooks";

import Key from "../Key/Key";

import classes from "./keyboard.module.css";

const letters: string[] = [];
for (let i = 0; i < 26; i++) letters.push(String.fromCharCode(65 + i));
console.log(letters);

const Keyboard: React.FC<KeyboardProps> = ({ letterClickHandler }) => {
  const wordToGuess = useAppSelector((state) => state.game.wordToGuess);
  const guessedLetters = useAppSelector((state) => state.game.guessedLetters);
  const getLetterStatus = (
    letter: string
  ): "incorrect" | "correct" | "blank" => {
    if (guessedLetters.includes(letter))
      if (wordToGuess.includes(letter)) return "correct";
      else return "incorrect";
    return "blank";
  };

  return (
    <div className={classes.keyboard_container}>
      {letters.map((letter) => (
        <Key
          letterClickHandler={letterClickHandler}
          key={letter}
          letter={letter}
          status={getLetterStatus(letter)}
        />
      ))}
    </div>
  );
};

export default Keyboard;
