import Button from "react-bootstrap/Button";

import { ButtonProps } from "../../../types/hangman.model";

import classes from "./btnSuccess.module.css";

const BtnSuccess: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button
      variant="success"
      className={classes.btn_custom_success}
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
};

export default BtnSuccess;
