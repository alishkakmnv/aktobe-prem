/**
 * РЕАЛЬНЫЙ ФЛОТ КЛИЕНТА — 6 машин, Актобе, аренда С ВОДИТЕЛЕМ.
 *
 * Фото: 10 кадров клиента, разложены по папкам /public/cars/<id>/NN.jpg.
 * Карточка использует лучший экстерьерный кадр (01); остальные лежат рядом
 * под будущую галерею/модалку.
 *
 * Что подтверждено фотографиями: модель, кузов, цвет (весь флот белый).
 * Что подтверждено клиентом: цены за час, вместимость, классы.
 * Mercedes Sprinter: фото ещё нет, в карточке стоит помеченная заглушка.
 */

export type CarClassId = "suv" | "sedan" | "minivan" | "bus";

export interface CarClass {
  id: CarClassId;
  label: string;
  /** Одна строка о том, кому этот класс. Снимает вопрос «а мне какой?». */
  blurb: string;
}

/** Классы пересобраны под премиум-флот: эконома в нём нет. */
export const CAR_CLASSES: CarClass[] = [
  {
    id: "suv",
    label: "Внедорожник",
    blurb: "Свадьбы, VIP-сопровождение, встречи",
  },
  { id: "sedan", label: "Седан", blurb: "Деловые поездки и трансферы" },
  { id: "minivan", label: "Минивэн", blurb: "Группа до 14 человек с багажом" },
  {
    id: "bus",
    label: "Микроавтобус",
    blurb: "Большая группа, корпоратив, межгород",
  },
];

export interface Car {
  id: string;
  /** Марка и модель одной строкой, как показывается на карточке. */
  name: string;
  class: CarClassId;
  photo: string;
  /** Осмысленное описание кадра, не «машина». */
  alt: string;
  transmission: "Автомат" | "Механика";
  drive: "Передний" | "Задний" | "Полный";
  /** Строкой, а не числом: у минивэна и микроавтобуса вместимость — диапазон. */
  seats: string;
  /** Тариф за час, подтверждён клиентом. */
  pricePerHour: number;
  /** Цвет подтверждён фотографиями. */
  color: string;
  /** Точка кадрирования в карточке 4:3: на вертикальных кадрах машина стоит внизу. */
  photoPosition: string;
  /** true → в карточке стоит заглушка вместо снимка машины. */
  photoPending?: true;
}

const photo = (id: string, n: string) => `/cars/${id}/${n}.jpg`;

export const CARS: Car[] = [
  // ---- Внедорожники ----------------------------------------------------
  {
    id: "land-cruiser-200",
    name: "Toyota Land Cruiser 200",
    class: "suv",
    photo: photo("land-cruiser-200", "01"),
    photoPosition: "center 72%",
    alt: "Белый Toyota Land Cruiser 200 у входа в ресторан под навесом, солнечный день",
    transmission: "Автомат",
    drive: "Полный",
    seats: "5",
    pricePerHour: 10000,
    color: "Белый",
  },
  {
    id: "lexus-lx570",
    name: "Lexus LX570",
    class: "suv",
    photo: photo("lexus-lx570", "01"),
    photoPosition: "center 62%",
    alt: "Белый Lexus LX570 на брусчатке у делового центра в солнечный день",
    transmission: "Автомат",
    drive: "Полный",
    seats: "5",
    pricePerHour: 10000,
    color: "Белый",
  },
  {
    id: "prado",
    name: "Toyota Land Cruiser Prado",
    class: "suv",
    photo: photo("prado", "01"),
    photoPosition: "center 74%",
    alt: "Белый Toyota Land Cruiser Prado у кирпичного дома в пасмурный день",
    transmission: "Автомат",
    drive: "Полный",
    seats: "5",
    pricePerHour: 10000,
    color: "Белый",
  },

  // ---- Седан -----------------------------------------------------------
  {
    id: "camry",
    name: "Toyota Camry",
    class: "sedan",
    photo: photo("camry", "01"),
    photoPosition: "center 60%",
    alt: "Белая Toyota Camry на тёмных дисках у частного дома",
    transmission: "Автомат",
    drive: "Передний",
    seats: "5",
    pricePerHour: 8000,
    color: "Белый",
  },

  // ---- Минивэн ---------------------------------------------------------
  {
    id: "hiace",
    name: "Toyota Hiace",
    class: "minivan",
    photo: photo("hiace", "01"),
    photoPosition: "center 55%",
    alt: "Белый минивэн Toyota Hiace с длинной базой на парковке во дворе",
    transmission: "Автомат",
    // Hiace нового поколения — заднеприводный, подтверждается кадром 01.
    drive: "Задний",
    seats: "8–14",
    pricePerHour: 10000,
    color: "Белый",
  },

  // ---- Микроавтобус ----------------------------------------------------
  {
    id: "sprinter",
    name: "Mercedes Sprinter",
    class: "bus",
    photo: photo("sprinter", "01"),
    photoPosition: "center",
    alt: "Место под фото Mercedes Sprinter: снимок готовится",
    transmission: "Автомат",
    drive: "Задний",
    seats: "16–19",
    pricePerHour: 10000,
    color: "Белый",
    photoPending: true,
  },
];

/**
 * Машина для hero: белый LX570 без фона, три четверти, носом вправо.
 * Стоит на линии пола сцены, поэтому нужен вырезанный кадр, а не фото с фоном.
 */
export const HERO_CAR = {
  src: "/hero/lx570-hero.webp",
  width: 1600,
  height: 913,
  alt: "Белый Lexus LX570 в три четверти, носом вправо",
  name: "Lexus LX570",
  pricePerHour: 10000,
};

/** Превью в мессенджерах: тот же LX570 на графитовом фоне, 1200×630. */
export const OG_IMAGE = {
  url: "/og-lx570.jpg",
  width: 1200,
  height: 630,
  alt: "Белый Lexus LX570 — Aktobe Premium, аренда с водителем в Актобе",
};

export const CAR_COUNT = CARS.length;

/** Нижняя граница прайса. Считается из флота, чтобы hero не расходился с карточками. */
export const MIN_PRICE = Math.min(...CARS.map((car) => car.pricePerHour));

/** Цена к показу: «10 000 ₸/час». */
export function priceLabel(car: Car, currency: string, unit: string): string {
  return `${car.pricePerHour.toLocaleString("ru-RU")} ${currency}/${unit}`;
}

/** Та же запись для произвольной суммы — hero и CTA берут её отсюда. */
export function amountLabel(
  amount: number,
  currency: string,
  unit: string,
): string {
  return `${amount.toLocaleString("ru-RU")} ${currency}/${unit}`;
}
