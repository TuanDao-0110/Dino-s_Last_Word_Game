import { ButtonProps } from "../../../hangman.model";

import { Button } from "react-bootstrap";

const BtnSuccess: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button variant="success" onClick={clickHandler}>
      {text}
    </Button>
  );
};

export default BtnSuccess;
