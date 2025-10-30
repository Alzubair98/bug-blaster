import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function App() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      <button
        ref={buttonRef}
        className="px-12 py-5 cursor-pointer bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all"
      >
        Launch the Blaster 🚀
      </button>
    </div>
  );
}
