import gsap from "gsap";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const blastContainer = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const intervalRef = useRef<number | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(
      sparkRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1.5,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
      "-=0.2"
    );

    tl.fromTo(
      numberRef.current,
      { scale: 0, opacity: 0, rotateX: 90 },
      { scale: 1, opacity: 1, rotateX: 0, duration: 1.2 },
      "-=0.3"
    );

    // 💬 النص يظهر تدريجيًا وكأنه glitch typing
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // ✨ وميض نهائي للشرارة
    tl.to(sparkRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "power1.inOut",
    });
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
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-center"
    >
      <div
        ref={sparkRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl select-none"
      >
        💥
      </div>

      <h1
        ref={numberRef}
        className="text-[8rem] font-extrabold text-red-500 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)] select-none"
      >
        404
      </h1>

      <p
        ref={textRef}
        className="text-gray-400 text-2xl mt-2 font-light tracking-wide"
      >
        Page Not Found.
      </p>

      <div
        ref={blastContainer}
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
      ></div>
      <Link
        to="/"
        ref={buttonRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="mt-10 px-8 py-3 cursor-pointer bg-gradient-to-r from-red-500 to-green-500 text-white rounded-xl font-semibold text-lg hover:from-red-600 hover:to-green-600 shadow-lg transition-transform duration-300 hover:scale-105"
      >
        Return to Base 🚀
      </Link>

      <div
        ref={blastContainer}
        className="absolute left-0 top-40 w-full h-full pointer-events-none"
      ></div>
    </div>
  );
}
