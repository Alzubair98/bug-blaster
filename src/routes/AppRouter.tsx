import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/dashboard";
import type { Action } from "../reducers/ticketReducer";

export default function AppRouter({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/dashboard" element={<Dashboard dispatch={dispatch} />} />
    </Routes>
  );
}
