/**
 * Единая точка правки контактов и цели заявки.
 *
 * ЗАМЕНИТЬ ПЕРЕД ПРОДОМ: всё, что помечено PLACEHOLDER.
 * Поиск по строке "{{" находит все незаполненные места разом.
 */

/** Метка незаполненного значения. Рендерится видимым плейсхолдером, а не пустотой. */
export const PLACEHOLDER = {
  city: "{{ГОРОД}}",
  address: "{{АДРЕС}}",
  hours: "{{24/7}}",
  instagram: "{{INSTAGRAM}}",
  color: "{{ЦВЕТ}}",
  year: "{{ГОД}}",
} as const;

/**
 * Куда уходит заявка. Меняется здесь и только здесь.
 * Когда подключим Telegram-канал, достаточно поменять kind и target:
 * все кнопки сайта ходят через bookingUrl().
 */
export const BOOKING_TARGET = {
  kind: "whatsapp" as "whatsapp" | "telegram",
  /** Номер в международном формате, без плюса и пробелов. */
  target: "79935427510",
} as const;

/** Телефон для показа и для tel:-ссылки. */
export const CONTACT = {
  phoneDisplay: "8 993 542-75-10",
  phoneHref: "tel:+79935427510",
  city: PLACEHOLDER.city,
  address: PLACEHOLDER.address,
  hours: PLACEHOLDER.hours,
  instagram: PLACEHOLDER.instagram,
} as const;

export const SITE = {
  name: "Royal Auto",
  /** Валюта: клиент в России. Символ вынесен, чтобы не искать по файлам. */
  currency: "₽",
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

/** Текст заявки по конкретной машине. */
export function carEnquiry(carName: string): string {
  return `Здравствуйте! Интересует ${carName}. Подскажите по срокам и условиям аренды.`;
}

/** Текст заявки без привязки к машине. */
export const GENERAL_ENQUIRY =
  "Здравствуйте! Хочу арендовать автомобиль. Подскажите, что есть в наличии.";

/** Якорная навигация. Порядок повторяет путь клиента и не меняется. */
export const NAV_LINKS = [
  { href: "#fleet", label: "Автопарк" },
  { href: "#terms", label: "Условия" },
  { href: "#how", label: "Как это работает" },
  { href: "#contacts", label: "Контакты" },
] as const;
