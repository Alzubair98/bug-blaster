export default function ticketReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_TICKET":
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket: any) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };

    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket: any) => ticket.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
