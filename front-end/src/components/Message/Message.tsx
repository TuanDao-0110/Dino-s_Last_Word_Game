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
        size="sm"
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>
            Great job
            {currentUser
              ? ", " + player.players?.userInfo._fieldsProto?.name.stringValue
              : ""}
            !
          </Modal.Title>
        </Modal.Header>
        {!currentUser ? (
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className={`mb-3 ${classes.tabs}`}
          >
            <Tab eventKey="login" title="Login">
              <LoginForm />
            </Tab>
            <Tab eventKey="register" title="Register">
              <RegisterForm />
            </Tab>
          </Tabs>
        ) : (
          <>
            <Modal.Body>Would you like to save your score?</Modal.Body>
            <Modal.Footer className="border-0">
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
