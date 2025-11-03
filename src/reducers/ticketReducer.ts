type Action =
  | { type: "ADD_TICKET"; payload: Ticket }
  | { type: "UPDATE_TICKET"; payload: Ticket }
  | { type: "DELETE_TICKET"; payload: Ticket };

interface InitialState {
  tickets: Ticket[];
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
}

export default function ticketReducer(state: InitialState, action: Action) {
  switch (action.type) {
    case "ADD_TICKET":
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket: Ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };

    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket: Ticket) => ticket.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
