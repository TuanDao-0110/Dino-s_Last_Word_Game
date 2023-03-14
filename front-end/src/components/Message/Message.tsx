import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { addToLeaderboard } from "../../features/GameSlice";
import classes from "./message.module.css";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const { score } = useAppSelector((state) => state.game);
  const nameInput = useRef(null);

  const nameSubmitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    inputElement: HTMLInputElement | null
  ) => {
    event.preventDefault();
    if (inputElement) {
      const name = inputElement.value;
      dispatch(addToLeaderboard({ name, score: score }));
      inputElement.value = "";
    }
  };
  return (
    <div className={classes.Category_container}>
      <p>You did great job! Enter your nickname to join the leaderboard:</p>
      <form onSubmit={(event) => nameSubmitHandler(event, nameInput.current)}>
        <input type="text" ref={nameInput} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Message;
