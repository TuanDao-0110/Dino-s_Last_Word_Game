import Button from "react-bootstrap/Button";

import { ButtonProps } from "../../../types/hangman.model";

import classes from "./btnWarning.module.css";

const BtnWarning: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button
      className={classes.btn_custom_warning}
      variant="warning"
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
};

export default BtnWarning;
