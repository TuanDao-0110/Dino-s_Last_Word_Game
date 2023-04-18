import { useAppSelector } from "../../hooks/hooks";

import { Key } from "../../assets/export_component/resource";

import classes from "./keyboard.module.css";

const line1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const line2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const line3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

const Keyboard: React.FC = () => {
  const {wordToGuess,guessedLetters} = useAppSelector((state) => state.game);
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
      <div className={classes.keyboard_line_container}>
        {line1.map((letter) => (
          <Key key={letter} letter={letter} status={getLetterStatus(letter)} />
        ))}
      </div>
      <div className={classes.keyboard_line_container}>
        {line2.map((letter) => (
          <Key key={letter} letter={letter} status={getLetterStatus(letter)} />
        ))}
      </div>
      <div className={classes.keyboard_line_container}>
        {line3.map((letter) => (
          <Key key={letter} letter={letter} status={getLetterStatus(letter)} />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
