import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./pages/22-08/Context/ContextProvider.jsx";
import { store } from "./pages/23-08/Assignment/redux/store.js";
import CalculatorProvider from "./pages/30-08/Assignment/CalcContext/CalculatorContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextProvider>
      <CalculatorProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CalculatorProvider>
    </ContextProvider>
  </Provider>
);
