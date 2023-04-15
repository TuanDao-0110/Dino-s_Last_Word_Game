import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import { resetGame, setModal, setWordToGuess } from "../../features/GameSlice";
import classes from "./message.module.css";
import { AuthContext } from "../../context/auth-context";
import BtnSuccess from "../Button/success/BtnSuccess";
import { postNewScore } from "../../api/userapi";
import { getAllScoreDispatch } from "../../features/PlayerSlice";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useContext(AuthContext);
  const { showModal, score } = useAppSelector((state) => state.game);
  const player = useAppSelector((state) => state.player);

  const handleClose = () => {
    dispatch(setModal(false));
    dispatch(resetGame());
    dispatch(setWordToGuess());
  };

  const handleSubmitScore = async () => {
    if (currentUser) {
      handleClose();
      await postNewScore(currentUser, { score });
      await dispatch(getAllScoreDispatch());
    }
  };

  return (
    <div className={classes.modal_container}>
      <Modal
        show={showModal}
        onHide={() => {
          handleClose();
        }}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Great job
            {currentUser
              ? ", " + player.players?.userInfo._fieldsProto?.name.stringValue
              : ""}
            !
          </Modal.Title>
        </Modal.Header>
        {!currentUser ? (
          <>
            <Modal.Body>
              Enter your nickname to join the leaderboard:{" "}
            </Modal.Body>
            <Modal.Body>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Login">
                  <LoginForm />
                </Tab>
                <Tab eventKey="profile" title="Register">
                  <RegisterForm />
                </Tab>
              </Tabs>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Body>Would you like to save your score?</Modal.Body>
            <Modal.Footer>
              <BtnSuccess
                clickHandler={handleSubmitScore}
                text="Yes, save it!"
              />
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Message;
