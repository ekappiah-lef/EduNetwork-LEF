import { cx } from "./ui";

type Row = { label: string; value: string; tone?: "good" | "due" };

export type SlipProps = {
  recordId: string;
  name: string;
  role: string;
  initials: string;
  status: "cleared" | "due";
  rows: Row[];
  footnote?: string;
  className?: string;
  animateStamp?: boolean;
};

/*
  The clearance slip — the page's signature element. Styled after a printed
  bursary slip: mono record number, ID photo frame, perforated tear edge, stamp.
*/
export function ClearanceSlip({ recordId, name, role, initials, status, rows, footnote, className, animateStamp }: SlipProps) {
  const cleared = status === "cleared";
  return (
    <figure
      className={cx("overflow-hidden rounded-xl border border-line bg-paper shadow-deep", className)}
      aria-label={`Clearance record ${recordId} for ${name}: ${cleared ? "cleared" : "balance outstanding"}`}
    >
      <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-3">
        <span className="text-eyebrow text-muted">ClearEnroll · Record</span>
        <span className="font-mono text-xs text-ink-2">{recordId}</span>
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="flex items-start gap-4">
          <div
            className="grid h-[4.25rem] w-14 shrink-0 place-items-center rounded-md border border-line bg-[linear-gradient(180deg,#eef2f7,#dfe6ef)] font-display text-lg font-semibold text-navy-700"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold leading-snug text-navy">{name}</p>
            <p className="text-sm text-muted">{role}</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-ink">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Photo ID on file
            </p>
          </div>
        </div>

        <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-muted">{r.label}</dt>
              <dd
                className={cx(
                  "text-right font-mono text-[0.8125rem]",
                  r.tone === "good" && "text-emerald-ink",
                  r.tone === "due" && "text-amber-ink",
                  !r.tone && "text-ink",
                )}
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs leading-relaxed text-muted">{footnote ?? "Checked against participating schools"}</p>
          <span
            className={cx(
              "shrink-0 rotate-[-6deg] rounded-md border-2 px-2.5 py-1 font-mono text-xs font-medium tracking-[0.14em] uppercase",
              cleared ? "border-emerald-ink/70 text-emerald-ink" : "border-amber-ink/70 text-amber-ink",
              animateStamp && "stamp-in [animation-delay:700ms]",
            )}
            aria-hidden="true"
          >
            {cleared ? "Cleared" : "Balance due"}
          </span>
        </div>
      </div>

      <div className="perforation" aria-hidden="true" />
    </figure>
  );
}
