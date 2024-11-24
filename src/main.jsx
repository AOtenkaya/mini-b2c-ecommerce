import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "@/App"; // Simplified import using @/
import store from "@/store"; // Simplified import using @/
import { ThemeProvider } from "@/context/ThemeContext"; // Simplified import using @/

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
