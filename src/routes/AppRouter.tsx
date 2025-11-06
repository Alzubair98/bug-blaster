import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/dashboard";
import type { Action, InitialState, Ticket } from "../reducers/ticketReducer";

export default function AppRouter({
  dispatch,
  state,
  sortedTickets,
}: {
  dispatch: React.Dispatch<Action>;
  state: InitialState;
  sortedTickets: Ticket[];
}) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            dispatch={dispatch}
            state={state}
            sortedTickets={sortedTickets}
          />
        }
      />
    </Routes>
  );
}
