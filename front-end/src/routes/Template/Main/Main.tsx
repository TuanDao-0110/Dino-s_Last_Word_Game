import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import {
  setWordToGuess,
  setGuessedLetters,
  setGameStatus,
  resetGame,
  addToLeaderboard,
} from "../../../features/GameSlice";

import Word from "../../../components/word/Word";
import Keyboard from "../../../components/keyboard/Keyboard";
import Message from "../../../components/message/Message";
import Object from "../../../components/Object/Object";
import Leaderboard from "../../../components/leader_board/LeaderBoard";

import classes from "./main.module.css";

const Main = () => {
  const dispatch = useAppDispatch();
  const wordToGuess = useAppSelector((state) => state.game.wordToGuess);
  const guessedLetters = useAppSelector((state) => state.game.guessedLetters);
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  const leaderboard = useAppSelector((state) => state.game.leaderboard);
  const [isLoading, setIsLoading] = useState(true);

  // After the page loads, set a word to be guessed
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

  const countWrongGuesses = () =>
    guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length;

  console.log(wordToGuess);
  console.log(guessedLetters);
  console.log(gameStatus);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={classes.mainContainer}>
      <Object
        wrongGuesses={
          guessedLetters.filter((letter) => !wordToGuess.includes(letter))
            .length
        }
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
