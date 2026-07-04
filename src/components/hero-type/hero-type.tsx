import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LETTERS = ["H", "a", "r", "v", "e", "y"];

const SCATTER = [
  { x: -220, y: 160, rotate: -28 },
  { x: -80, y: 200, rotate: -14 },
  { x: 60, y: 180, rotate: 6 },
  { x: 180, y: 220, rotate: 16 },
  { x: 300, y: 150, rotate: 26 },
  { x: 420, y: 190, rotate: 34 },
];

export const HeroType = component$(() => {
  const heroRef = useSignal<HTMLElement>();

  useVisibleTask$(({ cleanup }) => {
    const el = heroRef.value;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".hero-letter", {
          opacity: 0,
          y: 72,
          rotateX: -50,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
        });

        gsap.from(".hero-accent, .hero-tagline", {
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.45,
          ease: "power3.out",
        });
      }

      if (prefersReducedMotion) return;

      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter", el);

      letters.forEach((letter, index) => {
        const offset = SCATTER[index] ?? SCATTER[SCATTER.length - 1];

        gsap.to(letter, {
          x: offset.x,
          y: offset.y,
          rotation: offset.rotate,
          opacity: 0,
          scale: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-scroll-zone",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      gsap.to(".hero-accent, .hero-tagline, .scroll-hint", {
        opacity: 0,
        y: 32,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-scroll-zone",
          start: "top top",
          end: "45% top",
          scrub: 0.6,
        },
      });
    }, el);

    cleanup(() => ctx.revert());
  });

  return (
    <div class="hero-inner" ref={heroRef}>
      <h1 class="hero-name" aria-label="Harvey">
        {LETTERS.map((letter, index) => (
          <span class="hero-letter" key={letter + index}>
            {letter}
          </span>
        ))}
      </h1>
      <div class="hero-accent" aria-hidden="true" />
      <p class="hero-tagline">I build products on the web</p>
    </div>
  );
});
