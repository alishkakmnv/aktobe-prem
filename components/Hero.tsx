import Image from "next/image";
import { CAR_COUNT, HERO_CAR, MIN_PRICE } from "@/data/cars";
import { CONTACT, GENERAL_ENQUIRY, SITE, bookingUrl } from "@/data/site";
import { Roll } from "@/components/ui/Roll";
import { ArrowDown } from "@/components/ui/icons";

const money = (n: number) => n.toLocaleString("ru-RU");

/**
 * Сцена: две вертикальные колонки сетки, линия пола и полоса под ней.
 * Белый LX570 въезжает слева и встаёт на пол. Сборка на загрузке — CSS
 * (globals.css), уход по скроллу — ScrollScenes.
 */
export function Hero() {
  return (
    <section id="top" className="hero" data-hero>
      <div className="hero-cols" aria-hidden="true">
        <div className="wrap grid12">
          <div style={{ gridColumn: "1 / span 3" }} />
          <div style={{ gridColumn: "7 / span 3" }} />
        </div>
      </div>
      <div className="hero-floor-line" aria-hidden="true" />
      <div className="hero-floor" aria-hidden="true" />

      <div className="wrap grid12 hero-copy-wrap">
        <div className="hero-copy" data-hero-copy>
          <p className="eyebrow rise" style={{ animationDelay: "0.1s" }}>
            Аренда с водителем · {CONTACT.city}
          </p>
          {/* Строки — блочные span, а не <br>: так заголовок читается вслух
              целиком, без склейки «водителемв». */}
          <h1 className="h1">
            <span className="mask">
              <span style={{ animationDelay: "0.2s" }}>Премиум-авто</span>
            </span>{" "}
            <span className="mask">
              <span style={{ animationDelay: "0.28s" }}>
                с <span className="accent">водителем</span>
              </span>
            </span>{" "}
            <span className="mask">
              <span style={{ animationDelay: "0.36s" }}>в {CONTACT.city}</span>
            </span>
          </h1>
          <p className="hero-price rise tnum" style={{ animationDelay: "0.6s" }}>
            <span>от</span>
            <b>
              {money(MIN_PRICE)} {SITE.currency}
            </b>
            <span>в час, стоимость называем до выезда</span>
          </p>
          <p className="hero-text rise" style={{ animationDelay: "0.65s" }}>
            Свадьбы, трансферы, встречи гостей, деловые поездки
            и VIP-сопровождение. Подача круглосуточно, по записи.
          </p>
          <div className="hero-cta rise" style={{ animationDelay: "0.7s" }}>
            <a className="btn btn-acc" href="#fleet">
              <Roll>Выбрать автомобиль</Roll>
              <ArrowDown />
            </a>
            <a
              className="btn btn-line"
              href={bookingUrl(GENERAL_ENQUIRY)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
            >
              <Roll>Написать в WhatsApp</Roll>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-stage-wrap">
        <div className="car-stage" data-hero-car>
          <div className="car-shadow" aria-hidden="true" />
          <div className="car-move">
            <div className="car-nod">
              <Image
                src={HERO_CAR.src}
                alt={HERO_CAR.alt}
                width={HERO_CAR.width}
                height={HERO_CAR.height}
                // Готовый WebP ~140 КБ без фона: пережимать его незачем,
                // а preload кладёт ссылку в <head> — это LCP-кадр.
                unoptimized
                preload
                fetchPriority="high"
              />
            </div>
          </div>
          <p
            className="plate rise tnum"
            style={{ animationDelay: "1.1s" }}
            aria-hidden="true"
          >
            <b>{HERO_CAR.name}</b>
            <span>
              {money(HERO_CAR.pricePerHour)} {SITE.currency}/{SITE.unit}
            </span>
          </p>
        </div>
      </div>

      <div className="wrap hero-info">
        <ul className="rise tnum" style={{ animationDelay: "0.8s" }}>
          <li>
            <b>{CAR_COUNT}</b> автомобилей, все белые
          </li>
          {/* Число классов ручное: русские числительные из length не собрать */}
          <li>
            <b>4</b> класса: от седана до микроавтобуса
          </li>
          <li>Без залога</li>
          <li>Нал · карта · QR</li>
        </ul>
        <a href="#fleet" className="scroll-cue" aria-label="Прокрутить к автопарку">
          <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
