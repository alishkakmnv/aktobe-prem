import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { CONTACT, SITE, SITE_URL } from "@/data/site";
import { OG_IMAGE, MIN_PRICE } from "@/data/cars";
import "./globals.css";

/* Единственная гарнитура сайта. Только кириллица и латиница: остальные
   сабсеты не нужны и только утяжеляют загрузку. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** Разметка для поиска: компания, адрес, телефон, круглосуточный режим. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: SITE.name,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  telephone: CONTACT.phoneDisplay.replace(/\s/g, ""),
  priceRange: `от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "мкр Алтын Орда 11д",
    addressLocality: CONTACT.city,
    addressCountry: "KZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export const metadata: Metadata = {
  // Боевой адрес из data/site.ts. От него строятся canonical и абсолютные
  // ссылки на OG, иначе превью в мессенджере приходит без изображения.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Премиум-авто с водителем в ${CONTACT.city} | ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    `Аренда премиум-авто с водителем в ${CONTACT.city} от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}. ` +
    "Land Cruiser 200, LX570, Prado, Camry, Hiace, Sprinter. Свадьбы, трансферы, " +
    "деловые поездки и VIP-сопровождение. Подача круглосуточно, заказ в WhatsApp.",
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  keywords: [
    "аренда авто с водителем",
    `аренда авто ${CONTACT.city}`,
    "авто на свадьбу Актобе",
    "трансфер Актобе",
    "Land Cruiser 200 с водителем",
    SITE.name,
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    title: `Премиум-авто с водителем в ${CONTACT.city} | ${SITE.name}`,
    description: `Внедорожники, седан и микроавтобусы с водителем от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}. Свадьбы, трансферы, VIP-сопровождение. Подача круглосуточно.`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Премиум-авто с водителем в ${CONTACT.city} | ${SITE.name}`,
    description: `Внедорожники, седан и микроавтобусы с водителем от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}. Свадьбы, трансферы, VIP-сопровождение. Подача круглосуточно.`,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={manrope.variable}
    >
      <body>
        <script
          type="application/ld+json"
          // JSON-LD собирается из констант проекта, пользовательского ввода тут нет
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
