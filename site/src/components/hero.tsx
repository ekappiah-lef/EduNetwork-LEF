import { ClearanceSlip } from "./clearance-slip";
import { ArrowRight, ButtonLink } from "./ui";

const ledger = [
  { name: "Ama Serwaa Owusu", form: "JHS 2", balance: "GHS 0.00", state: "Settled" },
  { name: "David K. Mensah", form: "JHS 3", balance: "GHS 0.00", state: "Settled" },
  { name: "Kofi Asante", form: "JHS 1", balance: "GHS 1,850.00", state: "Due" },
];

const roles = ["Administrators", "Academic staff", "Accountants & bursars", "Teachers", "Parents", "Students"];

export function Hero() {
  return (
    <section id="top" className="-mt-[5.5rem]">
      {/* Navy, emerald and amber washes blending into one another — the page's colour signature. */}
      <div className="mesh-hero on-dark relative overflow-hidden text-white">
        <div className="container-page relative grid gap-12 pt-32 pb-14 md:pt-36 lg:grid-cols-12 lg:gap-8 lg:pt-40 lg:pb-16">
          <div className="rise-in min-w-0 lg:col-span-7 lg:pr-6">
            <h1 className="text-display !text-white">
              Smarter school management.{" "}
              <span className="block text-[#8ff0c4]">Trusted school verification.</span>
            </h1>
            <p className="text-lede mt-6 max-w-[38rem] text-white/80">
              Run admissions, results, fees and timetables in EduNetwork. Before a student or teacher moves schools,
              check their fee clearance in ClearEnroll — with the photo on file to confirm it&rsquo;s the right person.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#products" size="lg" variant="light">
                Explore EduNetwork <ArrowRight />
              </ButtonLink>
              <ButtonLink href="#clearenroll" size="lg" variant="mint">
                Discover ClearEnroll
              </ButtonLink>
              <a
                href="#tour"
                className="group/btn ml-1 inline-flex h-12 items-center gap-2 text-[0.9375rem] font-semibold text-white"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-colors group-hover/btn:bg-white/25" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.8v8.4L10 6z" fill="currentColor" /></svg>
                </span>
                Watch the walkthroughs
              </a>
            </div>
          </div>

          {/* The EduNetwork fee ledger sits behind; the ClearEnroll slip it produces sits in front. */}
          <div className="rise-in relative min-w-0 [animation-delay:120ms] lg:col-span-5">
            <div className="relative mx-auto max-w-[31rem] pb-[19rem] md:pb-[17rem] lg:mx-0 lg:ml-auto lg:pb-[16.5rem]">
              <div className="rounded-2xl bg-paper text-ink shadow-deep">
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <span className="text-sm font-semibold text-navy">EduNetwork · Fees ledger</span>
                </div>
                <table className="w-full text-sm">
                  <caption className="sr-only">Sample fee balances in EduNetwork</caption>
                  <thead>
                    <tr className="text-left text-xs text-muted">
                      <th scope="col" className="px-4 pt-2 pb-2 font-medium">Student</th>
                      <th scope="col" className="px-2 pt-2 pb-2 font-medium">Class</th>
                      <th scope="col" className="px-4 pt-2 pb-2 text-right font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger.map((r) => (
                      <tr key={r.name} className={r.state === "Due" ? "bg-amber-wash/70" : ""}>
                        <td className="px-4 py-2.5 font-medium text-ink">{r.name}</td>
                        <td className="px-2 py-2.5 text-muted">{r.form}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={r.state === "Due" ? "font-mono text-[0.8125rem] text-amber-ink" : "font-mono text-[0.8125rem] text-ink"}>
                            {r.balance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center gap-2 rounded-b-2xl bg-panel px-4 py-2.5 text-xs text-ink-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="text-emerald-ink">
                    <path d="M2 5h10l-3-3M14 11H4l3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Settled balances sync to ClearEnroll
                </div>
              </div>

              <ClearanceSlip
                className="absolute right-0 bottom-0 left-6 text-ink sm:left-14 lg:-left-10 xl:-left-16"
                animateStamp
                recordId="CE-2026-08492"
                name="David K. Mensah"
                role="Student · Transfer to Ridge Preparatory"
                initials="DM"
                status="cleared"
                rows={[
                  { label: "Previous school", value: "Horizon Academy" },
                  { label: "Outstanding balance", value: "GHS 0.00", tone: "good" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="container-page relative flex flex-col gap-3 pb-8 md:flex-row md:items-center md:gap-6">
          <p className="text-eyebrow shrink-0 text-white/60">One login per role</p>
          <ul className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <li key={r} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/85 backdrop-blur-sm">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
