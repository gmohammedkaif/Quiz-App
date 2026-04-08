import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../services/firebase";

const ProtectedRoute = ({ children }) => {
  const reduxEmail = useSelector((state) => state.user?.email);
  const storedEmail = localStorage.getItem("userEmail");
  const firebaseUser = auth.currentUser;

  const isAuthenticated =
    reduxEmail || storedEmail || firebaseUser?.email;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;