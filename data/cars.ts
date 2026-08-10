import { PLACEHOLDER } from "./site";

/**
 * РЕАЛЬНЫЙ ПАРК ROYAL AUTO — 13 машин.
 *
 * Фото: 100 кадров из Telegram-чата клиента, разложены по папкам
 * /public/cars/<id>/NN.jpg в порядке исходной съёмки (фронт → салон → корма →
 * багажник). Карточка использует лучший экстерьерный кадр; остальные лежат
 * рядом под будущую галерею/модалку.
 *
 * Что подтверждено фотографиями: модель, кузов, цвет.
 * Что ждёт описаний клиента: цены, годы, точные комплектации.
 * Коробка передач у части машин видна в салонных кадрах; помеченные
 * «сверить» — лучшая гипотеза, правится описаниями одним полем.
 */

export type CarClassId = "econom" | "standart" | "comfort" | "crossover";

export interface CarClass {
  id: CarClassId;
  label: string;
  /** Одна строка о том, кому этот класс. Снимает вопрос «а мне какой?». */
  blurb: string;
}

/** Классы пересобраны под реальный парк: бизнеса и люкса в нём нет. */
export const CAR_CLASSES: CarClass[] = [
  { id: "econom", label: "Эконом", blurb: "Городские поездки и первая аренда" },
  { id: "standart", label: "Стандарт", blurb: "Семья, багаж, трасса" },
  { id: "comfort", label: "Комфорт", blurb: "Долгая дорога без усталости" },
  {
    id: "crossover",
    label: "Кроссовер",
    blurb: "Высокая посадка и запас под плохую дорогу",
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
  seats: number;
  fuel: "Бензин" | "Дизель" | "Гибрид";
  /** null → «По запросу». Заполняется реальными ценами парка. */
  pricePerDay: number | null;
  /** Цвет подтверждён фотографиями. */
  color: string | null;
  /** null → {{ГОД}}. Заполняется описаниями клиента. */
  year: number | null;
}

const photo = (id: string, n: string) => `/cars/${id}/${n}.jpg`;

export const CARS: Car[] = [
  // ---- Эконом ----------------------------------------------------------
  {
    id: "lifan-solano",
    name: "Lifan Solano",
    class: "econom",
    photo: photo("lifan-solano", "02"),
    alt: "Серый седан Lifan Solano у кирпичного здания после дождя",
    transmission: "Механика", // подтверждено описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: 2000, // из описания клиента: 2000₽/сут
    color: "Серый",
    year: 2015, // из описания клиента
  },
  {
    id: "rio-3",
    name: "Kia Rio III",
    class: "econom",
    photo: photo("rio-3", "01"),
    alt: "Белый седан Kia Rio с включёнными фарами у гаража зимним вечером",
    transmission: "Автомат", // сверить с описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Белый",
    year: null,
  },
  {
    id: "solaris-sedan",
    name: "Hyundai Solaris седан",
    class: "econom",
    photo: photo("solaris-sedan", "02"),
    alt: "Серый Hyundai Solaris с включёнными фарами на крыше паркинга в сумерках",
    transmission: "Автомат", // виден селектор в салонном кадре 05
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Серый",
    year: null,
  },
  {
    id: "solaris-hatch",
    name: "Hyundai Solaris хэтчбек",
    class: "econom",
    photo: photo("solaris-hatch", "02"),
    alt: "Тёмно-серый хэтчбек Hyundai Solaris на снежной площадке",
    transmission: "Автомат", // сверить с описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Тёмно-серый",
    year: null,
  },

  // ---- Стандарт --------------------------------------------------------
  {
    id: "polo",
    name: "Volkswagen Polo",
    class: "standart",
    photo: photo("polo", "01"),
    alt: "Серебристый седан Volkswagen Polo у кирпичного здания в солнечный день",
    transmission: "Автомат", // сверить с описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Серебристый",
    year: null,
  },
  {
    id: "rio-4",
    name: "Kia Rio IV",
    class: "standart",
    photo: photo("rio-4", "02"),
    alt: "Белый седан Kia Rio на зимней площадке в солнечный день",
    transmission: "Автомат", // сверить с описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Белый",
    year: null,
  },

  // ---- Комфорт ---------------------------------------------------------
  {
    id: "golf-6",
    name: "Volkswagen Golf",
    class: "comfort",
    photo: photo("golf-6", "05"),
    alt: "Белый хэтчбек Volkswagen Golf у кирпичного здания в солнечный день",
    transmission: "Автомат", // сверить с описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Белый",
    year: null,
  },
  {
    id: "citroen-c4",
    name: "Citroën C4",
    class: "comfort",
    photo: photo("citroen-c4", "02"),
    alt: "Тёмно-коричневый хэтчбек Citroën C4 в тёплом вечернем свете",
    transmission: "Автомат", // виден селектор в салонном кадре 04
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Тёмно-коричневый",
    year: null,
  },
  {
    id: "mazda-3",
    name: "Mazda 3",
    class: "comfort",
    photo: photo("mazda-3", "02"),
    alt: "Белый хэтчбек Mazda 3 на снежной площадке в солнечный день",
    transmission: "Автомат", // виден селектор в салонном кадре 04
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Белый",
    year: null,
  },
  {
    id: "ceed",
    name: "Kia Ceed",
    class: "comfort",
    photo: photo("ceed", "04"),
    alt: "Бордовый хэтчбек Kia Ceed на снегу у тёмного ангара",
    transmission: "Механика", // сверить с описанием клиента
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Бордовый",
    year: null,
  },
  {
    id: "elantra-white",
    name: "Hyundai Elantra",
    class: "comfort",
    photo: photo("elantra-white", "02"),
    alt: "Белый седан Hyundai Elantra на снежной площадке",
    transmission: "Автомат", // виден селектор в салонном кадре 04
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Белый",
    year: null,
  },
  {
    id: "elantra-black",
    name: "Hyundai Elantra",
    class: "comfort",
    photo: photo("elantra-black", "02"),
    alt: "Чёрный седан Hyundai Elantra на открытом паркинге",
    transmission: "Автомат", // виден селектор в салонном кадре 04
    drive: "Передний",
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Чёрный",
    year: null,
  },

  // ---- Кроссовер -------------------------------------------------------
  {
    id: "outlander",
    name: "Mitsubishi Outlander",
    class: "crossover",
    photo: photo("outlander", "02"),
    alt: "Белый кроссовер Mitsubishi Outlander на крыше паркинга под ясным небом",
    transmission: "Автомат",
    drive: "Полный", // сверить с описанием клиента
    seats: 5,
    fuel: "Бензин",
    pricePerDay: null,
    color: "Белый",
    year: null,
  },
];

/**
 * Кадр для hero: Solaris в сумерках на крыше паркинга, фары включены,
 * на рамке номера читается Royal Auto. Реальная машина парка вместо стока —
 * клиент узнаёт свою технику с первого экрана.
 */
export const HERO_PHOTO = {
  src: photo("solaris-sedan", "01"),
  alt: "Серый Hyundai Solaris с включёнными фарами на крыше паркинга в сумерках",
};

/** Тот же кадр под превью в мессенджерах. */
export const OG_IMAGE = {
  url: photo("solaris-sedan", "01"),
  width: 960,
  height: 1280,
  alt: HERO_PHOTO.alt,
};

export const CAR_COUNT = CARS.length;

/** Цена к показу. Пока парк не залит ценами, честно отдаём «По запросу». */
export function priceLabel(car: Car, currency: string): string {
  if (car.pricePerDay === null) return "По запросу";
  return `${car.pricePerDay.toLocaleString("ru-RU")} ${currency}/сут`;
}

/** Значение поля или видимый плейсхолдер. */
export function fieldOrPlaceholder(
  value: string | number | null,
  placeholder: string,
): string {
  return value === null ? placeholder : String(value);
}

export function carColor(car: Car): string {
  return fieldOrPlaceholder(car.color, PLACEHOLDER.color);
}

export function carYear(car: Car): string {
  return fieldOrPlaceholder(car.year, PLACEHOLDER.year);
}
