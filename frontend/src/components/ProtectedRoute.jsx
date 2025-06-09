import { Navigate } from "react-router-dom";
import { LoginStore } from "../stores/logins.store.js";

export const ProtectedRoute = ({ children }) => {
  const token = LoginStore((state) => state.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
