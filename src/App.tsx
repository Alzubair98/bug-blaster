import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useReducer } from "react";
import ticketReducer from "./reducers/ticketReducer";

export default function App() {
  const initialState = { tickets: [] };

  // use reducer
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  return (
    <>
      <BrowserRouter>
        <AppRouter dispatch={dispatch} />
      </BrowserRouter>
    </>
  );
}
