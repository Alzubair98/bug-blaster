import {
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import BlasterButton from "./BlasterButton";
import gsap from "gsap";
import type { Action, InitialState } from "../reducers/ticketReducer";

interface TicketFormProps {
  dispatch: React.Dispatch<Action>;
  state: InitialState;
}

const TicketForm = forwardRef<HTMLFormElement, TicketFormProps>(
  ({ dispatch, state }, ref) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("1");

    // edit button ref
    const EditButton = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (state.editingTicket) {
        setTitle(state.editingTicket.title);
        setDescription(state.editingTicket.description);
        setPriority(state.editingTicket.priority);
      } else {
        clearForm();
      }
    }, [state.editingTicket]);

    useLayoutEffect(() => {
      if (state.editingTicket && EditButton.current) {
        gsap.fromTo(
          EditButton.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
      }
    }, [state.editingTicket]);

    const handleCancelAnimation = useCallback(() => {
      if (EditButton.current) {
        gsap.to(EditButton.current, {
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            dispatch({ type: "CLEAR_EDITING_TICKET" });
          },
        });
      }
    }, [dispatch]);

    const priorityLabels = useMemo(
      () => ({
        1: "Low",
        2: "Medium",
        3: "High",
      }),
      []
    );

    const animateClear = useCallback(() => {
      const fields = document.querySelectorAll(
        ".ticket-form input, .ticket-form textarea, .ticket-form fieldset"
      );

      gsap
        .timeline()
        .to(fields, {
          scale: 0.9,
          opacity: 0.5,
          duration: 0.15,
          ease: "power2.inOut",
        })
        .to(fields, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(2)",
          stagger: 0.05,
        });
    }, []);

    const clearForm = useCallback(() => {
      setTitle("");
      setDescription("");
      setPriority("1");
      animateClear();
    }, [animateClear]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();

        const ticketData = {
          id: state.editingTicket
            ? state.editingTicket.id
            : new Date().toISOString(),
          title,
          description,
          priority,
        };

        dispatch({
          type: state.editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
          payload: ticketData,
        });

        clearForm();
      },
      [title, description, priority, clearForm, dispatch, state.editingTicket]
    );

    return (
      <form
        ref={ref}
        action="#"
        onSubmit={handleSubmit}
        className="ticket-form text-white"
      >
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            className="form-input"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            className="form-input"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <fieldset className="priority-fieldset">
          <legend>Priority</legend>
          {Object.entries(priorityLabels).map(([value, label]) => (
            <label key={value} className="px-4 text-white">
              <input
                type="radio"
                value={value}
                checked={priority === value}
                className="priority-input"
                onChange={(e) => setPriority(e.target.value)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <BlasterButton
          type="submit"
          label={state.editingTicket ? "Update Ticket" : "Add Ticket"}
          className="mt-4 py-4 px-10"
        />

        {state.editingTicket && (
          <BlasterButton
            type="button"
            onClick={handleCancelAnimation}
            label={"Cancel Update"}
            className="mt-4 mx-4 py-4 px-10"
            ref={EditButton}
          />
        )}
      </form>
    );
  }
);

export default TicketForm;
