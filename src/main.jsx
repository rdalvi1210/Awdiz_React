import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./pages/22-08/Context/ContextProvider.jsx";
import { store } from "./redux/Store.js";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ContextProvider>
);
