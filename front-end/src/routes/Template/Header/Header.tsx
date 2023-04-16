import { useContext, useEffect, useState } from "react";
import { Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../../context/auth-context";
import classes from "./header.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setLogin } from "../../../features/GameSlice";
import LoginForm from "../../../components/Form/LoginForm";
import RegisterForm from "../../../components/Form/RegisterForm";

import { setPlayerDispatch } from "../../../features/PlayerSlice";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export const Header = () => {
  /*  const auth = getAuth();
  const [user] = useAuthState(auth); */

  const dispatch = useAppDispatch();
  const { showLogin } = useAppSelector((state) => state.game);
  const { currentUser, setCurrentUser, signOut } = useContext(AuthContext);
  const { players } = useAppSelector((state) => state.player);
  const [activeTab, setActiveTab] = useState("login");

  const handleCloseLogin = () => dispatch(setLogin(false));
  const handleShowLogin = () => {
    setActiveTab("login");
    dispatch(setLogin(true));
  };

  const handleShowRegister = () => {
    setActiveTab("register");
    dispatch(setLogin(true));
  };

  /* useEffect(() => {
    console.log("CURRUSER", currentUser);
  }, [currentUser]);
  useEffect(() => {
    console.log("USEEFFECT", currentUser, user);
    if (!currentUser && user) {
      dispatch(setPlayerDispatch(user));
      setCurrentUser(user);
      dispatch(setLogin(false));
    }
  }, []);

  console.log("PLAYERS", players); */

  return (
    <div className={classes.header_container}>
      {!currentUser && (
        <>
          <Button onClick={handleShowLogin} className={classes.header_button}>
            Login
          </Button>
          <Button
            onClick={handleShowRegister}
            className={classes.header_reg_button}
          >
            Sign up
          </Button>
        </>
      )}
      {currentUser && (
        <>
          <h4 className={classes.header_text}>
            🤩😜🤨🥰🥰🖐🏻 {players?.userInfo._fieldsProto?.name.stringValue}{" "}
            🤩🥳😜🤨🥰🥰🖐🏻{" "}
          </h4>
          <Button onClick={() => signOut()} className={classes.header_button}>
            Logout
          </Button>
        </>
      )}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <div className={classes.loginModal_container}>
          <Modal.Header closeButton>
            <Modal.Title>Login or signup to join the leaderboard</Modal.Title>
          </Modal.Header>
          <Tabs
            defaultActiveKey={activeTab}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <LoginForm />
            </Tab>
            <Tab eventKey="register" title="Register">
              <RegisterForm />
            </Tab>
          </Tabs>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};
