import { Route, Routes } from "react-router-dom";

import Board from "./routes/Board/Board";
import Main from "./routes/Template/Main/Main";
import { Template } from "./routes/Template/Template";
import { AuthProvider } from "./context/auth-context";
import { ProtectedRoute } from "./firebase/ProtectRouter";
import "./App.css";
import Login from "./routes/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route
          element={
            <AuthProvider>
              <ProtectedRoute />
            </AuthProvider>
          }
        >
          <Route path="board" element={<Board />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
