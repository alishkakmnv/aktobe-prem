/**
 * Одна фраза-позиционирование крупно. Текст — существующий копирайт сайта,
 * нового не сочиняем. Слова подсвечивает по скроллу ScrollScenes.
 */
export function Manifest() {
  return (
    <section className="section manifest" data-manifest aria-label="О компании">
      <div className="wrap">
        <p data-manifest-text>
          Свадьбы, трансферы, встречи гостей, деловые поездки
          и VIP-сопровождение. Подача круглосуточно, по записи.
        </p>
      </div>
    </section>
  );
}
