import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroType } from "~/components/hero-type/hero-type";
import { ProjectCard } from "~/components/project-card/project-card";

export default component$(() => {
  const workRef = useSignal<HTMLElement>();

  useVisibleTask$(({ cleanup }) => {
    const el = workRef.value;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".work-label, .project-card", {
        opacity: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    cleanup(() => ctx.revert());
  });

  return (
    <main>
      <section class="hero-scroll-zone">
        <div class="hero-sticky">
          <HeroType />
          <p class="scroll-hint" aria-hidden="true">
            Scroll
          </p>
        </div>
      </section>

      <section class="work" ref={workRef}>
        <p class="work-label">Selected work</p>
        <ProjectCard
          title="Dishi"
          description="Discover the best food and restaurants in Manchester. Browse dishes, cuisines, and areas — or get surprised with something delicious."
          href="https://dishi.co/"
          tags={["Web app", "Food discovery", "Reviews", "Manchester"]}
          stats={[
            { label: "Dishes", value: "5,000+" },
            { label: "Restaurants", value: "180+" },
          ]}
        />
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Harvey",
  meta: [
    {
      name: "description",
      content: "Harvey — portfolio",
    },
  ],
};
