import React, { ReactEventHandler, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Categories } from "../../types/API.model";
import {
  getWordDispatch,
  setCategory,
  setWordToGuess,
} from "../../features/GameSlice";

import classes from "./category.module.css";
import { Message, Controls } from "../../assets/export_component/resource";

const Category: React.FC = () => {
  const { category, score, round, gameStatus, guessedLetters, wordToGuess } =
    useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const renderOption = () => {
    return Object.values(Categories).map((category, index) => (
      <option value={category} key={index}>
        {category}
      </option>
    ));
  };
  const setUpCategory: ReactEventHandler<HTMLSelectElement> = async (e) => {
    dispatch(setCategory(e.currentTarget.value as Categories));
    await dispatch(getWordDispatch(e.currentTarget.value as Categories));
    dispatch(setWordToGuess());
  };

  const getMeteorProgress = () => {
    const wrongGuesses = guessedLetters.filter(
      (letter) => !wordToGuess.includes(letter)
    ).length;
    return (wrongGuesses / 9) * 100;
  };

  return (
    <div className={classes.category_container}>
      <p className={classes.score}>
        Score: <span>{score}</span>
      </p>
      <ProgressBar
        className={classes.progress_bar}
        variant="danger"
        now={getMeteorProgress()}
      />
      <div className={classes.category_info}>
        <p className={classes.category_display}>
          Word category: <span>{category}</span>
        </p>
        <p className={classes.points_earned}>
          Points to be earned: {category === "all" ? 2 : 1}
        </p>
        <Form.Select
          disabled={guessedLetters.length > 0 || gameStatus !== "playing"}
          aria-label="select category"
          onChange={setUpCategory}
          className={classes.category_select}
        >
          {renderOption()}
        </Form.Select>{" "}
      </div>
      {gameStatus === "won" && <p className={classes.game_status}>You won!</p>}
      {gameStatus === "lost" && (
        <p className={classes.game_status}>Ouch. You lost!</p>
      )}
      <Controls />
      {gameStatus === "lost" && <Message />}
    </div>
  );
};

export default Category;
