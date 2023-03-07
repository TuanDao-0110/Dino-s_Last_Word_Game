import React from "react";
import Key from "../Key/Key";
import { KeyboardProps } from "../../hangman.model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../src/app/store";
import classes from "./keyboard.module.css";

const letters: string[] = [];
for (let i = 0; i < 26; i++) letters.push(String.fromCharCode(65 + i));
console.log(letters);

const Keyboard: React.FC<KeyboardProps> = ({ letterClickHandler }) => {
  const wordToGuess = useSelector((state: RootState) => state.game.wordToGuess);
  const guessedLetters = useSelector(
    (state: RootState) => state.game.guessedLetters
  );
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
