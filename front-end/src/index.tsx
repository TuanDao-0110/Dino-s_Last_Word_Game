import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";

import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
