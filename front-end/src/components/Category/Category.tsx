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
  const { category } = useAppSelector((state) => state.game);
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
    </div>
  );
};

export default Category;
