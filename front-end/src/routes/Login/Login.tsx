import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInUser } from "../../firebase/firebase";
 const defaultFormFields = {
   email: "",
   password: "",
 };
const Login = () => {

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
    <div >
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


