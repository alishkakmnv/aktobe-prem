import type { Metadata, Viewport } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import { CONTACT, SITE } from "@/data/site";
import { OG_IMAGE } from "@/data/cars";
import "./globals.css";

/* Дисплейный. Кириллица родная (Cyreal), поэтому subsets включает cyrillic —
   без него русские заголовки уехали бы в системный фолбэк. */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // Боевой адрес деплоя. От него строятся абсолютные ссылки на OG-картинку,
  // иначе превью при отправке ссылки в мессенджер приходит без изображения.
  // ЗАМЕНИТЬ, когда у клиента появится собственный домен.
  metadataBase: new URL("https://royal-auto-ten.vercel.app"),
  title: {
    default: `Аренда автомобилей без водителя в ${CONTACT.city} | ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    `Аренда автомобилей без водителя в ${CONTACT.city}. Классы от эконома до кроссовера, ` +
    "оформление за пять минут по паспорту и правам, условия названы до договора. " +
    "Бронь в WhatsApp.",
  applicationName: SITE.name,
  keywords: [
    "аренда автомобиля",
    "прокат авто",
    "аренда без водителя",
    "Royal Auto",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    title: `Аренда автомобилей без водителя | ${SITE.name}`,
    description:
      "Классы от эконома до кроссовера. Оформление за пять минут, условия названы до договора.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Аренда автомобилей без водителя | ${SITE.name}`,
    description:
      "Классы от эконома до кроссовера. Оформление за пять минут, условия названы до договора.",
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
      className={`${unbounded.variable} ${golos.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
