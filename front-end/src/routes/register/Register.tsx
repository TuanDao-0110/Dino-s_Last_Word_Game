import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../firebase/firebase";
import { AuthContext } from "../../context/auth-context";
const defaultFormFields = {
  email: "",
  password: "",
  name: "",
};
const Register = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, name } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Send the email and password to firebase
      const user = await registerWithEmailAndPassword(name, email, password);
      if (user) {
        resetFormFields();
        setCurrentUser(user);
        navigate("/board");
      }
    } catch (error: any) {
      console.log("User Sign In Failed", error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button>submit!</button>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
