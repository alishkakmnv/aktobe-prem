"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GENERAL_ENQUIRY, bookingUrl } from "@/data/site";
import { useBetweenHeroAndContacts } from "@/components/useBetweenHeroAndContacts";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Плавающая кнопка заявки.
 *
 * Появляется только после первого экрана: в hero уже есть та же кнопка, и
 * дублировать её поверх самой себя незачем. Оформление сдержанное, без
 * кислотно-зелёного пузыря и без пульсации, которая тянет внимание на себя
 * всё время чтения.
 *
 * Только десктоп (>1024): на узких экранах её место занимает MobileBar.
 */
export function FloatingWhatsApp() {
  const shown = useBetweenHeroAndContacts();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={bookingUrl(GENERAL_ENQUIRY)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp"
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{
            opacity: 0,
            transition: { duration: reduced ? 0.12 : 0.2, ease: EASE },
          }}
          transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE }}
          className="fixed bottom-6 right-6 z-[200] hidden h-14 lg:inline-flex items-center gap-2.5 rounded-md border border-line bg-surface/95 px-5 font-display text-sm text-ink shadow-none backdrop-blur-md transition-colors duration-200 hover:border-acc-pale sm:bottom-8 sm:right-8"
        >
          <MessageCircle
            size={17}
            strokeWidth={1.75}
            className="text-acc-pale"
            aria-hidden
          />
          <span className="hidden sm:inline">Написать в WhatsApp</span>
          <span className="sr-only sm:hidden">Написать в WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
