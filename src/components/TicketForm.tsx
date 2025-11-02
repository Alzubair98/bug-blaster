import { useState } from "react";
import BlasterButton from "./BlasterButton";

export default function TicketFrom() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  const prirityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearFrom = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFrom();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form text-white">
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

        {Object.entries(prirityLabels).map(([value, label]) => (
          <label key={value} className="px-4 text-white">
            <input
              type="radio"
              value={value}
              checked={priority == value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            ></input>
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
