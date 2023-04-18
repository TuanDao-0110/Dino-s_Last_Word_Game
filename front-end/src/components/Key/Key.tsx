import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addGuessedLetter } from "../../features/GameSlice";

import { KeyProps } from "../../types/hangman.model";

import classes from "./key.module.css";
import { useEffect } from "react";

const Key: React.FC<KeyProps> = ({ letter, status }) => {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === letter.toLowerCase() && gameStatus === "playing" && status === "blank") {
        dispatch(addGuessedLetter(letter));
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [letter, status, gameStatus, dispatch]);
  return (
    <div className={classes.key_container}>
      <button
        className={classes[status]}
        onClick={() => dispatch(addGuessedLetter(letter))}
        disabled={gameStatus !== "playing" || status !== "blank"}
      >
        {letter}
      </button>
    </div>
  );
};

export default Key;
