"use client";

import { useEffect, useState } from "react";

/**
 * true, пока страница прокручена дальше первого экрана, но блок контактов ещё
 * не в кадре. В hero и в контактах те же кнопки уже стоят на экране, и
 * плавающие дубли поверх них не нужны.
 */
export function useBetweenHeroAndContacts(): boolean {
  const [pastHero, setPastHero] = useState(false);
  const [atContacts, setAtContacts] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contacts = document.getElementById("contacts");
    if (!contacts) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtContacts(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(contacts);
    return () => observer.disconnect();
  }, []);

  return pastHero && !atContacts;
}
