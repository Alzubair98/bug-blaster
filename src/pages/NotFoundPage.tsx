import gsap from "gsap";
import { useRef, useEffect } from "react";
import BlasterButton from "../components/BlasterButton";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "+=0.2"
    );

    tl.to(sparkRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }, []);

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

      <BlasterButton
        ref={buttonRef}
        className="py-4 px-8 mt-5"
        label="Go Home"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  );
}
