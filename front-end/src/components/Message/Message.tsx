import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import { addToLeaderboard, setModal } from "../../features/GameSlice";
import classes from "./message.module.css";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const { score, showModal } = useAppSelector((state) => state.game);
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

  const handleClose = () => dispatch(setModal(false));

  return (
    <div className={classes.modal_container}>
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>You did great job! </Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your nickname to join the leaderboard:</Modal.Body>
        <Modal.Footer>
          <form
            onSubmit={(event) => nameSubmitHandler(event, nameInput.current)}
          >
            <input type="text" ref={nameInput} />
            <Button type="submit">Submit</Button>
          </form>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Message;
