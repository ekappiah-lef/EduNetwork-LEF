"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ButtonLink, Eyebrow, cx } from "./ui";

type Tour = {
  id: "edunetwork" | "clearenroll";
  tab: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  video: string;
  /** Chapter start times in seconds, taken from the recording script. */
  chapters: { title: string; t: number }[];
};

/* Recorded from the running apps with demo data; personal contact details are blurred. */
const tours: Tour[] = [
  {
    id: "edunetwork",
    tab: "EduNetwork",
    title: "A school day, run from one place",
    body: "Recorded in EduNetwork with a demo school of 140 students: records, results, fees and timetables — and the ClearEnroll fee sync built in.",
    cta: { label: "Explore EduNetwork", href: "#products" },
    video: "/videos/edunetwork",
    chapters: [
      { title: "Administration dashboard", t: 0 },
      { title: "Student records & profiles", t: 3.8 },
      { title: "Results & tabulation", t: 10.9 },
      { title: "Fees & finance", t: 17.8 },
      { title: "Timetables", t: 21.1 },
      { title: "ClearEnroll fee sync", t: 22.8 },
    ],
  },
  {
    id: "clearenroll",
    tab: "ClearEnroll",
    title: "From search to a clear decision",
    body: "Recorded in ClearEnroll: one student comes back cleared, another flagged with fees still owed — each with the photo on file.",
    cta: { label: "Explore ClearEnroll", href: "#clearenroll" },
    video: "/videos/clearenroll",
    chapters: [
      { title: "Verification dashboard", t: 0 },
      { title: "Student & teacher records", t: 3.4 },
      { title: "Photo ID confirmation", t: 5.2 },
      { title: "Outstanding fee status", t: 12 },
      { title: "Multi-school confirmation", t: 17 },
      { title: "EduNetwork payment sync", t: 18.9 },
    ],
  },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function ProductTour() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const userPaused = useRef(false);

  const tour = tours[active];
  const chapter = tour.chapters.reduce((acc, c, i) => (time >= c.t - 0.05 ? i : acc), 0);

  // Autoplay (muted) while the player is on screen, unless the visitor prefers reduced motion or paused it.
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce && !userPaused.current) v.play().catch(() => {});
        if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  function selectTab(i: number) {
    if (i === active) return;
    userPaused.current = false;
    setActive(i);
    setTime(0);
    setDuration(0);
  }

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  function seek(t: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
    setTime(t);
    userPaused.current = false;
    v.play().catch(() => {});
  }

  const accent = tour.id === "clearenroll" ? "bg-emerald" : "bg-amber";

  return (
    <section id="tour" ref={sectionRef} className="wash-mint py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-12 md:items-end" data-reveal>
          <div className="md:col-span-7">
            <Eyebrow>Product tour</Eyebrow>
            <h2 className="text-h2 mt-4">Two products. Watch each one at work.</h2>
          </div>
          <p className="text-ink-2 md:col-span-5">
            These walkthroughs were recorded in the real apps, using demo school data. Pick a chapter to jump straight to
            it.
          </p>
        </div>

        <div role="tablist" aria-label="Choose a walkthrough" className="mt-10 inline-flex gap-1 rounded-full bg-white p-1 shadow-rest" data-reveal>
          {tours.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => selectTab(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tours.length) % tours.length;
                  selectTab(n);
                  document.getElementById(`tab-${tours[n].id}`)?.focus();
                }
              }}
              className={cx(
                "h-11 cursor-pointer rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-200",
                active === i ? (t.id === "clearenroll" ? "bg-emerald-ink text-white" : "bg-navy text-white") : "text-ink-2 hover:text-navy",
              )}
            >
              {t.tab}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tour.id}`} aria-labelledby={`tab-${tour.id}`} className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl bg-navy-950 shadow-deep ring-1 ring-navy/10">
              <div className="h-9" aria-hidden="true" />
              <div className="relative aspect-video bg-navy-950">
                <video
                  key={tour.id}
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  poster={`${tour.video}-poster.jpg`}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  aria-label={`${tour.tab} walkthrough video`}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                >
                  <source src={`${tour.video}.mp4`} type="video/mp4" />
                  <source src={`${tour.video}.webm`} type="video/webm" />
                </video>
                {!playing && (
                  <button
                    type="button"
                    onClick={toggle}
                    className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-navy-950/25 transition-colors hover:bg-navy-950/15"
                    aria-label={`Play the ${tour.tab} walkthrough`}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-navy shadow-deep transition-transform duration-200 group-hover:scale-105">
                      <Play size={26} className="ml-1" fill="currentColor" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-white sm:px-4">
                <button
                  type="button"
                  onClick={toggle}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-white/10"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
                </button>
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
                    <div className={cx("h-full", accent)} style={{ width: duration ? `${(time / duration) * 100}%` : "0%" }} />
                  </div>
                  {duration > 0 &&
                    tour.chapters.slice(1).map((c) => (
                      <span
                        key={c.title}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 rounded bg-white/50"
                        style={{ left: `${(c.t / duration) * 100}%` }}
                      />
                    ))}
                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={time}
                    onChange={(e) => seek(Number(e.target.value))}
                    aria-label="Seek"
                    aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
                    className="relative h-6 w-full cursor-pointer appearance-none bg-transparent opacity-0"
                  />
                </div>
                <span className="font-mono text-xs text-white/70 tabular-nums">
                  {fmt(time)} / {fmt(duration)}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-h3">{tour.title}</h3>
            <p className="mt-3 text-ink-2">{tour.body}</p>
            <p className="text-eyebrow mt-8 text-muted">Chapters</p>
            <ol className="mt-3 flex flex-col gap-1">
              {tour.chapters.map((c, i) => {
                const isActive = i === chapter;
                return (
                  <li key={c.title}>
                    <button
                      type="button"
                      onClick={() => seek(c.t)}
                      aria-current={isActive ? "step" : undefined}
                      className={cx(
                        "flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-200",
                        isActive ? "bg-white font-semibold text-navy shadow-rest" : "text-ink-2 hover:bg-white/60 hover:text-navy",
                      )}
                    >
                      <span className="w-9 font-mono text-xs text-muted tabular-nums">{fmt(c.t)}</span>
                      <span className="flex-1">{c.title}</span>
                      <span aria-hidden="true" className={cx("h-2 w-2 rounded-full transition-colors", isActive ? accent : "bg-transparent")} />
                    </button>
                  </li>
                );
              })}
            </ol>
            <ButtonLink href={tour.cta.href} variant={tour.id === "clearenroll" ? "emerald" : "primary"} className="mt-8">
              {tour.cta.label} <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
