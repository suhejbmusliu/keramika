import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const stats = t("about.stats", { returnObjects: true }) as {
    value: string;
    label: string;
  }[];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref={ref} className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface">
          <motion.img
            style={{ y }}
            src="/images/about-img.jpg"
            alt="Keramika workshop"
            className="absolute inset-0 w-full h-[115%] object-cover"
          />
        </div>

        <Reveal>
          <p className="eyebrow mb-5">{t("about.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight font-semibold tracking-tight">
            {t("about.title")}
          </h2>
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed mb-12">
            {t("about.body")}
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-line">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl text-ink mb-2 font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-muted text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
