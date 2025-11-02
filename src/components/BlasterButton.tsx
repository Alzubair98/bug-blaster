import { useRef, forwardRef } from "react";
import gsap from "gsap";

interface BlasterButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  colors?: {
    from?: string;
    to?: string;
  };
}

const BlasterButton = forwardRef<HTMLDivElement, BlasterButtonProps>(
  (
    {
      label,
      onClick,
      className = "",
      type = "button",
      colors = { from: "from-red-500", to: "to-green-500" },
    },
    ref
  ) => {
    const blastContainer = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const createBlastIcon = () => {
      if (!blastContainer.current) return;
      const icons = ["💥", "🚀", "🐞", "🔥"];
      const icon = document.createElement("span");
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];
      icon.style.position = "absolute";
      icon.style.left = "50%";
      icon.style.top = "50%";
      icon.style.transform = "translate(-50%, -50%)";
      icon.style.fontSize = "1.5rem";
      icon.style.pointerEvents = "none";
      blastContainer.current.appendChild(icon);

      const angle = Math.random() * Math.PI * 2;
      const distance = 90 + Math.random() * 60;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.fromTo(
        icon,
        { opacity: 1, scale: 0.8, x: 0, y: 0 },
        {
          x,
          y: y - 50,
          opacity: 50,
          scale: 1.5,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => icon.remove(),
        }
      );
    };

    // عند hover
    const handleHover = () => {
      if (intervalRef.current) return;

      // إضاءة الزر (glow)
      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.2,
        duration: 0.3,
        ease: "power1.out",
      });

      // بدء توليد الأيقونات بشكل متكرر وسريع
      intervalRef.current = window.setInterval(createBlastIcon, 120);
    };

    // عند مغادرة الماوس
    const handleLeave = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // إيقاف الإضاءة تدريجيًا
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };

    return (
      <div ref={ref} className="relative inline-block">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 w-[180px] h-[70px] rounded-2xl bg-gradient-to-r from-red-500 to-green-500 blur-2xl opacity-0 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          ref={blastContainer}
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
        ></div>
        <button
          type={type}
          onClick={onClick}
          ref={buttonRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className={`relative z-10 cursor-pointer bg-gradient-to-r ${colors.from} ${colors.to} hover:from-red-600 hover:to-green-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden ${className}`}
        >
          {label}
        </button>
      </div>
    );
  }
);

export default BlasterButton;
