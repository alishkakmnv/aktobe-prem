import { CONTACT, GENERAL_ENQUIRY, SITE, bookingUrl } from "@/data/site";
import { Roll } from "@/components/ui/Roll";
import { ArrowRight } from "@/components/ui/icons";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Contacts() {
  return (
    <section id="contacts" className="section final" data-final>
      <div className="wrap">
        {/* #0F3D2E — плоскость, а не контрол: кнопок на ней нет */}
        <div className="final-plane">
          <div>
            <p className="eyebrow">06 — Контакты</p>
            <h2 className="h2" data-reveal>
              Готовы к выезду?
            </h2>
            <p className="final-text">
              Напишите в WhatsApp: подберём машину под событие и число гостей,
              назовём полную стоимость и подадим авто с водителем к нужному
              часу.
            </p>
          </div>
        </div>

        <div className="big-links">
          <a
            className="big"
            href={bookingUrl(GENERAL_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp"
          >
            <Roll>Написать в WhatsApp</Roll>
            <ArrowRight size={44} strokeWidth={1.4} className="accent" />
          </a>
          <a className="big tnum" href={CONTACT.phoneHref} data-track="phone">
            <Roll>{CONTACT.phoneDisplay}</Roll>
            <ArrowRight size={44} strokeWidth={1.4} className="accent" />
          </a>
        </div>

        <address className="final-meta" style={{ fontStyle: "normal" }}>
          <span>
            <b>Адрес</b>
            {CONTACT.address}
          </span>
          <span>
            <b>Режим</b>
            {capitalize(CONTACT.hours)}
          </span>
        </address>
      </div>
    </section>
  );
}

/** Ссылки на политику нет: такой страницы в проекте пока не существует. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>
          <b>AKTOBE</b> <span className="accent">PREMIUM</span> · © 2026{" "}
          <span className="sr-only">{SITE.name}</span>
        </span>
      </div>
    </footer>
  );
}
