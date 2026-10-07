import type { NextConfig } from "next";
import { SITE_URL } from "./data/site";

const nextConfig: NextConfig = {
  /**
   * В домашней папке пользователя лежит посторонний package-lock.json, из-за
   * которого Turbopack принимал за корень проекта C:\Users\Sulpak и вешал
   * watcher на всю домашнюю директорию. Фиксируем корень явно.
   */
  turbopack: {
    root: import.meta.dirname,
  },
  // Фото парка теперь локальные (/public/cars) — внешние источники не нужны.

  /**
   * Старый адрес проекта (royal-auto-ten) показывал тот же сайт и делил с ним
   * поисковый вес. Если тот проект Vercel собирается из этого репо, после
   * деплоя он отдаёт постоянный редирект на боевой адрес.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "royal-auto-ten.vercel.app" }],
        destination: `${SITE_URL}/:path*`,
        // 301, а не 308 по умолчанию: его одинаково понимают все поисковики
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
