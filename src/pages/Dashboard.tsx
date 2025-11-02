import { useEffect, useRef } from "react";
import gsap from "gsap";
import TicketFrom from "../components/TicketForm";

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(
      textRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );
  });
  return (
    <div
      ref={containerRef}
      className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-center overflow-hidden"
    >
      <div className="container">
        <h1
          ref={textRef}
          className="text-4xl font-bold mb-6 text-center text-white"
        >
          Dashboard
        </h1>

        <TicketFrom />
      </div>
    </div>
  );
}
