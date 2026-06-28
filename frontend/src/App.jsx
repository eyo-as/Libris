import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Navigate to="/reading" replace />} />

        <Route element={<ProtectedRoute />}>
          {/* protected routes here */}
        </Route>

        <Route path="*" element={<Navigate to="/reading" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
