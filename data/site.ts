/**
 * Единая точка правки контактов и цели заявки.
 *
 * Все данные подтверждены клиентом (Актобе, премиум-аренда с водителем).
 * Плейсхолдеров {{...}} в проекте не осталось: если появится новое поле без
 * данных, заводите его здесь, а не в разметке.
 */

/**
 * Боевой адрес сайта. От него строятся metadataBase, canonical, OG, JSON-LD,
 * robots и sitemap. Появится свой домен — меняется здесь и только здесь.
 */
export const SITE_URL = "https://aktobe-premium.vercel.app";

/**
 * Куда уходит заявка. Меняется здесь и только здесь.
 * Когда подключим Telegram-канал, достаточно поменять kind и target:
 * все кнопки сайта ходят через bookingUrl().
 */
export const BOOKING_TARGET = {
  kind: "whatsapp" as "whatsapp" | "telegram",
  /** Номер в международном формате, без плюса и пробелов. */
  target: "77057550005",
} as const;

/** Телефон для показа и для tel:-ссылки. */
export const CONTACT = {
  phoneDisplay: "+7 705 755 00 05",
  phoneHref: "tel:+77057550005",
  city: "Актобе",
  address: "Актобе, мкр Алтын Орда 11д",
  hours: "круглосуточно, по записи",
} as const;

export const SITE = {
  name: "Aktobe Premium",
  /** Валюта: клиент в Казахстане. Символ вынесен, чтобы не искать по файлам. */
  currency: "₸",
  /** Единица тарификации. Аренда почасовая, суток в этом бизнесе нет. */
  unit: "час",
} as const;

/**
 * Собирает ссылку на заявку с предзаполненным текстом.
 * Единственный способ получить CTA-ссылку в проекте — хардкод wa.me запрещён.
 */
export function bookingUrl(message: string): string {
  const text = encodeURIComponent(message);
  if (BOOKING_TARGET.kind === "telegram") {
    return `https://t.me/${BOOKING_TARGET.target}?text=${text}`;
  }
  return `https://wa.me/${BOOKING_TARGET.target}?text=${text}`;
}

/**
 * Метка в конце каждого текста: по ней в WhatsApp видно, что заявка пришла
 * с сайта, а не из Instagram или по сарафану.
 */
export const SITE_TAG = "[сайт]";

/** Текст заявки по конкретной машине. */
export function carEnquiry(carName: string): string {
  return `Здравствуйте! Интересует ${carName} с водителем. Подскажите по свободному времени и стоимости. ${SITE_TAG}`;
}

/** Текст заявки под сценарий из bento: «Свадьба», «Трансфер» и т.д. */
export function scenarioEnquiry(scenario: string): string {
  // Строчной делаем только первую букву: «VIP» должен остаться капсом
  const lower = scenario.charAt(0).toLowerCase() + scenario.slice(1);
  return `Здравствуйте! Нужна машина с водителем: ${lower}. Подскажите по свободному времени и стоимости. ${SITE_TAG}`;
}

/** Текст заявки без привязки к машине. */
export const GENERAL_ENQUIRY =
  `Здравствуйте! Хочу заказать авто с водителем. Подскажите, что свободно и сколько стоит. ${SITE_TAG}`;

/** Якорная навигация. Порядок повторяет путь клиента и не меняется. */
export const NAV_LINKS = [
  { href: "#fleet", label: "Автопарк" },
  { href: "#terms", label: "Условия" },
  { href: "#how", label: "Как это работает" },
  { href: "#contacts", label: "Контакты" },
] as const;
