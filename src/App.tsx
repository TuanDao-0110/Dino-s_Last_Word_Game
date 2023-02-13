import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Template } from "./pages/Template/Template";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>

        
      </Route>
    </Routes>
  );
}

export default App;
