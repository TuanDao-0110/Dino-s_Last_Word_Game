import Button from "react-bootstrap/Button";

import { ButtonProps } from "../../../types/hangman.model";

import classes from "./btnPrimary.module.css";

const BtnPrimary: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button
      variant="primary"
      className={classes.btn_custom_primary}
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
};

export default BtnPrimary;
