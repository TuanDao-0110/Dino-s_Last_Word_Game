import React, { ReactEventHandler } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import Form from "react-bootstrap/Form";
import classes from "./category.module.css";
import Button from "react-bootstrap/Button";
import { Categories } from "../../types/API.model";
import { getWordDispatch, setCategory } from "../../features/GameSlice";
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
  const setUpCategory: ReactEventHandler<HTMLSelectElement> = (e) => {
    dispatch(setCategory(e.currentTarget.value as Categories));
  };
  return (
    <div className={classes.category_container}>
      <h2>Word category: {category}</h2>{" "}
      <Form.Select aria-label="" onChange={setUpCategory} size="lg">
        {renderOption()}
      </Form.Select>{" "}
      <Button
        onClick={() => {
          dispatch(getWordDispatch(category));
        }}
      >
        get word
      </Button>
    </div>
  );
};

export default Category;
