import type { Action, Ticket } from "../reducers/ticketReducer";
import TicketItem from "./TicketItem";

export default function TicketList({
  tickets,
  dispatch,
}: {
  tickets: Ticket[];
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="ticket-list">
      {tickets.map((ticket: Ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} dispatch={dispatch} />
      ))}
    </div>
  );
}
