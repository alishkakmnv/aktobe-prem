import { CONDITIONS } from "@/data/conditions";

/** «Без залога» — третья ячейка: она стоит в правом верхнем углу сетки 3×2
    и единственная залита глубоким зелёным. */
const ORDER = ["Минимальный заказ", "Подача автомобиля", "Залог", "За рулём", "Оплата"];

const ordered = [...CONDITIONS].sort((a, b) => {
  const ia = ORDER.indexOf(a.label);
  const ib = ORDER.indexOf(b.label);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

export function Terms() {
  return (
    <section id="terms" className="section">
      <div className="wrap">
        <p className="eyebrow">02 — Условия</p>
        <h2 className="h2" data-reveal>
          Условия аренды
        </h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>
          Всё, что обычно выясняется по телефону, написано здесь: сколько
          минимум, куда подаём, чем платить. Стоимость поездки называем до
          выезда и в дороге не меняем.
        </p>

        <dl className="terms" data-batch>
          {ordered.map((c) => (
            <div key={c.label} className={`term${c.label === "Залог" ? " is-deep" : ""}`}>
              <dt className="label">{c.label}</dt>
              <dd style={{ margin: 0 }}>
                <p className="term-value">{c.value}</p>
                <p className="term-note">{c.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
