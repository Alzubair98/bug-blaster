import type { Action, Ticket } from "../reducers/ticketReducer";
import BlasterButton from "./BlasterButton";
import { useRef } from "react";
import gsap from "gsap";

// send priority class outside the ticket function to avoid re-creation on each render
const priorityClass = {
  1: "priority-low",
  2: "priority-medium",
  3: "priority-high",
};

export default function TicketItem({
  ticket,
  dispatch,
}: {
  ticket: Ticket;
  dispatch: React.Dispatch<Action>;
}) {
  const { title, description, priority } = ticket;
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDeleteAnimation = () => {
    if (!itemRef.current) return;

    gsap.to(itemRef.current, {
      opacity: 0,
      scale: 0.7,
      y: 50,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        dispatch({ type: "DELETE_TICKET", payload: ticket });
      },
    });
  };

  return (
    <div ref={itemRef} className="ticket-item text-white">
      <div
        className={`priority-dot ${
          priorityClass[parseInt(priority) as 1 | 2 | 3]
        }`}
      ></div>

      <h3>{title}</h3>
      <p>{description}</p>

      <BlasterButton
        type="button"
        className="mt-3 py-2 px-2"
        label="Delete"
        onClick={handleDeleteAnimation}
      ></BlasterButton>
    </div>
  );
}
