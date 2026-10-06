"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, GENERAL_ENQUIRY, NAV_LINKS, bookingUrl } from "@/data/site";
import { Roll } from "@/components/ui/Roll";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Aktobe Premium — в начало">
      <b>AKTOBE</b>
      <span>PREMIUM</span>
    </a>
  );
}

/**
 * Плавающая шапка-таблетка. Прятать её при скролле вниз и возвращать при
 * скролле вверх — работа ScrollScenes: там же живёт весь остальной скролл.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Блокировка прокрутки под меню, Esc и удержание фокуса внутри панели.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <div className="pill">
            <Logo />

            <nav className="nav" aria-label="Основная навигация">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  <Roll>{link.label}</Roll>
                </a>
              ))}
            </nav>

            <div className="pill-actions">
              <a
                className="pill-phone tnum"
                href={CONTACT.phoneHref}
                data-track="phone"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                className="pill-btn"
                href={bookingUrl(GENERAL_ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp"
              >
                <Roll>WhatsApp</Roll>
              </a>
              <button
                ref={toggleRef}
                type="button"
                className="burger"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Открыть меню"
              >
                <MenuIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        className={`menu${open ? " is-open" : ""}`}
        inert={!open}
      >
        <div className="wrap">
          <div className="pill">
            <Logo />
            <button
              type="button"
              className="burger"
              onClick={close}
              aria-label="Закрыть меню"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        <nav className="wrap" aria-label="Мобильная навигация">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn-acc"
            style={{ marginTop: 40 }}
            href={bookingUrl(GENERAL_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp"
            onClick={() => setOpen(false)}
          >
            Написать в WhatsApp
          </a>
          <a
            className="btn btn-line tnum"
            style={{ marginTop: 12 }}
            href={CONTACT.phoneHref}
            data-track="phone"
          >
            {CONTACT.phoneDisplay}
          </a>
        </nav>
      </div>
    </>
  );
}
