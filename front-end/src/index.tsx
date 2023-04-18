import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";

import "./index.css";
import { AuthProvider } from "./context/auth-context";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        ></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);

// React
// Redux
// Bootstrap
// Components
// API
// Types
// Styles
