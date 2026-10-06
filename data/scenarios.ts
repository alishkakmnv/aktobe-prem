/**
 * Сценарии для bento-секции. Названия взяты из позиционирования
 * («Свадьбы, трансферы, встречи гостей, деловые поездки и VIP-сопровождение»),
 * пояснения — дословно из FAQ «На какие события чаще всего заказывают».
 * Новых обещаний здесь не появляется: только то, что клиент уже подтвердил.
 *
 * Фото — кропы из снимков автопарка. Своей съёмки под сценарии пока нет.
 */

export interface Scenario {
  id: string;
  title: string;
  /** Необязательная строка из FAQ. Без неё на плитке только название. */
  note?: string;
  photo: string;
  photoPosition: string;
  alt: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "wedding",
    title: "Свадьба",
    note: "Под кортеж — внедорожники",
    photo: "/cars/land-cruiser-200/01.jpg",
    photoPosition: "center 70%",
    alt: "Белый Toyota Land Cruiser 200 у входа в ресторан",
  },
  {
    id: "transfer",
    title: "Трансфер",
    photo: "/cars/camry/01.jpg",
    photoPosition: "center 62%",
    alt: "Белая Toyota Camry у частного дома",
  },
  {
    id: "guests",
    title: "Встреча гостей",
    note: "Под группу — Hiace или Sprinter",
    photo: "/cars/hiace/01.jpg",
    photoPosition: "center 58%",
    alt: "Белый минивэн Toyota Hiace во дворе",
  },
  {
    id: "business",
    title: "Деловая поездка",
    photo: "/cars/lexus-lx570/01.jpg",
    photoPosition: "center 70%",
    alt: "Белый Lexus LX570 у делового центра",
  },
  {
    id: "vip",
    title: "VIP-сопровождение",
    photo: "/cars/land-cruiser-200/04.jpg",
    photoPosition: "center 60%",
    alt: "Белый Toyota Land Cruiser 200 у тёмного фасада",
  },
  {
    id: "hourly",
    title: "Почасово",
    photo: "/cars/prado/01.jpg",
    photoPosition: "center 76%",
    alt: "Белый Toyota Land Cruiser Prado у кирпичного дома",
  },
];
