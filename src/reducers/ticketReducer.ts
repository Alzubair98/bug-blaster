export type Action =
  | { type: "ADD_TICKET"; payload: Ticket }
  | { type: "UPDATE_TICKET"; payload: Ticket }
  | { type: "DELETE_TICKET"; payload: Ticket }
  | { type: "SET_EDITING_TICKET"; payload: Ticket }
  | { type: "CLEAR_EDITING_TICKET" }
  | { type: "SET_SORTING"; payload: string };

export interface InitialState {
  tickets: Ticket[];
  editingTicket: Ticket | null;
  sortPreference: string;
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

        editingTicket: null,
      };

    case "DELETE_TICKET":
      if (state.editingTicket && state.editingTicket.id === action.payload.id) {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket: Ticket) => ticket.id !== action.payload.id
          ),
          editingTicket: null,
        };
      } else {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket: Ticket) => ticket.id !== action.payload.id
          ),
        };
      }

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

    case "SET_SORTING":
      return {
        ...state,
        sortPreference: action.payload,
      };
    default:
      return state;
  }
}
