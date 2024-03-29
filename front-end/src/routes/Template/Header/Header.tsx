// React
import { useContext, useState, useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setLogin, setModal } from "../../../features/GameSlice";
import { setPlayerDispatch } from "../../../features/PlayerSlice";

// Firebase, auth
import { AuthContext } from "../../../context/auth-context";

// Bootstrap
import { Modal, Tab, Tabs } from "react-bootstrap";

// Resources / Components
import {
  LoginForm,
  RegisterForm,
  BtnPrimary,
  BtnSuccess,
  BtnWarning,
} from "../../../assets/export_component/resource";

// Styles
import classes from "./header.module.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const { showLogin } = useAppSelector((state) => state.game);
  const { currentUser, setCurrentUser, signOut } = useContext(AuthContext);
  const { players } = useAppSelector((state) => state.player);
  const [activeTab, setActiveTab] = useState("login");

  const handleCloseLogin = () => {
    dispatch(setModal(false));
    dispatch(setLogin(false));
  };
  const handleShowLogin = () => {
    setActiveTab("login");
    dispatch(setModal(true));
    dispatch(setLogin(true));
  };

  const handleShowRegister = () => {
    dispatch(setModal(true));
    setActiveTab("register");
    dispatch(setLogin(true));
  };
  useEffect(() => {
    if (currentUser && !players) {
      dispatch(setPlayerDispatch(currentUser));
    }
  }, [currentUser, dispatch, players]);
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
            <p className={classes.header_text}>
              {players?.userInfo._fieldsProto?.name.stringValue}
            </p>
            <BtnWarning text="Log out" clickHandler={() => signOut()} />
          </>
        )}
      </div>
      <Modal
        className={classes.modal}
        show={showLogin}
        onHide={handleCloseLogin}
        size="sm"
      >
        <Modal.Header
          className={`border-0 ${classes.modal_header}`}
          closeButton
        >
          <div></div>
          <h2 className={classes.modal_title}>Hi there!</h2>
        </Modal.Header>
        <Tabs
          defaultActiveKey={activeTab}
          id="uncontrolled-tab-example"
          className={`mb-3 ${classes.tabs}`}
        >
          <Tab className={classes.tab} eventKey="login" title="Login">
            <LoginForm />
          </Tab>
          <Tab className={classes.tab} eventKey="register" title="Register">
            <RegisterForm />
          </Tab>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Header;
