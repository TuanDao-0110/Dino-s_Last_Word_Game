// React
import { useContext, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setLogin } from "../../../features/GameSlice";

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
          <Modal.Title className={classes.modal_title}>Hi there!</Modal.Title>
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
