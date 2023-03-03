import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../src/app/store";
import {
  setWordToGuess,
  setGuessedLetters,
  setGameStatus,
  resetGame,
  addToLeaderboard,
} from "../../../features/WordSlice";
import Word from "../../../components/word/Word";
import Keyboard from "../../../components/keyboard/Keyboard";
import Message from "../../../components/message/Message";
import Object from "../../../components/Object/Object";
import Leaderboard from "../../../components/leader_board/LeaderBoard";
import classes from "./main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  const wordToGuess = useSelector((state: RootState) => state.game.wordToGuess);
  const guessedLetters = useSelector(
    (state: RootState) => state.game.guessedLetters
  );
  const incorrectLetters = useSelector(
    (state: RootState) => state.game.incorrectLetters
  );
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  const leaderboard = useSelector((state: RootState) => state.game.leaderboard);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setWordToGuess());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (
      wordToGuess &&
      wordToGuess.split("").every((letter) => guessedLetters.includes(letter))
    ) {
      dispatch(setGameStatus("won"));
    }
  }, [dispatch, guessedLetters, wordToGuess]);

  const letterClickHandler = (letter: string) => {
    dispatch(setGuessedLetters(letter));
  };

  const clickPlayHandler = () => {
    dispatch(resetGame());
  };

  const nameSubmitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    inputElement: HTMLInputElement | null
  ) => {
    event.preventDefault();
    if (inputElement) {
      const name = inputElement.value;
      dispatch(addToLeaderboard({ name, score: guessedLetters.length }));
      inputElement.value = "";
    }
  };

  console.log(wordToGuess);
  console.log(guessedLetters);
  console.log(incorrectLetters);
  console.log(gameStatus);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={classes.mainContainer}>
      <Object
        wrongGuesses={incorrectLetters.length}
        wordToGuess={wordToGuess}
      />
      <Word wordToGuess={wordToGuess} guessedLetters={guessedLetters} />

      <Keyboard
        wordToGuess={wordToGuess}
        guessedLetters={guessedLetters}
        letterClickHandler={letterClickHandler}
        gameStatus={gameStatus}
      />
      <Message gameStatus={gameStatus} />
      <Leaderboard />
    </div>
  );
};

export default Main;
