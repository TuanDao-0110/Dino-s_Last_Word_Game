// React
import { useEffect, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setWordToGuess, setGameStatus, setNextRound, setScore, setModal, setAllWord } from "../../../features/GameSlice";

// Bootstrap
import { Spinner, Row } from "react-bootstrap";

// Components
import { Word, Keyboard, Object, LeaderBoard, Category } from "../../../assets/export_component/resource";

// API
import { getAllWords } from "../../../api/wordapi";

// Types
import { Categories, GameStatus, Word_Type } from "../../../types/API.model";

// Styles
import classes from "./main.module.css";

const Main = () => {
  const dispatch = useAppDispatch();
  const { wordToGuess, guessedLetters, category, score, hints } = useAppSelector((state) => state.game);
  const [isLoading, setIsLoading] = useState(true);

  // After the page loads, set a word to be guessed
  useEffect(() => {
    const fetchWords = async () => {
      const data = (await getAllWords()) as Word_Type;
      dispatch(setAllWord(data));
      dispatch(setWordToGuess());
    };
    fetchWords()
      .then(() => {
        dispatch(setWordToGuess());
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }, [dispatch]);

  // Every time a new letter is guessed, check if the game is won or lost
  useEffect(() => {
    if (wordToGuess && wordToGuess.split("").every((letter) => guessedLetters.includes(letter))) {
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
      dispatch(setGameStatus(GameStatus.win));
      dispatch(setNextRound());
    } else if (guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length > 8) {
      dispatch(setGameStatus(GameStatus.lose));
      const timer = setTimeout(() => {
        dispatch(setModal(true));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, guessedLetters, wordToGuess, category,hints,score]);

  if (isLoading) return <Spinner />;
  return (
    <div className={classes.main_container}>
      <div className={`${classes.mainLeaderboard_container} ${classes.desktop}`}>
        <LeaderBoard />
      </div>
      <div className={classes.mainObject_container}>
        <Object wrongGuesses={guessedLetters.filter((letter) => !wordToGuess.includes(letter)).length} />
        <Word />
        <Keyboard />
      </div>
      <div className={classes.mainCategory_container}>
        <Category />
      </div>
      <div className={`${classes.mainLeaderboard_container} ${classes.mobile}`}>
        <LeaderBoard />
      </div>
    </div>
  );
};

export default Main;
