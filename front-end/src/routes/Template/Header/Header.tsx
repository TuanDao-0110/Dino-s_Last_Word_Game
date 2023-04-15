import React, { useContext } from "react";
import { Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../../context/auth-context";
import classes from "./header.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setLogin } from "../../../features/GameSlice";
import LoginForm from "../../../components/Form/LoginForm";
import RegisterForm from "../../../components/Form/RegisterForm";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { showLogin } = useAppSelector((state) => state.game);
  const { currentUser, signOut } = useContext(AuthContext);
  const { players } = useAppSelector((state) => state.player);

  const handleCloseLogin = () => dispatch(setLogin(false));
  const handleShowLogin = () => dispatch(setLogin(true));

  return (
    <div>
      <Row>
        <div className={classes.header_container}>
          {!currentUser && (
            <>
              <Button
                onClick={handleShowLogin}
                className={classes.header_button}
              >
                Login
              </Button>
              <Button
                onClick={handleShowLogin}
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
              <Button
                onClick={() => signOut()}
                className={classes.header_button}
              >
                Logout
              </Button>
            </>
          )}
        </div>{" "}
      </Row>
      <div>
        <Modal show={showLogin} onHide={handleCloseLogin}>
          <div className={classes.loginModal_container}>
            <Modal.Header closeButton>
              <Modal.Title>Login or signup to join the leaderboard</Modal.Title>
            </Modal.Header>
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
            <Modal.Footer></Modal.Footer>
          </div>
        </Modal>
      </div>
    </div>
  );
};
