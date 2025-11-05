import type { Action, Ticket } from "../reducers/ticketReducer";
import BlasterButton from "./BlasterButton";
import { useRef } from "react";
import gsap from "gsap";

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
  const { title, description, priority } = ticket;
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDeleteAnimation = () => {
    if (!itemRef.current) return;

    const listContainer = itemRef.current.parentElement;

    const siblings = listContainer
      ? Array.from(listContainer.querySelectorAll(".ticket-item"))
      : [];

    const positionsBefore = siblings.map((el) => ({
      el,
      y: el.getBoundingClientRect().top,
    }));

    gsap.to(itemRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        dispatch({ type: "DELETE_TICKET", payload: ticket });

        requestAnimationFrame(() => {
          if (!listContainer) return;

          const remainingItems = Array.from(
            listContainer.querySelectorAll(".ticket-item")
          );

          const positionsAfter = remainingItems.map((el) => ({
            el,
            y: el.getBoundingClientRect().top,
          }));

          positionsAfter.forEach((after) => {
            const before = positionsBefore.find((b) => b.el === after.el);
            if (!before) return;
            const dy = before.y - after.y;
            if (dy) {
              gsap.fromTo(
                after.el,
                { y: dy },
                { y: 0, duration: 0.4, ease: "power2.out" }
              );
            }
          });
        });
      },
    });
  };

  return (
    <div ref={itemRef} className="ticket-item text-white">
      <div
        className={`priority-dot ${
          priorityClass[parseInt(priority) as 1 | 2 | 3]
        }`}
      ></div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="flex gap-5 justify-center">
        <BlasterButton
          type="button"
          className="mt-3 py-2 px-2"
          label="Delete"
          onClick={handleDeleteAnimation}
        />

        <BlasterButton
          type="button"
          className="mt-3 py-2 px-2 "
          label="Edit"
          onClick={() =>
            dispatch({ type: "SET_EDITING_TICKET", payload: ticket })
          }
        />
      </div>
    </div>
  );
}
