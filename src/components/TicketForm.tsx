import { useState, useCallback, useMemo, useRef, forwardRef } from "react";
import BlasterButton from "./BlasterButton";
import gsap from "gsap";

interface TicketFormProps {
  onSubmit?: (data: {
    title: string;
    description: string;
    priority: string;
  }) => void;
}

const TicketForm = forwardRef<HTMLFormElement, TicketFormProps>(
  ({ onSubmit }, ref) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("1");

    const priorityLabels = useMemo(
      () => ({
        1: "Low",
        2: "Medium",
        3: "High",
      }),
      []
    );

    const clearForm = useCallback(() => {
      setTitle("");
      setDescription("");
      setPriority("1");
    }, []);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        const formData = { title, description, priority };
        onSubmit?.(formData);
        clearForm();
      },
      [title, description, priority, clearForm, onSubmit]
    );

    return (
      <form
        ref={ref}
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
          label="Create Ticket"
          className="mt-4 py-4 px-10"
        />
      </form>
    );
  }
);

export default TicketForm;
