import Image from "next/image";
import { SCENARIOS } from "@/data/scenarios";
import { bookingUrl, scenarioEnquiry } from "@/data/site";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Bento: одна большая плитка 2×2 и пять малых. Плитка — ссылка в WhatsApp
 * с текстом про сценарий. Фото ч/б, на hover проявляется цвет.
 */
export function Scenarios() {
  return (
    <section className="section" aria-labelledby="scenarios-title">
      <div className="wrap">
        <p className="eyebrow">Сценарии</p>
        <h2 id="scenarios-title" className="h2" data-reveal>
          На какие события заказывают
        </h2>

        <div className="bento" data-batch>
          {SCENARIOS.map((s, i) => (
            <a
              key={s.id}
              className={`tile${i === 0 ? " is-big" : ""}`}
              href={bookingUrl(scenarioEnquiry(s.title))}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              aria-label={`${s.title}: написать в WhatsApp`}
            >
              <div className="ph">
                <Image
                  src={s.photo}
                  alt={s.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 820px"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  }
                  style={{ objectPosition: s.photoPosition }}
                />
              </div>
              <div className="tile-body">
                <div>
                  <h3 className="h3">{s.title}</h3>
                  {s.note && <p>{s.note}</p>}
                </div>
                <span className="tile-arrow">
                  <ArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
