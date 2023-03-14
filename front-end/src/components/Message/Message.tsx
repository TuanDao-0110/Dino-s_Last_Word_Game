import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useState,
  useRef,
} from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { signInUser } from "../../firebase/firebase";
import Board from "../../routes/Board/Board";
import { AuthContext } from "../../context/auth-context";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";

import { addToLeaderboard, setModal } from "../../features/GameSlice";
import classes from "./message.module.css";

const defaultFormFields = {
  email: "",
  password: "",
};

const Message: React.FC = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const dispatch = useAppDispatch();
  const { score, showModal } = useAppSelector((state) => state.game);
  const nameInput = useRef(null);

  // const nameSubmitHandler = (
  //   event: React.FormEvent<HTMLFormElement>,
  //   inputElement: HTMLInputElement | null
  // ) => {
  //   event.preventDefault();
  //   if (inputElement) {
  //     const name = inputElement.value;
  //     dispatch(addToLeaderboard({ name, score: score }));
  //     inputElement.value = "";
  //   }
  // };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send the email and password to firebase
      const userCredential = await signInUser(email, password);
      if (userCredential) {
        resetFormFields();
        setCurrentUser(userCredential.user);
      }
    } catch (error: any) {}
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
