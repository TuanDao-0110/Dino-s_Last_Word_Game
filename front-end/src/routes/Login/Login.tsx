import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginForm from "../../components/Form/LoginForm";
import RegisterForm from "../../components/Form/RegisterForm";

const LoginRegister: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default LoginRegister;
