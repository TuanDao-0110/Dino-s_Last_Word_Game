import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setWordToGuess,
  setGameStatus,
  setNextRound,
  setScore,
  setModal,
} from "../../../features/GameSlice";

import {
  Word,
  Keyboard,
  Message,
  Object,
  LeaderBoard,
  Controls,
  Form,
} from "../../../assets/export_component/resource";

import classes from "./main.module.css";
import Category from "../../../components/Category/Category";
import { Categories } from "../../../types/API.model";

const Main = () => {
  const dispatch = useAppDispatch();
  const {
    wordToGuess,
    guessedLetters,
    gameStatus,
    category,
    score,
    hints,
    round,
    showModal,
  } = useAppSelector((state) => state.game);
  const [isLoading, setIsLoading] = useState(true);

  // After the page loads, set a word to be guessed
  useEffect(() => {
    console.log("use effect running");
    dispatch(setWordToGuess());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {}, [category]);

  // Every time a new letter is guessed, check if the game is won or lost
  useEffect(() => {
    if (
      wordToGuess &&
      wordToGuess.split("").every((letter) => guessedLetters.includes(letter))
    ) {
      if (category === Categories.ALL) {
        dispatch(setScore(+2));
      } else if (
        category === Categories.ANIMALS ||
        category === Categories.FRUITS ||
        category === Categories.COUNTRIES ||
        category === Categories.PROFESSION ||
        category === Categories.SPORTS
      ) {
        dispatch(setScore(+1));
      } else if (hints.length >= 1) {
        dispatch(setScore(score - hints.length));
      }
      dispatch(setGameStatus("won"));
      dispatch(setNextRound());
    } else if (
      guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length >
      8
    ) {
      dispatch(setGameStatus("lost"));
      dispatch(setModal(true));
    }
  }, [dispatch, guessedLetters, wordToGuess, category]);

  useEffect(
    () => console.log("word to Guess rerender: ", wordToGuess),
    [wordToGuess]
  );

  useEffect(() => console.log("score: ", score), [score]);
  useEffect(() => console.log("category changed: ", category), [category]);
  useEffect(() => console.log("game status: ", gameStatus), [gameStatus]);

  if (isLoading) return <Spinner />;
  return (
    <div className={classes.main_container}>
      <div className={classes.mainLeaderboard_container}>
        <LeaderBoard />
        {/* <Form /> */}
      </div>
      <div className={classes.mainObject_container}>
        <Object
          wrongGuesses={
            guessedLetters.filter((letter) => !wordToGuess.includes(letter))
              .length
          }
        />
        <Word />
        <Keyboard />
      </div>
      <div className={classes.mainCategory_container}>
        {gameStatus === "lost" && <Message />}
        <Category /> {gameStatus !== "playing" && <Controls />}
      </div>
    </div>
  );
};

export default Main;
