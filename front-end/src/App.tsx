import { Route, Routes } from "react-router-dom";

import Score from "./components/score/Score";
import Board from "./routes/Board/Board";
import Main from "./routes/Template/Main/Main";
import { Template } from "./routes/Template/Template";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Main />} />
        <Route path="board" element={<Board />} />
      </Route>
    </Routes>
  );
}

export default App;
