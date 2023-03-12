import React, { ReactEventHandler } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import Form from "react-bootstrap/Form";
import style from "./category.module.css";
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
    <div>
      <button
        onClick={() => {
          dispatch(getWordDispatch(category));
        }}
      >
        get word
      </button>
      <h2>category {category}</h2>
      <Form.Select aria-label="" onChange={setUpCategory} size="lg">
        {renderOption()}
      </Form.Select>
    </div>
  );
};

export default Category;
