// React
import { useContext, useEffect, useState } from "react";

// Redux
import { setPlayerDispatch } from "../../../features/PlayerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setLogin } from "../../../features/GameSlice";

// Firebase, auth
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../../context/auth-context";

// Bootstrap
import { Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Button } from "react-bootstrap";

// Resources / Components
import {
  LoginForm,
  RegisterForm,
  BtnPrimary,
  BtnSuccess,
  BtnDanger,
  BtnWarning,
} from "../../../assets/export_component/resource";

// Styles
import classes from "./header.module.css";

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
    <div>
      <div className={classes.header_container}>
        {!currentUser && (
          <>
            <BtnSuccess text="Login" clickHandler={handleShowLogin} />
            <BtnPrimary text="Sign up" clickHandler={handleShowRegister} />
          </>
        )}
        {currentUser && (
          <>
            <h4 className={classes.header_text}>
              {players?.userInfo._fieldsProto?.name.stringValue}
            </h4>
            <BtnWarning text="Log out" clickHandler={() => signOut()} />
          </>
        )}
      </div>
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
