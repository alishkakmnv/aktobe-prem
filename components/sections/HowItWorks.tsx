import { STEPS } from "@/data/conditions";

/**
 * Четыре шага. Линия сверху заливается зелёным по скроллу, шаги загораются
 * по очереди (ScrollScenes). Без JS все шаги просто видны.
 */
export function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="wrap">
        <p className="eyebrow">03 — Процесс</p>
        <h2 className="h2" data-reveal>
          Как это работает
        </h2>

        <div className="steps-wrap" data-steps>
          <div className="steps-line" aria-hidden="true" />
          <div className="steps-fill" aria-hidden="true" data-steps-fill />
          <ol className="steps">
            {STEPS.map((step) => (
              <li key={step.n} className="step" data-step>
                <span className="step-dot" aria-hidden="true" />
                <p className="step-n tnum">{step.n}</p>
                <h3 className="h3">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
