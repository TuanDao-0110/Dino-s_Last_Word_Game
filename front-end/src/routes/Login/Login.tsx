import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../firebase/firebase";
import { AuthContext } from "../../context/auth-context";
const defaultFormFields = {
  email: "",
  password: "",
};
const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div>
            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
