import { ButtonProps } from "../../../types/hangman.model";
import { Button } from "react-bootstrap";

const BtnError: React.FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <Button variant="warning" onClick={clickHandler}>
      {text}
    </Button>
  );
};

export default BtnError;
