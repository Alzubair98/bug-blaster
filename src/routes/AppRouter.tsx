import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/dashboard";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
