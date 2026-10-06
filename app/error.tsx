"use client";

import { useEffect } from "react";
import { CONTACT, GENERAL_ENQUIRY, bookingUrl } from "@/data/site";

/**
 * Граница ошибки страницы.
 *
 * Текст без кодов и стек-трейсов: посетителю нужно понимать, что делать дальше,
 * а не что упало. Путь к заявке остаётся открытым даже в этом состоянии, потому
 * что WhatsApp работает независимо от того, что сломалось на сайте.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ошибку не глотаем: без этого причина потеряется совсем.
    console.error(error);
  }, [error]);

  return (
    <main className="section" style={{ borderTop: 0, minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <div className="wrap">
        <h1 className="h2" style={{ marginTop: 22, maxWidth: "20ch" }}>
          Страница не загрузилась
        </h1>
        <p className="lead">
          Что-то пошло не так на нашей стороне. Попробуйте обновить: обычно
          этого достаточно. Если не помогло, напишите нам — подберём машину с
          водителем в переписке.
        </p>

        <div className="hero-cta">
          <button type="button" onClick={reset} className="btn btn-acc">
            Обновить страницу
          </button>
          <a
            className="btn btn-line"
            href={bookingUrl(GENERAL_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp"
          >
            Написать в WhatsApp
          </a>
        </div>

        <p className="faq-more" style={{ marginTop: 40 }}>
          Телефон:{" "}
          <a
            href={CONTACT.phoneHref}
            className="tnum"
          >
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </div>
    </main>
  );
}
