import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useState,
  useRef,
} from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signInUser } from "../../firebase/firebase";
import Board from "../../routes/Board/Board";
import { AuthContext } from "../../context/auth-context";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToLeaderboard, setModal } from "../../features/GameSlice";

const defaultFormFields = {
  email: "",
  password: "",
};

function RegisterForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const dispatch = useAppDispatch();
  const { score, showModal } = useAppSelector((state) => state.game);
  const nameInput = useRef(null);

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target;
    setFormFields({ ...formFields, [type]: value });
  };
  return !currentUser ? (
    <Form onSubmit={handleSubmit}>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control
            type="text"
            value={email}
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

        <Button type="submit">Submit</Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Form>
    </Form>
  ) : (
    <Board />
  );
}

export default RegisterForm;
