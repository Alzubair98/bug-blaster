export type Action =
  | { type: "ADD_TICKET"; payload: Ticket }
  | { type: "UPDATE_TICKET"; payload: Ticket }
  | { type: "DELETE_TICKET"; payload: Ticket }
  | { type: "SET_EDITING_TICKET"; payload: Ticket }
  | { type: "CLEAR_EDITING_TICKET" };

export interface InitialState {
  tickets: Ticket[];
}

export interface Ticket {
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

    case "SET_EDITING_TICKET":
      return {
        ...state,
        editingTicket: action.payload,
      };

    case "CLEAR_EDITING_TICKET":
      return {
        ...state,
        editingTicket: null,
      };
    default:
      return state;
  }
}
