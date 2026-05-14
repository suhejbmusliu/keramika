import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./revealVariants";

export default function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) as {
    location: string;
    country: string;
    year: string;
    type: string;
  }[];

  return (
    <section id="projects" className="bg-surface border-y border-line">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32"
      >
        <motion.div variants={fadeUp} className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{t("projects.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight whitespace-pre-line font-semibold tracking-tight">
            {t("projects.title")}
          </h2>
        </motion.div>

        <ul className="bg-white rounded-2xl border border-line overflow-hidden">
          {items.map((p, i) => (
            <motion.li
              variants={fadeUp}
              key={i}
              className="group grid grid-cols-[40px_1fr_auto] sm:grid-cols-[60px_1.2fr_1fr_auto] gap-4 sm:gap-8 items-center px-6 sm:px-8 py-7 border-b border-line last:border-b-0 hover:bg-blue-tint/40 transition-colors cursor-default"
            >
              <span className="font-mono text-xs text-blue">
                0{i + 1}
              </span>
              <div>
                <p className="text-xl sm:text-2xl text-ink font-semibold tracking-tight">
                  {p.location}
                </p>
                <p className="font-mono text-xs text-muted mt-1">{p.country}</p>
              </div>
              <p className="text-ink-soft text-sm hidden sm:block">{p.type}</p>
              <p className="font-mono text-xs text-ink-soft tabular-nums">{p.year}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
