import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useReducer } from "react";
import ticketReducer from "./reducers/ticketReducer";
import { sortTickets } from "./utilities/sortingUtilities";

export default function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: "Hight to Low",
  };

  // use reducer
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  // create sorted tickets
  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  return (
    <>
      <BrowserRouter>
        <AppRouter
          dispatch={dispatch}
          state={state}
          sortedTickets={sortedTickets}
        />
      </BrowserRouter>
    </>
  );
}
