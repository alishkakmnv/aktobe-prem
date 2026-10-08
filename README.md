# Aktobe Premium

Лендинг премиум-аренды авто с водителем в Актобе: шесть машин, почасовой тариф,
заявка уходит в WhatsApp. Прод: https://aktobe-premium.vercel.app

## Стек

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind 4,
Framer Motion, GSAP ScrollTrigger, Lenis. Шрифты Unbounded (заголовки)
и Golos Text (текст).

## Запуск

```bash
npm install
npm run dev     # http://localhost:3020
npm run build
npm run lint
```

## Деплой

Git-интеграции с Vercel нет. Обновление прода — из `main`:

```bash
vercel --prod
```

## Где что лежит

- `data/site.ts` — адрес сайта (`SITE_URL`), телефон, адрес, тексты заявок в WhatsApp.
- `data/cars.ts` — автопарк, цены, фото, OG-картинка.
- `data/conditions.ts` — условия, шаги, доводы, FAQ.
- `data/descriptions/ЗАПОЛНИТЬ.md` — что ещё ждём от клиента.
- `docs/screens/` — скриншоты.
- `app/globals.css` — токены и общие стили.
