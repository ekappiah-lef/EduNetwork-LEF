"use client";

import { CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CONTACT, Eyebrow, buttonClass, cx } from "./ui";

type Field = "firstName" | "lastName" | "email" | "school";
type Errors = Partial<Record<Field, string>>;

const roles = [
  "Head of school / Superintendent",
  "Principal / Academic dean",
  "Director of admissions / Registrar",
  "Bursar / Financial controller",
  "IT director / Technical admin",
];
const interests = ["EduNetwork + ClearEnroll", "EduNetwork", "ClearEnroll"];

function validate(data: FormData): Errors {
  const e: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();
  if (!get("firstName")) e.firstName = "Enter your first name.";
  if (!get("lastName")) e.lastName = "Enter your last name.";
  const email = get("email");
  if (!email) e.email = "Enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter an email like name@school.edu.";
  if (!get("school")) e.school = "Enter your school or district.";
  return e;
}

const input =
  "h-11 w-full rounded-xl border bg-paper px-3 text-[0.9375rem] text-ink placeholder:text-[#8a97a8] transition-[border-color,box-shadow] duration-150 focus:border-navy focus:shadow-[0_0_0_3px_rgb(15_37_64/0.12)] focus:outline-none";

export function DemoSection() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const e = validate(data);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setStatus("sending");
    // No backend is wired up yet   replace this delay with a POST to your CRM or API route.
    await new Promise((r) => setTimeout(r, 900));
    setName(String(data.get("firstName")));
    setStatus("sent");
  }

  function fieldProps(id: Field) {
    return {
      id,
      name: id,
      "aria-invalid": errors[id] ? true : undefined,
      "aria-describedby": errors[id] ? `${id}-error` : undefined,
      onChange: () => errors[id] && setErrors((prev) => ({ ...prev, [id]: undefined })),
      className: cx(input, errors[id] ? "border-[#dc2626] focus:shadow-[0_0_0_3px_rgb(239_68_68/0.15)]" : "border-line-strong"),
    };
  }

  const Err = ({ id }: { id: Field }) =>
    errors[id] ? (
      <p id={`${id}-error`} className="mt-1.5 text-xs text-[#b91c1c]">
        {errors[id]}
      </p>
    ) : null;

  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <Eyebrow>Book a demo</Eyebrow>
          <h2 className="text-h2 mt-4">See it with your own school&rsquo;s workflow.</h2>
          <p className="mt-5 text-ink-2">
            Schedule a guided walkthrough of EduNetwork, ClearEnroll, or both together. We&rsquo;ll follow the way your
            school actually runs admissions, fees and transfers.
          </p>

          <dl className="mt-10 border-t border-line">
            {[
              ["A walkthrough for your roles", "EduNetwork workflows for your administrators and bursars, and multi-school clearance lookup for admissions."],
              ["Data protection, explained", "How role-based permissions decide who can see clearance records."],
              ["An onboarding plan", "Help setting up school accounts and importing student and teacher records."],
            ].map(([t, d]) => (
              <div key={t} className="border-b border-line py-4">
                <dt className="font-display font-semibold text-navy">{t}</dt>
                <dd className="mt-1 text-sm text-ink-2">{d}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-2 text-sm text-ink-2">
            <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center gap-2 font-medium text-navy hover:underline">
              <Mail size={16} aria-hidden="true" /> {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.tel}`} className="inline-flex min-h-11 items-center gap-2 font-medium text-navy hover:underline">
              <Phone size={16} aria-hidden="true" /> {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div className="frame-warm rounded-[1.75rem] p-3 sm:p-4">
          <div className="rounded-2xl bg-paper p-6 shadow-lift md:p-10">
            {status === "sent" ? (
              <div className="flex min-h-[26rem] flex-col items-start justify-center" role="status">
                <CheckCircle2 size={36} strokeWidth={1.6} className="text-emerald-ink" aria-hidden="true" />
                <h3 className="text-h3 mt-5">Thanks, {name}. Your request is in.</h3>
                <p className="mt-3 max-w-md text-ink-2">
                  Someone from our team will email you to arrange a time. If it&rsquo;s urgent, call {CONTACT.phone}.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className={cx(buttonClass("outline"), "mt-8 cursor-pointer")}>
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-labelledby="form-title">
                <h3 id="form-title" className="text-h3">
                  Schedule a guided walkthrough
                </h3>
                <p className="mt-1.5 text-sm text-muted">All fields are required.</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-navy">First name</label>
                    <input type="text" autoComplete="given-name" placeholder="Eleanor" {...fieldProps("firstName")} />
                    <Err id="firstName" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-navy">Last name</label>
                    <input type="text" autoComplete="family-name" placeholder="Vance" {...fieldProps("lastName")} />
                    <Err id="lastName" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">Work email</label>
                    <input type="email" autoComplete="email" inputMode="email" placeholder="e.vance@oakwood.edu" {...fieldProps("email")} />
                    <Err id="email" />
                  </div>
                  <div>
                    <label htmlFor="school" className="mb-1.5 block text-sm font-medium text-navy">School or district</label>
                    <input type="text" autoComplete="organization" placeholder="Oakwood Academy" {...fieldProps("school")} />
                    <Err id="school" />
                  </div>
                  <div>
                    <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-navy">Your role</label>
                    <select id="role" name="role" className={cx(input, "border-line-strong")}>
                      {roles.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-navy">Interested in</label>
                    <select id="interest" name="interest" className={cx(input, "border-line-strong")}>
                      {interests.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cx(buttonClass("primary", "lg"), "mt-8 w-full cursor-pointer")}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending request…
                    </>
                  ) : (
                    "Request a walkthrough"
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-muted">
                  We use these details only to arrange your demo.
                </p>
              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
