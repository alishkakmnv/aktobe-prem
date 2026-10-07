# Aktobe Premium

Лендинг премиум-аренды авто с водителем в Актобе: шесть машин, почасовой тариф,
заявка уходит в WhatsApp. Прод: https://aktobe-rent.vercel.app

## Стек

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind 4,
GSAP (ScrollTrigger, SplitText, Flip), Lenis. Шрифт Manrope.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3020
npm run build
npm run lint
```

## Где что лежит

- `data/site.ts` — адрес сайта (`SITE_URL`), телефон, адрес, тексты заявок в WhatsApp.
- `data/cars.ts` — автопарк, цены, фото для карточек и hero.
- `data/conditions.ts` — условия, шаги, доводы, FAQ.
- `data/scenarios.ts` — плитки «Сценарии».
- `data/descriptions/ЗАПОЛНИТЬ.md` — что ещё ждём от клиента.
- `docs/07_BRIEF.md` — ТЗ редизайна, `docs/screens/` — скриншоты.
- `components/ScrollScenes.tsx` — вся скролл-анимация, `app/globals.css` — токены и стили.
