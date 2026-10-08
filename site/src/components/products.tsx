import Image from "next/image";
import { ArrowRight, ButtonLink, Eyebrow, cx } from "./ui";

const products = [
  {
    id: "products",
    kicker: "EduNetwork · School management system",
    name: "One platform for every school operation.",
    body: "EduNetwork is a web-based school management system that brings admissions, academic records, fees, exams, report cards, timetables and parent communication into one place — with dedicated access for administrators, academic staff, accountants, teachers, parents and students.",
    image: "/images/classroom.jpg",
    alt: "A teacher talks with students working on laptops in a bright classroom",
    caption: "Day-to-day administration",
    features: [
      ["Academic records & transcripts", "From admission through to graduation."],
      ["Fee & tuition invoicing", "Balances update as payments are logged."],
      ["Timetables & scheduling", "Classes, rooms and staff duty rosters."],
      ["Parent & teacher communication", "Notices, reports and messages in one thread."],
    ],
    primary: { label: "Explore EduNetwork", href: "#capabilities" },
    secondary: { label: "Book a demo", href: "#demo" },
    accent: "navy" as const,
  },
  {
    id: "clearenroll",
    kicker: "ClearEnroll · Clearance & verification",
    name: "Verify with confidence. Enrol with clarity.",
    body: "ClearEnroll helps schools check the financial clearance of students and teachers before a transfer or new admission. Participating schools can see outstanding fee obligations, confirm the record against the photo on file, and make the enrolment decision with the facts in front of them.",
    image: "/images/admissions-office.jpg",
    alt: "An admissions officer reviews records on a tablet with a family at a school reception desk",
    caption: "Admissions & transfers",
    features: [
      ["Student financial clearance", "Outstanding balances across participating schools."],
      ["Teacher clearance verification", "For staff moving between institutions."],
      ["Photo-based identification", "The record and the person, side by side."],
      ["Automatic EduNetwork sync", "Clearance updates once fees are settled."],
    ],
    primary: { label: "Explore ClearEnroll", href: "#capabilities" },
    secondary: { label: "Visit clearenrollportal.com", href: "https://clearenrollportal.com" },
    accent: "emerald" as const,
  },
];

export function Products() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="products-heading">
      <div className="container-page">
        <div className="max-w-3xl" data-reveal>
          <Eyebrow>The product family</Eyebrow>
          <h2 id="products-heading" className="text-h2 mt-4">
            Manage your school with EduNetwork. Verify with ClearEnroll.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {products.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.id} id={p.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={cx("lg:col-span-6", flip && "lg:order-2")} data-reveal>
                  <div
                    className={cx(
                      "relative rounded-[1.75rem] p-3 sm:p-4",
                      flip ? "frame-warm" : "frame-cool",
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl bg-panel shadow-lift">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        width={512}
                        height={286}
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                      />
                    </div>
                    <p
                      className={cx(
                        "absolute -bottom-3 rounded-full px-4 py-2 font-mono text-xs text-white shadow-lift",
                        flip ? "right-8 bg-emerald-ink" : "left-8 bg-navy",
                      )}
                    >
                      {p.caption}
                    </p>
                  </div>
                </div>

                <div className={cx("lg:col-span-6", flip && "lg:order-1")} data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
                  <p className={cx("text-eyebrow", p.accent === "emerald" ? "text-emerald-ink" : "text-navy-700")}>{p.kicker}</p>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] leading-[1.15] font-bold tracking-[-0.022em] text-navy">
                    {p.name}
                  </h3>
                  <p className="mt-5 text-ink-2">{p.body}</p>

                  <dl className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {p.features.map(([t, d]) => (
                      <div key={t} className="border-t border-line py-4">
                        <dt className="flex items-center gap-2 text-sm font-semibold text-navy">
                          <span
                            aria-hidden="true"
                            className={cx("h-1.5 w-1.5 rounded-full", p.accent === "emerald" ? "bg-emerald" : "bg-navy")}
                          />
                          {t}
                        </dt>
                        <dd className="mt-1 pl-3.5 text-sm text-muted">{d}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <ButtonLink href={p.primary.href} variant={p.accent === "emerald" ? "emerald" : "primary"}>
                      {p.primary.label} <ArrowRight />
                    </ButtonLink>
                    <ButtonLink
                      href={p.secondary.href}
                      variant="outline"
                      {...(p.secondary.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {p.secondary.label}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
