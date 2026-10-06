"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { CARS, CAR_CLASSES, CAR_COUNT, type Car, type CarClassId } from "@/data/cars";
import { SITE, bookingUrl, carEnquiry } from "@/data/site";
import { Roll } from "@/components/ui/Roll";
import { ArrowRight, VanIcon } from "@/components/ui/icons";

type Filter = CarClassId | "all";

const DRIVE: Record<Car["drive"], string> = {
  Передний: "передний привод",
  Задний: "задний привод",
  Полный: "полный привод",
};

const specs = (car: Car) =>
  `${car.transmission} · ${DRIVE[car.drive]} · ${car.seats} мест`;

const pad = (n: number) => String(n).padStart(2, "0");

export function Fleet() {
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [railIndex, setRailIndex] = useState(1);

  const visible = filter === "all" ? CARS : CARS.filter((c) => c.class === filter);

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Все", count: CAR_COUNT },
    ...CAR_CLASSES.map((c) => ({
      id: c.id as Filter,
      label: c.label,
      count: CARS.filter((car) => car.class === c.id).length,
    })),
  ];

  const pick = (id: Filter) => {
    if (id === filter) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (gridRef.current && !reduced) {
      gsap.registerPlugin(Flip);
      flipState.current = Flip.getState(gridRef.current.querySelectorAll(".card"));
    }
    setFilter(id);
    gridRef.current?.scrollTo({ left: 0 });
  };

  // Карточки не размонтируются, а прячутся атрибутом hidden: так Flip видит
  // и уходящие, и входящие, и сетка перестраивается одним движением.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, delay: 0.15 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.25 }),
    });
  }, [filter]);

  // Счётчик ленты на мобайле: «01 ──── 06»
  const onRailScroll = () => {
    const el = gridRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    const index = Math.round(progress * (visible.length - 1)) + 1;
    setRailIndex(index);
    if (railFillRef.current) {
      railFillRef.current.style.transform = `scaleX(${index / visible.length})`;
    }
  };

  const total = visible.length;

  return (
    <section id="fleet" className="section" style={{ paddingTop: 128 }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">01 — Автопарк</p>
            <h2 className="h2" data-reveal>
              Автопарк
            </h2>
            <p className="lead" style={{ maxWidth: "44ch" }}>
              Тариф почасовой, за рулём всегда водитель компании. Нажмите на
              машину, и заявка уйдёт в WhatsApp с её названием.
            </p>
          </div>

          <div className="tabs" role="group" aria-label="Фильтр по классу автомобиля">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className="tab"
                aria-pressed={filter === tab.id}
                onClick={() => pick(tab.id)}
              >
                {tab.label}
                <span className="n tnum">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Показано {total} из {CAR_COUNT}
        </p>

        <div className="cards" ref={gridRef} onScroll={onRailScroll} data-batch>
          {CARS.map((car) => {
            const shown = filter === "all" || car.class === filter;
            const klass = CAR_CLASSES.find((c) => c.id === car.class);
            return (
              <a
                key={car.id}
                className={`card${visible[0]?.id === car.id ? " is-lead" : ""}`}
                href={bookingUrl(carEnquiry(car.name))}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp"
                data-flip-id={car.id}
                hidden={!shown}
                aria-label={`Заказать ${car.name} с водителем, ${car.pricePerHour.toLocaleString("ru-RU")} ${SITE.currency} в час — откроется WhatsApp`}
              >
                <div className="ph">
                  {car.photoPending ? (
                    <div className="ph-pending">
                      <VanIcon size={64} strokeWidth={1.2} />
                      <p>Фото готовится</p>
                    </div>
                  ) : (
                    <Image
                      src={car.photo}
                      alt={car.alt}
                      fill
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 400px"
                      style={{ objectPosition: car.photoPosition }}
                    />
                  )}
                  <span className="badge">{klass?.label}</span>
                </div>
                <div className="card-body">
                  <h3 className="h3">{car.name}</h3>
                  <p className="card-specs">{specs(car)}</p>
                  <div className="card-foot">
                    <p className="price tnum">
                      <b>{car.pricePerHour.toLocaleString("ru-RU")}</b>
                      {SITE.currency}/{SITE.unit}
                    </p>
                    <span className="card-btn">
                      <Roll>Заказать</Roll>
                      <ArrowRight />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {total > 1 && (
          <div className="rail-count tnum" aria-hidden="true">
            <b>{pad(railIndex)}</b>
            <span className="rail-track">
              <span
                ref={railFillRef}
                style={{ transform: `scaleX(${1 / total})` }}
              />
            </span>
            <span>{pad(total)}</span>
          </div>
        )}
      </div>
    </section>
  );
}
