import Button from "react-bootstrap/Button";

import { ButtonProps } from "../../../types/hangman.model";

import classes from "./btnDanger.module.css";

const BtnDanger: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button
      variant="custom"
      className={classes.btn_custom_danger}
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
};

export default BtnDanger;
