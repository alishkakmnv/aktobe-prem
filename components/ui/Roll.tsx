/**
 * Текст-ролл: две копии строки в окне высотой в одну; на hover родителя
 * колонка уезжает на -100%. Вторая копия скрыта от скринридеров.
 */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
