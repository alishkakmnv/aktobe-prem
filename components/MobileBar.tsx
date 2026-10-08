"use client";

import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, GENERAL_ENQUIRY, bookingUrl } from "@/data/site";
import { useBetweenHeroAndContacts } from "@/components/useBetweenHeroAndContacts";

/**
 * Липкая панель связи на ≤1024. Заменяет здесь плавающую кнопку WhatsApp:
 * на телефоне звонок не менее важен, чем переписка, и обе цели должны быть
 * под большим пальцем.
 *
 * Панель в DOM всегда, прячется сдвигом вниз: так она не дёргает вёрстку,
 * а inert убирает скрытые кнопки из табуляции.
 */
export function MobileBar() {
  const shown = useBetweenHeroAndContacts();

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-[200] grid grid-cols-2 gap-3 border-t border-line bg-bg/86 px-[clamp(1.25rem,4vw,4rem)] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out-quint lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={CONTACT.phoneHref}
        data-track="phone"
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md border border-line font-display text-sm text-ink transition-colors duration-200 hover:border-acc-pale"
      >
        <Phone size={16} strokeWidth={1.75} aria-hidden />
        Позвонить
      </a>
      <a
        href={bookingUrl(GENERAL_ENQUIRY)}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp"
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-acc font-display text-sm text-ink transition-colors duration-200 hover:bg-acc-hi"
      >
        <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
        WhatsApp
      </a>
    </div>
  );
}
