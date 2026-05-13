import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./Reveal";

export default function Materials() {
  const { t } = useTranslation();
  const items = t("materials.items", { returnObjects: true }) as {
    name: string;
    detail: string;
  }[];

  return (
    <section id="materials" className="bg-surface border-y border-line">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20"
      >
        <motion.div variants={fadeUp} className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4">{t("materials.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight whitespace-pre-line font-semibold tracking-tight">
            {t("materials.title")}
          </h2>
        </motion.div>

        <ul className="divide-y divide-line border-y border-line bg-white rounded-2xl px-6 lg:px-8">
          {items.map((m, i) => (
            <motion.li
              variants={fadeUp}
              key={i}
              className="grid grid-cols-[auto_1fr] sm:grid-cols-[60px_1fr_1.5fr] gap-4 sm:gap-8 py-7 items-start group"
            >
              <span className="font-mono text-xs text-blue pt-1.5">
                0{i + 1}
              </span>
              <h3 className="text-xl sm:text-2xl text-ink font-semibold tracking-tight group-hover:text-blue transition-colors">
                {m.name}
              </h3>
              <p className="text-ink-soft text-sm leading-relaxed col-span-2 sm:col-span-1">
                {m.detail}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
