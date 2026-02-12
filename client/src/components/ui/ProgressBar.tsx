export default function ProgressBar({
  value,
  max = 100,
  className = "",
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const percentage = Math.min(
    Math.max(Math.round((safeValue / safeMax) * 100), 0),
    100,
  );
  const isOverLimit = safeValue > safeMax;

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden h-3`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${isOverLimit ? "bg-red-500" : "bg-emerald-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
