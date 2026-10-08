"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, Logo, cx } from "./ui";

const columns = [
  {
    title: "Products",
    links: [
      ["EduNetwork", "#products"],
      ["ClearEnroll", "#clearenroll"],
      ["Financial clearance", "#capabilities"],
      ["Academic management", "#products"],
      ["Parent & teacher portals", "#tour"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Product tour", "#tour"],
      ["Integration overview", "#integration"],
      ["Clearance network FAQ", "#capabilities"],
      ["School onboarding", "#demo"],
    ],
  },
];

export function SiteFooter() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("newsletter") ?? "").trim();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  }

  return (
    <footer className="on-dark bg-navy-950 text-navy-300">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo tone="light" size="lg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            School management and clearance verification for schools that want transfers settled on the facts.
          </p>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="lg:col-span-2">
            <h2 className="text-eyebrow !text-white/60">{c.title}</h2>
            <ul className="mt-4 flex flex-col">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="inline-flex min-h-11 items-center text-sm text-navy-300 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="md:col-span-2 lg:col-span-4">
          <h2 className="text-eyebrow !text-white/60">Contact</h2>
          <ul className="mt-4 flex flex-col text-sm">
            <li>
              <a className="inline-flex min-h-11 items-center hover:text-white" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center hover:text-white" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center hover:text-white" href={CONTACT.clearenrollUrl} target="_blank" rel="noopener noreferrer">
                ClearEnroll portal · {CONTACT.clearenrollLabel}
              </a>
            </li>
          </ul>

          <form onSubmit={onSubmit} noValidate className="mt-8">
            <label htmlFor="newsletter" className="text-sm font-medium text-white">
              Updates on clearance policy and new features
            </label>
            {state === "done" ? (
              <p role="status" className="mt-3 text-sm text-emerald-soft">
                Subscribed. Look out for the next update in your inbox.
              </p>
            ) : (
              <>
                <div className="mt-3 flex gap-2">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="email"
                    autoComplete="email"
                    placeholder="you@school.edu"
                    aria-invalid={state === "error" || undefined}
                    aria-describedby={state === "error" ? "newsletter-error" : undefined}
                    onChange={() => state === "error" && setState("idle")}
                    className={cx(
                      "h-11 min-w-0 flex-1 rounded-lg border bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-soft focus:outline-none",
                      state === "error" ? "border-[#f87171]" : "border-white/15",
                    )}
                  />
                  <button type="submit" className="h-11 cursor-pointer rounded-lg bg-white px-4 text-sm font-semibold text-navy transition-colors hover:bg-navy-100">
                    Subscribe
                  </button>
                </div>
                {state === "error" && (
                  <p id="newsletter-error" className="mt-2 text-xs text-[#fca5a5]">
                    Enter a valid email address.
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EduNetwork Inc. &amp; ClearEnroll. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6">
            {["Privacy policy", "Terms of service", "Clearance security & compliance"].map((l) => (
              <li key={l}>
                <a href="#" className="inline-flex min-h-11 items-center hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
