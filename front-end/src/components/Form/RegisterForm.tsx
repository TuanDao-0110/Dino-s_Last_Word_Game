import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { registerWithEmailAndPassword } from "../../firebase/firebase";
import { setLogin } from "../../features/GameSlice";

import { AuthContext } from "../../context/auth-context";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
};

function RegisterForm() {
  const dispatch = useAppDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password } = formFields;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send the email and password to firebase
      const userCredential = await registerWithEmailAndPassword(
        name,
        email,
        password
      );
      if (userCredential) {
        resetFormFields();
        setCurrentUser(userCredential);
        dispatch(setLogin(false));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default RegisterForm;
