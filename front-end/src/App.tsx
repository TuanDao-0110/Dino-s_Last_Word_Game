import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./routes/Template/Main/Main";
import { Template } from "./routes/Template/Template";
import LoginForm from "./components/Form/LoginForm";
import RegisterForm from "./components/Form/RegisterForm";
// import LoginForm from "./components/Form/LoginForm";

function App() {
  /* setCurrentUser(userCredential.user);
        dispatch(setPlayerDispatch(userCredential.user));
        dispatch(setLogin(false)); */
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Main />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Route>
    </Routes>
  );
}

export default App;
