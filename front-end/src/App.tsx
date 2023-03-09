import "./App.css";
import { Route, Routes } from "react-router-dom";
import Board from "./routes/Board/Board";
import Main from "./routes/Template/Main/Main";
import { Template } from "./routes/Template/Template";
import { ProtectedRoute } from "./firebase/ProtectRouter";
import Register from "./routes/register/Register";
import Login from "./routes/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/board" element={<Board />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
