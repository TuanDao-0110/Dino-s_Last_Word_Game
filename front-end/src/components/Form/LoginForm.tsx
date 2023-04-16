import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { signInUser } from "../../firebase/firebase";
import { AuthContext } from "../../context/auth-context";
import { setLogin } from "../../features/GameSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { setPlayerDispatch } from "../../features/PlayerSlice";
import { BtnSubmit } from "../../assets/export_component/resource";

const defaultFormFields = {
  email: "",
  password: "",
};

function LoginForm() {
  const dispatch = useAppDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send the email and password to firebase
      const userCredential = await signInUser(email, password);
      console.log("SETTING", userCredential?.user);
      if (userCredential) {
        resetFormFields();
        setCurrentUser(userCredential.user);
        dispatch(setPlayerDispatch(userCredential.user));
        dispatch(setLogin(false));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target;
    setFormFields({ ...formFields, [type]: value });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <BtnSubmit text="Login" />
    </Form>
  );
}

export default LoginForm;
