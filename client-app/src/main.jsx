import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import stores from "./stores/index.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={stores}>
    <BrowserRouter basename="/client-app/">
      <App />
    </BrowserRouter>
  </Provider>
);
