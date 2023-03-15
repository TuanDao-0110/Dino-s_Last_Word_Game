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
      <h2>Your game</h2>
      <ProgressBar
        className={classes.progress_bar}
        variant="danger"
        now={getMeteorProgress()}
      />
      <p className={classes.score}>
        Score: <span>{score}</span>
      </p>
      <div>
        <p className={classes.category_display}>Word category: {category}</p>
        <p>Points to be earned: {category === "all" ? 2 : 1}</p>
        <Form.Select
          aria-label="select category"
          onChange={setUpCategory}
          className={classes.category_select}
        >
          {renderOption()}
        </Form.Select>
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
