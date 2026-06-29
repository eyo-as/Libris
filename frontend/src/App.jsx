import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";
import ReadingList from "./pages/ReadingList";
import ReadingForm from "./pages/ReadingForm";
import ReadingDetail from "./pages/ReadingDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reading" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          {/* protected routes here */}
          <Route path="/reading" element={<ReadingList />} />
          <Route path="/reading/new" element={<ReadingForm />} />
          <Route path="/reading/:itemId" element={<ReadingDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/reading" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
