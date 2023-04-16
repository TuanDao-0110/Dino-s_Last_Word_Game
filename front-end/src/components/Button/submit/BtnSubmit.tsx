import { ButtonProps } from "../../../types/hangman.model";
import { Button } from "react-bootstrap";

import classes from "./btnSubmit.module.css";

const BtnSubmit: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button
      variant="success"
      className={classes.btn_custom_success}
      onClick={clickHandler}
      type="submit"
    >
      {text}
    </Button>
  );
};

export default BtnSubmit;
