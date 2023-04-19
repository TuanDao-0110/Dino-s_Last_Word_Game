// React
import React, { useContext } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  resetGame,
  setModal,
  setShowWord,
  setWordToGuess,
} from "../../features/GameSlice";
import { getAllScoreDispatch } from "../../features/PlayerSlice";

// Bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";

// Components
import {
  LoginForm,
  RegisterForm,
  BtnSuccess,
} from "../../assets/export_component/resource";

// Firebase, auth
import { AuthContext } from "../../context/auth-context";

// API
import { postNewScore } from "../../api/userapi";

// Styles
import classes from "./message.module.css";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useContext(AuthContext);
  const { showModal, score } = useAppSelector((state) => state.game);
  const player = useAppSelector((state) => state.player);

  const handleClose = () => {
    dispatch(setModal(false));
    console.log("modal closed, setShowWord to false");
    dispatch(setShowWord(false));
    dispatch(resetGame());
    console.log("setWordToGuess handleClose Message");
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
        className={classes.modal}
        show={showModal}
        onHide={() => {
          handleClose();
        }}
        animation={false}
        size="sm"
      >
        <Modal.Header
          className={`${classes.modal_header} border-0`}
          closeButton
        >
          <div></div>
          <h2 className={classes.modal_title}>
            You got <span> {score} </span> points
            {currentUser
              ? ", " + player.players?.userInfo._fieldsProto?.name.stringValue
              : ""}
          </h2>
        </Modal.Header>
        {!currentUser ? (
          <Tabs
            defaultActiveKey="register"
            id="uncontrolled-tab-example"
            className={`mb-3 ${classes.tabs}`}
          >
            <Tab eventKey="login" title="Login">
              <LoginForm />
            </Tab>
            <Tab eventKey="register" title="Register">
              {
                <div className={classes.game_over_summary}>
                  <p>Sign up to save your next score</p>
                </div>
              }
              <RegisterForm />
            </Tab>
          </Tabs>
        ) : (
          <>
            <Modal.Body className={classes.modal_body}>
              Would you like to save your score?
            </Modal.Body>
            <Modal.Footer className={`${classes.modal_footer} border-0`}>
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
