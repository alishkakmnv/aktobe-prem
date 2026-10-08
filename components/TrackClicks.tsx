"use client";

import { useEffect } from "react";

type Tracker = {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

/**
 * Конверсии по кликам на wa.me и tel:. Ссылки помечены data-track="whatsapp|phone".
 * Своей аналитики у сайта пока нет: если подключат gtag или GTM, события
 * пойдут туда без правок разметки.
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("[data-track]");
      if (!link) return;

      const kind = link.getAttribute("data-track");
      const name = kind === "phone" ? "click_phone" : "click_whatsapp";
      const w = window as unknown as Tracker;

      w.gtag?.("event", name, { event_category: "lead", link_url: link.getAttribute("href") });
      w.dataLayer?.push({ event: name });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
