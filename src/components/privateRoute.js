import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}
/* Former Private Routes Code
export default function PrivateRoute({ element: Element, ...rest }) {
    const { currentUser } = useAuth();
    return (
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? <Element {...props} /> : <Navigate to="/" />;
        }}
      ></Route>
    );
  }
  */
