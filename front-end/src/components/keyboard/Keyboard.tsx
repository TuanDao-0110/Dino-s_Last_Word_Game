import React from "react";
import Key from "../Key/Key";
import { KeyboardProps } from "../../hangman.model";
import classes from "./keyboard.module.css";

const letters: string[] = [];
for (let i = 0; i < 26; i++) letters.push(String.fromCharCode(65 + i));
console.log(letters);

const Keyboard: React.FC<KeyboardProps> = ({
  wordToGuess,
  guessedLetters,
  letterClickHandler,
}) => {
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
