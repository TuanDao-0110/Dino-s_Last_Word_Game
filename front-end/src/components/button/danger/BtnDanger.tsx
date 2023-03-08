import { ButtonProps } from "../../../hangman.model";

import { Button } from "react-bootstrap";

const BtnDanger: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button variant="danger" onClick={clickHandler}>
      {text}
    </Button>
  );
};

export default BtnDanger;
