// §5 interaction inventory: reveal fallback + count-up. ~1.5 kB total client JS.
// Runs once from the Interactions client component in layout.tsx.

const REDUCED = "(prefers-reduced-motion: no-preference)";

function countUp(el: HTMLElement) {
  const finalText = el.textContent ?? "";
  const final = Number(finalText.replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(final)) return;
  const prefix = finalText.match(/^[^\d-]*/)?.[0] ?? "";
  const suffix = finalText.match(/[^\d]*$/)?.[0] ?? "";
  const decimals = (finalText.split(".")[1]?.match(/\d+/)?.[0] ?? "").length;
  const fmt = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const start = performance.now();
  const dur = 900;
  const tick = (now: number) => {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    el.textContent = prefix + fmt.format(final * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = finalText; // restore exact server-rendered value
  };
  el.textContent = prefix + fmt.format(0) + suffix; // reset only once running
  requestAnimationFrame(tick);
}

export function initInteractions() {
  const html = document.documentElement;
  html.classList.add("js");

  const nativeSDA = CSS.supports("animation-timeline: view()");
  if (!nativeSDA) html.classList.add("no-sda");

  const motionOk = matchMedia(REDUCED).matches;

  // One IO for both: .in-view toggling (reveal fallback + chart draw-in) and count-up.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        if (el.hasAttribute("data-countup")) {
          if (motionOk) countUp(el);
        } else {
          el.classList.add("in-view");
        }
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -12% 0px" }
  );

  if (!nativeSDA) {
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  }
  document
    .querySelectorAll(".chart-draw, [data-countup]")
    .forEach((el) => io.observe(el));

  // Nav frost-on-scroll: rAF-throttled class toggle at 24px.
  const nav = document.querySelector(".site-nav");
  if (nav) {
    let raf = 0;
    const update = () => {
      raf = 0;
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    addEventListener(
      "scroll",
      () => {
        if (!raf) raf = requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }
}
