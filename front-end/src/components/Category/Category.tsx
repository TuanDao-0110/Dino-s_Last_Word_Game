import React, { ReactEventHandler, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Categories } from "../../types/API.model";
import {
  getWordDispatch,
  setCategory,
  setWordToGuess,
} from "../../features/GameSlice";

import classes from "./category.module.css";

const Category: React.FC = () => {
  const { category, score, round, gameStatus } = useAppSelector((state) => state.game);
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

  return (
    <div className={classes.category_container}>
      <h2>Word category: {category}</h2>{" "}
      <Form.Select
        aria-label="select category"
        onChange={setUpCategory}
        size="lg"
      >
        {renderOption()}
      </Form.Select>
      <div>
        <h2>
          score <span>{score}</span>
        </h2>
        <h2>
          round <span>{round}</span>
        </h2>
        <h2>
          gameStatus <span>{gameStatus}</span>
        </h2>
        <h2>
          gameStatus <span>{gameStatus}</span>
        </h2>
      </div>
    </div>
  );
};

export default Category;
