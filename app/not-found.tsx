import Link from "next/link";
import { CONTACT, GENERAL_ENQUIRY, SITE, bookingUrl } from "@/data/site";

export const metadata = { title: "Страница не найдена" };

export default function NotFound() {
  return (
    <main className="section" style={{ borderTop: 0, minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="h2" style={{ marginTop: 22, maxWidth: "20ch" }}>
          Такой страницы нет
        </h1>
        <p className="lead">
          Ссылка устарела или в адресе опечатка. Автопарк и условия заказа на
          месте, а если нужна конкретная машина на дату, быстрее просто
          спросить.
        </p>

        <div className="hero-cta">
          <a className="btn btn-acc" href="/">Вернуться на главную</a>
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
          Или позвоните:{" "}
          <Link
            href={CONTACT.phoneHref}
            className="tnum"
          >
            {CONTACT.phoneDisplay}
          </Link>
          <span className="sr-only"> ({SITE.name})</span>
        </p>
      </div>
    </main>
  );
}
