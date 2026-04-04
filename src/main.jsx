import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserEnquiry from "./UserEnquiry.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserEnquiry />
  </StrictMode>,
);
