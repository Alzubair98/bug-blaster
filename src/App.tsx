import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function App() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const blastIcons = useRef<HTMLSpanElement[]>([]);
  const blastContainer = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(
      titleRef.current,
      { x: -200, opacity: 0, rotate: -5 },
      { x: 0, opacity: 1, rotate: 0, duration: 1.2 },
      "-=0.5"
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );

    tl.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(2)",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        },
      },
      "-=0.4"
    );
  }, []);

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
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-center overflow-hidden"
    >
      <h1
        ref={titleRef}
        className="text-6xl font-extrabold mb-4 text-white select-none"
      >
        🐞 <span className="text-red-500">Bug</span>{" "}
        <span className="text-green-400">Blaster</span>
      </h1>

      <p
        ref={subtitleRef}
        className="text-gray-400 text-xl mb-10 max-w-md leading-relaxed"
      >
        Track, fix, and obliterate bugs with cinematic precision 💥
      </p>

      <div className="relative inline-block">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 w-[180px] h-[70px] rounded-2xl bg-gradient-to-r from-red-500 to-green-500 blur-2xl opacity-0 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          ref={blastContainer}
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
        ></div>
        <button
          ref={buttonRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className="relative z-10 px-12 py-5 cursor-pointer bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
        >
          Launch the Blaster 🚀
        </button>
      </div>
    </div>
  );
}
