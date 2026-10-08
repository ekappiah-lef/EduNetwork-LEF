"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Nav from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink, CONTACT, Logo, cx } from "./ui";

const menus = [
  {
    label: "EduNetwork",
    blurb: "Run the school day: records, results, fees, timetables.",
    href: "#products",
    items: [
      { label: "Student records", href: "#products", note: "Admissions to graduation" },
      { label: "Results & report cards", href: "#products", note: "Exams, grading, transcripts" },
      { label: "Fees & finance", href: "#products", note: "Invoices, payments, balances" },
      { label: "Timetables & rosters", href: "#products", note: "Classes and staff duty" },
    ],
  },
  {
    label: "ClearEnroll",
    blurb: "Check fee clearance before a transfer or new admission.",
    href: "#clearenroll",
    portal: true,
    items: [
      { label: "Student clearance", href: "#capabilities", note: "Outstanding balances, by school" },
      { label: "Teacher verification", href: "#capabilities", note: "Staff moving between schools" },
      { label: "Photo ID confirmation", href: "#capabilities", note: "Match the record to the person" },
      { label: "EduNetwork payment sync", href: "#integration", note: "Clearance updates on payment" },
    ],
  },
];

const links = [
  { label: "Product tour", href: "#tour" },
  { label: "Integration", href: "#integration" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-[5.5rem] items-center px-2 md:px-3">
      <div
        className={cx(
          "mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between gap-6 rounded-full bg-white/95 pr-2 pl-5 backdrop-blur-md transition-shadow duration-300 md:pl-6",
          scrolled ? "shadow-deep" : "shadow-lift",
        )}
      >
        <a href="#top" className="rounded-md" aria-label="EduNetwork home">
          <Logo />
        </a>

        <Nav.Root className="relative hidden lg:block" delayDuration={80}>
          <Nav.List className="flex items-center gap-1">
            {menus.map((m) => (
              <Nav.Item key={m.label} className="relative">
                <Nav.Trigger className="group inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium text-ink-2 transition-colors hover:text-navy data-[state=open]:text-navy">
                  {m.label}
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className="text-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </Nav.Trigger>
                <Nav.Content className="absolute top-full left-1/2 z-50 w-[30rem] -translate-x-1/2 pt-2">
                  <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-lift">
                  <div className="grid grid-cols-[11rem_1fr] gap-0 p-2">
                    <div className="rounded-lg bg-navy p-4 text-white">
                      <p className="font-display text-[0.9375rem] font-semibold text-white">{m.label}</p>
                      <p className="mt-2 text-xs leading-relaxed text-navy-300">{m.blurb}</p>
                      <Nav.Link asChild>
                        <a href={m.href} className="mt-4 inline-block text-xs font-semibold text-emerald-soft underline-offset-4 hover:underline">
                          Overview
                        </a>
                      </Nav.Link>
                      {"portal" in m && (
                        <a
                          href={CONTACT.clearenrollUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 block text-xs font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
                        >
                          {CONTACT.clearenrollLabel} ↗
                        </a>
                      )}
                    </div>
                    <ul className="flex flex-col py-1 pl-2">
                      {m.items.map((it) => (
                        <li key={it.label}>
                          <Nav.Link asChild>
                            <a href={it.href} className="block rounded-md px-3 py-2 transition-colors hover:bg-panel">
                              <span className="block text-sm font-medium text-navy">{it.label}</span>
                              <span className="block text-xs text-muted">{it.note}</span>
                            </a>
                          </Nav.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                </Nav.Content>
              </Nav.Item>
            ))}
            {links.map((l) => (
              <Nav.Item key={l.label}>
                <Nav.Link href={l.href} className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-ink-2 transition-colors hover:text-navy">
                  {l.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav.List>
        </Nav.Root>

        <div className="flex items-center gap-2">
          <a href="#" className="hidden h-10 items-center rounded-md px-3 text-sm font-medium text-ink-2 hover:text-navy sm:inline-flex">
            Client portal
          </a>
          <ButtonLink href="#demo" className="max-sm:hidden">
            Book a demo
          </ButtonLink>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-panel lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} aria-hidden="true" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-paper shadow-deep focus:outline-none">
                <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-4">
                  <Dialog.Title asChild>
                    <span>
                      <Logo />
                    </span>
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                  <Dialog.Close className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-panel" aria-label="Close menu">
                    <X size={22} aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav className="flex-1 px-4 py-4" aria-label="Mobile">
                  {menus.map((m) => (
                    <div key={m.label} className="border-b border-line pb-4 mb-4">
                      <p className="text-eyebrow mb-2 text-muted">{m.label}</p>
                      <ul>
                        {m.items.map((it) => (
                          <li key={it.label}>
                            <a href={it.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-md px-2 font-medium text-navy hover:bg-panel">
                              {it.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <ul>
                    {links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-md px-2 font-medium text-navy hover:bg-panel">
                          {l.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="#" className="flex min-h-11 items-center rounded-md px-2 font-medium text-navy hover:bg-panel">
                        Client portal
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="border-t border-line p-4">
                  <ButtonLink href="#demo" size="lg" className="w-full" onClick={() => setOpen(false)}>
                    Book a demo
                  </ButtonLink>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
