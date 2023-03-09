import { ButtonProps } from "../../../types/hangman.model"

import { Button } from "react-bootstrap";

const BtnPrimary: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button variant="primary" onClick={clickHandler}>
      {text}
    </Button>
  );
};

export default BtnPrimary;
