import { useEffect, useRef } from "react";
import gsap from "gsap";
import TicketForm from "../components/TicketForm";
import type { Action, InitialState, Ticket } from "../reducers/ticketReducer";
import TicketList from "../components/TicketList";

export default function Dashboard({
  dispatch,
  state,
  sortedTickets,
}: {
  dispatch: React.Dispatch<Action>;
  state: InitialState;
  sortedTickets: Ticket[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(
      textRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );

    tl.fromTo(
      formRef.current,
      { scale: 0.5, y: -400, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: "back.out(2)" },
      "-=0.4"
    );
  }, []);
  return (
    //  need to fix the overflow-hidden
    <div
      ref={containerRef}
      className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-center overflow-hidden"
    >
      <div className="container">
        <h1
          ref={textRef}
          className="text-4xl font-bold mb-6 text-center text-white"
        >
          Dashboard
        </h1>

        <TicketForm ref={formRef} dispatch={dispatch} state={state} />

        {state.tickets.length > 0 && (
          <div className="results">
            <h2 className="mt-5 text-white text-2xl">All Tickets</h2>

            <select
              className="text-white"
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to Low" className="text-black">
                High to Low
              </option>
              <option value="Low to High" className="text-black">
                Low to High
              </option>
            </select>

            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
              formRef={formRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}
