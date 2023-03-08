import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
<<<<<<< HEAD
import { setWordToGuess, setGuessedLetters, setGameStatus, resetGame, addToLeaderboard } from "../../../features/GameSlice";
=======

import { setWordToGuess, setGameStatus } from "../../../features/GameSlice";
>>>>>>> development

import {
  Word,
  Keyboard,
  Message,
  Object,
  LeaderBoard,
  Controls,
} from "../../../assets/export_component/resource";

import classes from "./main.module.css";


const Main = () => {
  const dispatch = useAppDispatch();
  const wordToGuess = useAppSelector((state) => state.game.wordToGuess);
  const guessedLetters = useAppSelector((state) => state.game.guessedLetters);
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  const [isLoading, setIsLoading] = useState(true);

  // After the page loads, set a word to be guessed
  useEffect(() => {
    dispatch(setWordToGuess());
    setIsLoading(false);
  }, [dispatch]);

  // Every time a new letter is guessed, check if the game is won or lost
  useEffect(() => {
    if (wordToGuess && wordToGuess.split("").every((letter) => guessedLetters.includes(letter))) {
      dispatch(setGameStatus("won"));
    } else if (
      guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length >
      8
    ) {
      dispatch(setGameStatus("lost"));
    }
  }, [dispatch, guessedLetters, wordToGuess]);

<<<<<<< HEAD
  const letterClickHandler = (letter: string) => {
    dispatch(setGuessedLetters(letter));
  };

  const clickPlayHandler = () => {
    dispatch(resetGame());
  };

  const nameSubmitHandler = (event: React.FormEvent<HTMLFormElement>, inputElement: HTMLInputElement | null) => {
=======
  /* const nameSubmitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    inputElement: HTMLInputElement | null
  ) => {
>>>>>>> development
    event.preventDefault();
    if (inputElement) {
      const name = inputElement.value;
      dispatch(addToLeaderboard({ name, score: guessedLetters.length }));
      inputElement.value = "";
    }
  }; */

<<<<<<< HEAD
  const countWrongGuesses = () => guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length;

  console.log(wordToGuess);
  console.log(guessedLetters);
=======
>>>>>>> development
  console.log(gameStatus);

  if (isLoading) return <h1>Loading...</h1>;
  return (
<<<<<<< HEAD
    <div className={classes.mainContainer}>
      <Object wrongGuesses={guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length} />
      <Word wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
      <Keyboard wordToGuess={wordToGuess} guessedLetters={guessedLetters} letterClickHandler={letterClickHandler} gameStatus={gameStatus} />
      <Message gameStatus={gameStatus} />
      <Leaderboard />
=======
    <div className={classes.main_container}>
      <Object
        wrongGuesses={
          guessedLetters.filter((letter) => !wordToGuess.includes(letter))
            .length
        }
      />
      <Word />
      <Keyboard />
      <Message />
      <Controls />
      <LeaderBoard />
>>>>>>> development
    </div>
  );
};

export default Main;
