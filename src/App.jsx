import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/protectedRoutes";


export default function App() {
  return (
    <Routes>

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}