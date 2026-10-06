import { FAQ, REASONS } from "@/data/conditions";
import { GENERAL_ENQUIRY, bookingUrl } from "@/data/site";

/**
 * Доверие слева, вопросы справа (5fr / 1fr / 6fr).
 * FAQ на нативных <details>: раскрытие, клавиатура и семантика без JS.
 * Высоту ответа анимирует CSS (::details-content), плюс поворачивается на 45°.
 */
export function Trust() {
  return (
    <section className="section">
      <div className="wrap two">
        <div>
          <p className="eyebrow">04 — Доверие</p>
          <h2 className="h2" style={{ maxWidth: "14ch", lineHeight: 1.02 }} data-reveal>
            Почему нам можно доверить поездку
          </h2>
          <ul className="reasons" data-batch>
            {REASONS.map((reason) => (
              <li key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="spacer" />

        <div>
          <p className="eyebrow">05 — Вопросы</p>
          {/* h3, как и было: в структуре заголовков FAQ — часть блока доверия */}
          <h3
            style={{
              marginTop: 22,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Частые вопросы
          </h3>
          <div className="faq">
            {FAQ.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>
                  {item.q}
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <p className="faq-more">
            Не нашли свой вопрос:{" "}
            <a
              href={bookingUrl(GENERAL_ENQUIRY)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
            >
              спросите в WhatsApp
            </a>
            , отвечаем круглосуточно.
          </p>
        </div>
      </div>
    </section>
  );
}
