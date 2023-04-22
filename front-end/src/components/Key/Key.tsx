import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addGuessedLetter } from "../../features/GameSlice";

import { KeyProps } from "../../types/hangman.model";

import classes from "./key.module.css";
import { useEffect } from "react";
import { GameStatus } from "../../types/API.model";

const Key: React.FC<KeyProps> = ({ letter, status }) => {
  const dispatch = useAppDispatch();
  const { gameStatus, showModal, guessedLetters, wordToGuess } = useAppSelector(
    (state) => state.game
  );
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !showModal &&
        event.key === letter.toLowerCase() &&
        gameStatus === GameStatus.playing &&
        !guessedLetters.includes(letter)
      ) {
        dispatch(addGuessedLetter(letter));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [letter, status, gameStatus, dispatch, showModal]);
  return (
    <div className={classes.key_container}>
      <button
        className={classes[status]}
        onClick={() => dispatch(addGuessedLetter(letter))}
        disabled={guessedLetters.includes(letter)}
      >
        {letter}
      </button>
    </div>
  );
};

export default Key;
