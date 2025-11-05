import type { Action, Ticket } from "../reducers/ticketReducer";
import TicketItem from "./TicketItem";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function TicketList({
  tickets,
  dispatch,
  formRef,
}: {
  tickets: Ticket[];
  dispatch: React.Dispatch<Action>;
  formRef: React.RefObject<HTMLFormElement>;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const prevCount = useRef<number>(0); // we will use this to track tickets length

  useEffect(() => {
    if (!listRef.current) return;

    if (tickets.length > prevCount.current) {
      const newTicket = listRef.current.lastElementChild;
      if (newTicket) {
        gsap.from(newTicket, {
          y: -50,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }
    }

    // حفظ العدد الحالي للمقارنة في المرات القادمة
    prevCount.current = tickets.length;
  }, [tickets.length]);

  return (
    <div ref={listRef} className="ticket-list">
      {tickets.map((ticket: Ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          dispatch={dispatch}
          formRef={formRef}
        />
      ))}
    </div>
  );
}
