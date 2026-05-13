import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowDown, ArrowRight } from "lucide-react";

type Slide = { title: string; subtitle: string; image: string };

const AUTOPLAY_MS = 6000;

export default function Hero({ onQuote }: { onQuote: () => void }) {
  const { t } = useTranslation();
  const slides = t("hero.slides", { returnObjects: true }) as Slide[];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + slides.length) % slides.length);

  const current = slides[active];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={current.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-white/50" />
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/80 uppercase">
                {t("hero.eyebrow")}
              </p>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] text-white mb-8 whitespace-pre-line tracking-tight">
              {current.title}
            </h1>

            <p className="text-white/75 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
              {current.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onQuote}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue text-white text-sm font-medium hover:bg-blue-deep transition-colors"
              >
                {t("hero.primary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#gallery"
                className="inline-flex items-center px-6 py-3.5 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {t("hero.secondary")}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => go(-1)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue hover:border-blue transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue hover:border-blue transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-10 sm:translate-x-0 z-20 flex items-center gap-3">
        <span className="font-mono text-xs text-white/60 tabular-nums">
          {String(active + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-0.5 transition-all rounded-full ${
                i === active ? "w-10 bg-white" : "w-5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-white/60 tabular-nums">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <a
        href="#headline"
        className="absolute bottom-8 left-10 z-20 hidden sm:flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Scroll
      </a>
    </section>
  );
}
