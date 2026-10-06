"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Вся скролл-хореография страницы в одном месте (BRIEF §5).
 * Компоненты только помечают узлы data-атрибутами, анимации живут здесь.
 *
 * Правила: внутри gsap.matchMedia(); пин hero — только на десктопе;
 * при reduced motion движения нет, остаются только функциональные вещи
 * (мобильная панель связи); анимируем transform, opacity и filter.
 */
export function ScrollScenes() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const q = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(document.querySelectorAll<T & Element>(sel)) as T[];

    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const heroCar = document.querySelector<HTMLElement>("[data-hero-car]");
    const heroCopy = document.querySelector<HTMLElement>("[data-hero-copy]");
    const final = document.querySelector<HTMLElement>("[data-final]");
    const mbar = document.querySelector<HTMLElement>("[data-mbar]");
    const steps = q("[data-step]");

    // Мобильная панель связи: функциональная, работает и при reduced motion.
    const barTrigger =
      hero && final && mbar
        ? ScrollTrigger.create({
            trigger: hero,
            start: "bottom 80%",
            endTrigger: final,
            end: "top bottom",
            toggleClass: { targets: mbar, className: "is-shown" },
          })
        : null;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1025px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions as {
          motion: boolean;
          desktop: boolean;
        };

        if (!motion) {
          steps.forEach((s) => s.classList.add("is-active"));
          return;
        }

        // ---- шапка: вниз — прячется, вверх — возвращается ----
        if (header) {
          const show = (visible: boolean) =>
            gsap.to(header, {
              yPercent: visible ? 0 : -120,
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          ScrollTrigger.create({
            start: "top -80",
            end: "max",
            onUpdate: (s) => show(s.direction !== 1),
            onLeaveBack: () => show(true),
          });
        }

        // ---- hero уходит по скроллу ----
        if (hero && heroCar && heroCopy) {
          if (desktop) {
            // Пин без отступа: манифест наезжает на сцену сверху
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  pin: true,
                  pinSpacing: false,
                  scrub: true,
                },
              })
              .to(heroCar, { x: "12vw", autoAlpha: 0.3, ease: "none" }, 0)
              .to(heroCopy, { y: -60, autoAlpha: 0, ease: "none" }, 0);
          } else {
            gsap.to(heroCar, {
              xPercent: 6,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: heroCar,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        }

        // ---- заголовки секций: строки из маски, черта надзаголовка ----
        q("[data-reveal]").forEach((h2) => {
          SplitText.create(h2, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 100,
                duration: 0.8,
                stagger: 0.08,
                ease: "power4.out",
                scrollTrigger: { trigger: h2, start: "top 80%", once: true },
              }),
          });
        });

        q(".section .eyebrow").forEach((eyebrow) => {
          gsap.fromTo(
            eyebrow,
            { "--eyebrow-x": 0 },
            {
              "--eyebrow-x": 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: eyebrow, start: "top 80%", once: true },
            },
          );
        });

        // ---- манифест: слова подсвечиваются по скроллу ----
        const manifest = document.querySelector<HTMLElement>("[data-manifest-text]");
        if (manifest) {
          const split = SplitText.create(manifest, { type: "words", wordsClass: "word" });
          gsap.fromTo(
            split.words,
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: manifest,
                start: "top 75%",
                end: "bottom 45%",
                scrub: 0.5,
              },
            },
          );
        }

        // ---- каскады: автопарк, bento, условия, доводы ----
        q("[data-batch]").forEach((group) => {
          const items = Array.from(group.children) as HTMLElement[];
          gsap.set(items, { y: 30, autoAlpha: 0 });
          ScrollTrigger.batch(items, {
            start: "top 85%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                overwrite: true,
              }),
          });
        });

        // ---- шаги: линия заливается, шаги загораются по очереди ----
        const stepsWrap = document.querySelector<HTMLElement>("[data-steps]");
        const fill = document.querySelector<HTMLElement>("[data-steps-fill]");
        if (stepsWrap && steps.length) {
          gsap.set(steps, { opacity: 0.4 });
          const activate = (step: HTMLElement, on: boolean) => {
            if (step.classList.contains("is-active") === on) return;
            step.classList.toggle("is-active", on);
            gsap.to(step, { opacity: on ? 1 : 0.4, duration: 0.4, overwrite: true });
          };

          if (desktop && fill) {
            gsap.fromTo(
              fill,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: stepsWrap,
                  start: "top 60%",
                  end: "bottom 45%",
                  scrub: 0.6,
                  onUpdate: (self) =>
                    steps.forEach((step, i) =>
                      activate(step, self.progress > 0 && self.progress >= i / steps.length),
                    ),
                },
              },
            );
          } else {
            steps.forEach((step) =>
              ScrollTrigger.create({
                trigger: step,
                start: "top 60%",
                onEnter: () => activate(step, true),
                onLeaveBack: () => activate(step, false),
              }),
            );
          }
        }

        return () => {
          steps.forEach((s) => s.classList.remove("is-active"));
        };
      },
    );

    return () => {
      barTrigger?.kill();
      mm.revert();
    };
  }, []);

  return null;
}
