import { CONTACT, GENERAL_ENQUIRY, bookingUrl } from "@/data/site";
import { ChatIcon, PhoneIcon } from "@/components/ui/icons";

/**
 * Связь всегда под рукой.
 * Десктоп: колонка из двух круглых кнопок справа внизу.
 * ≤1024: липкая нижняя панель; её показывает ScrollScenes после hero
 * и прячет, когда в кадре финальный блок.
 */
export function ContactDock() {
  const wa = bookingUrl(GENERAL_ENQUIRY);
  return (
    <>
      <div className="dock">
        <a
          className="d-tel"
          href={CONTACT.phoneHref}
          data-track="phone"
          aria-label={`Позвонить: ${CONTACT.phoneDisplay}`}
        >
          <PhoneIcon size={18} />
        </a>
        <a
          className="d-wa"
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp"
          aria-label="Написать в WhatsApp"
        >
          <ChatIcon size={20} />
        </a>
      </div>

      <div className="mbar" data-mbar>
        <a className="m-tel" href={CONTACT.phoneHref} data-track="phone">
          <PhoneIcon />
          Позвонить
        </a>
        <a
          className="m-wa"
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
