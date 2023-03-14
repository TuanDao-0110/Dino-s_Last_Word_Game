import "./App.css";
import { Route, Routes } from "react-router-dom";
import Board from "./routes/Board/Board";
import Main from "./routes/Template/Main/Main";
import { Template } from "./routes/Template/Template";
import { ProtectedRoute } from "./firebase/ProtectRouter";
import RegisterForm from "./components/Form/RegisterForm";
import LoginForm from "./components/Form/LoginForm";
import { useEffect } from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Main />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/board" element={<Board />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
