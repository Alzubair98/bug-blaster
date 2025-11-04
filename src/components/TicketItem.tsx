import type { Action, Ticket } from "../reducers/ticketReducer";
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
  const { id, title, description, priority } = ticket;

  return (
    <div className="ticket-item text-white">
      <div
        className={`priority-dot ${
          priorityClass[parseInt(priority) as 1 | 2 | 3]
        }`}
      ></div>

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
