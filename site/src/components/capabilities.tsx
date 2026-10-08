import { BadgeCheck, IdCard, Network, RefreshCw, ScanSearch, Wallet, type LucideIcon } from "lucide-react";
import { Eyebrow } from "./ui";

const items: Array<{ icon: LucideIcon; title: string; body: string; tag: string }> = [
  {
    icon: ScanSearch,
    title: "Student clearance verification",
    body: "Check a student's financial clearance before admission or transfer, including outstanding obligations at participating schools.",
    tag: "Transfers & admissions",
  },
  {
    icon: BadgeCheck,
    title: "Teacher verification",
    body: "Look up a teacher's clearance record when staff move between schools, so hiring decisions rest on the record, not a phone call.",
    tag: "Staff moves",
  },
  {
    icon: IdCard,
    title: "Photo-based identification",
    body: "Where available, the student's or teacher's photograph appears alongside the record to support accurate identification.",
    tag: "Identity",
  },
  {
    icon: Wallet,
    title: "Outstanding fee visibility",
    body: "See which students carry outstanding school fee balances and follow their clearance status as it changes.",
    tag: "Balances",
  },
  {
    icon: RefreshCw,
    title: "Automatic clearance updates",
    body: "With EduNetwork connected, payment records sync to ClearEnroll. When a balance is fully settled, the clearance status updates on its own.",
    tag: "Requires EduNetwork",
  },
  {
    icon: Network,
    title: "A connected school network",
    body: "Participating schools share one verification platform, supporting responsible student and staff transitions between them.",
    tag: "Multi-school",
  },
];

const tints = ["bg-emerald-wash text-emerald-ink", "bg-amber-wash text-amber-ink", "bg-navy-100 text-navy"];

export function Capabilities() {
  return (
    <section id="capabilities" className="wash-warm py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28" data-reveal>
            <Eyebrow>ClearEnroll in detail</Eyebrow>
            <h2 className="text-h2 mt-4">Greater transparency. Better school transitions.</h2>
            <p className="mt-5 text-ink-2">
              Tools for school administration and financial accountability   built around the moment a student or
              teacher leaves one school for another.
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {items.map(({ icon: Icon, title, body, tag }, i) => (
            <li
              key={title}
              className="group flex flex-col rounded-2xl bg-white/80 p-6 shadow-rest ring-1 ring-navy/5 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift md:p-8"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}
            >
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${tints[i % tints.length]}`}>
                <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-[1.125rem] font-semibold tracking-[-0.01em] text-navy">{title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{body}</p>
              <p className="text-eyebrow mt-6 text-muted">{tag}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
