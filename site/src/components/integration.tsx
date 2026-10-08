const benefits = [
  ["Verify from inside EduNetwork", "Look up student and teacher clearance records without leaving EduNetwork — it has a ClearEnroll menu built in."],
  ["See obligations across schools", "Identify students with outstanding fees at other participating institutions."],
  ["Scheduled balance sync", "Outstanding balances are pushed to ClearEnroll on a regular schedule."],
  ["Updates as payments land", "Clearance records change as fee payments are received."],
  ["No paperwork to settle", "Confirm a student's fees are fully paid without letters or stamps."],
  ["Faster transfers", "Fewer manual checks and phone calls during transfers and admissions."],
];

const steps = [
  {
    title: "Payment logged in EduNetwork",
    body: "The accountant records the final term payment against the student's balance.",
    meta: "EduNetwork · Fees",
  },
  {
    title: "Balance syncs to ClearEnroll",
    body: "The settled status is sent to ClearEnroll — on schedule, or immediately on payment.",
    meta: "Sync",
  },
  {
    title: "Clearance shows as settled",
    body: "A receiving school searching the record sees it cleared, with the photo on file.",
    meta: "ClearEnroll · Record",
  },
];

export function Integration() {
  return (
    <section id="integration" className="on-dark mesh-deep mx-2 rounded-[1.75rem] py-20 text-white md:mx-3 md:rounded-[2.25rem] md:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-emerald-soft">How they work together</p>
            <h2 className="text-h2 mt-4 !text-white">Connected school management. Transparent clearance.</h2>
          </div>
          <p className="text-lede text-navy-300 lg:col-span-5 lg:pt-10">
            EduNetwork runs operations inside your school. ClearEnroll extends what you know beyond it — so a settled
            balance in one system is a cleared record in the other.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:self-start">
            {benefits.map(([t, d], i) => (
              <div key={t} className="border-t border-white/15 py-5" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <dt className="font-display font-semibold text-white">{t}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-navy-300">{d}</dd>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "150ms" }}>
            <div className="rounded-xl bg-white p-6 text-ink shadow-deep md:p-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">From payment to clearance</p>
                <span className="text-eyebrow text-muted">3 steps</span>
              </div>
              <ol className="relative mt-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="absolute top-9 bottom-1 left-[1.0625rem] w-px bg-[repeating-linear-gradient(to_bottom,var(--color-line-strong)_0_4px,transparent_4px_8px)]" />
                    )}
                    <span
                      className={
                        i === steps.length - 1
                          ? "relative grid h-[2.125rem] w-[2.125rem] shrink-0 place-items-center rounded-full bg-emerald-ink font-mono text-xs text-white"
                          : "relative grid h-[2.125rem] w-[2.125rem] shrink-0 place-items-center rounded-full border border-line-strong bg-paper font-mono text-xs text-navy"
                      }
                    >
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <p className="text-eyebrow text-muted">{s.meta}</p>
                      <p className="mt-1 font-display font-semibold text-navy">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center justify-between rounded-lg border border-dashed border-emerald-ink/40 bg-emerald-wash px-4 py-3">
                <span className="font-mono text-xs text-ink-2">CE-2025-08492</span>
                <span className="font-mono text-xs font-medium tracking-[0.12em] text-emerald-ink uppercase">Cleared · GHS 0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
