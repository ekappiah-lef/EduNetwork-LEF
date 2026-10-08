import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const CONTACT = {
  email: "info@lefsignature.com",
  phone: "025 611 1811",
  tel: "+233256111811",
  clearenrollUrl: "https://clearenrollportal.com",
  clearenrollLabel: "clearenrollportal.com",
};

/* EduNetwork logo: the circular mark plus the wordmark, cut from the supplied artwork. */
export function Logo({ tone = "dark", size = "md" }: { tone?: "dark" | "light"; size?: "md" | "lg" }) {
  const mark = size === "lg" ? "h-12 w-auto" : "h-9 w-auto md:h-11";
  const word = size === "lg" ? "h-9 w-auto" : "h-6 w-auto md:h-8";
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/edunetwork-mark.png" alt="" className={mark} width={275} height={262} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tone === "dark" ? "/brand/edunetwork-wordmark.png" : "/brand/edunetwork-wordmark-white.png"}
        alt="EduNetwork School Management"
        className={word}
        width={604}
        height={102}
      />
    </span>
  );
}

type Variant = "primary" | "emerald" | "mint" | "outline" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-700 shadow-rest hover:shadow-lift",
  emerald: "bg-emerald-ink text-white hover:bg-[#005236] shadow-rest hover:shadow-lift",
  outline: "bg-paper text-ink-2 border border-line-strong hover:border-[#94a3b8] hover:bg-canvas",
  ghost: "text-navy hover:bg-panel",
  light: "bg-white text-navy hover:bg-navy-100 shadow-lift",
  mint: "bg-emerald-soft text-navy-950 hover:bg-[#6ffbbe] shadow-lift",
};

export function buttonClass(variant: Variant = "primary", size: "md" | "lg" = "md") {
  return cx(
    "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition-[background-color,box-shadow,border-color,transform] duration-200 active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-60",
    size === "lg" ? "h-12 px-6 text-[0.9375rem]" : "h-11 px-5 text-sm",
    variants[variant],
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: "md" | "lg" }) {
  return (
    <a className={cx(buttonClass(variant, size), className)} {...props}>
      {children}
    </a>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("text-eyebrow text-emerald-ink", className)}>{children}</p>;
}

/* Arrow that nudges right on hover of the parent button. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cx("transition-transform duration-200 group-hover/btn:translate-x-0.5", className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
