import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import { setModal } from "../../features/GameSlice";
import classes from "./message.module.css";
import { AuthContext } from "../../context/auth-context";
import BtnSuccess from "../Button/success/BtnSuccess";
import { postNewScore } from "../../api/userapi";
import { getAllScoreDispatch } from "../../features/PlayerSlice";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useContext(AuthContext);
  const { showModal, score } = useAppSelector((state) => state.game);
  const { players } = useAppSelector((state) => state.player);
  const handleClose = () => dispatch(setModal(false));
  const handleSubmitScore = async () => {
    if (currentUser) {
      await postNewScore(currentUser, { score });
      await dispatch(getAllScoreDispatch());
      handleClose();
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
              ? ", " + players?.userInfo._fieldsProto?.name.stringValue
              : ""}
            !
          </Modal.Title>
        </Modal.Header>
        {!currentUser ? (
          <>
            <Modal.Body>
              Enter your nickname to join the leaderboard:
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body>
              Would you like to save your score to the system?
            </Modal.Body>
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
