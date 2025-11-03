import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

export default function App() {
  const initialState = { tickets: [] };
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}
