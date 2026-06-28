import { useAuth } from "../hooks/authContext";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
