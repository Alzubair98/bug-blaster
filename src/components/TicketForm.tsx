import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="ticket-form">
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
    </form>
  );
}
