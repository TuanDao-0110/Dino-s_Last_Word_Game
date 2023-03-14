import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";

import { setModal } from "../../features/GameSlice";
import classes from "./message.module.css";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showModal } = useAppSelector((state) => state.game);

  const handleClose = () => dispatch(setModal(false));

  return (
    <div className={classes.modal_container}>
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>You did great job! </Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your nickname to join the leaderboard:</Modal.Body>
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
              {" "}
              <RegisterForm />
            </Tab>
          </Tabs>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Message;
