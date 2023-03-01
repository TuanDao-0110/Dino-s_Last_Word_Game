import React from "react";
import Key from "../Key/Key";
import { KeyboardProps } from "../../hangman.model";
import "./keyboard.module.css";

const letters: string[] = [];
for (let i = 0; i < 26; i++) letters.push(String.fromCharCode(65 + i));
console.log(letters);

const Keyboard = (props: KeyboardProps) => {
  const getLetterStatus = (
    letter: string
  ): "incorrect" | "correct" | "blank" => {
    if (props.guessedLetters.includes(letter))
      if (props.word.includes(letter)) return "correct";
      else return "incorrect";
    return "blank";
  };

  return (
    <div className="keyboard_container">
      {letters.map((letter) => (
        <Key
          letterClickHandler={props.letterClickHandler}
          key={letter}
          letter={letter}
          status={getLetterStatus(letter)}
        />
      ))}
    </div>
  );
};

export default Keyboard;
