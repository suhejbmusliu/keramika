import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./Reveal";

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) as {
    quote: string;
    name: string;
    role: string;
  }[];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{t("testimonials.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.figure
              variants={fadeUp}
              key={i}
              className="bg-white border border-line rounded-2xl p-8 flex flex-col hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5 transition-all duration-300"
            >
              <Quote className="h-6 w-6 text-blue mb-6" />
              <blockquote className="text-ink text-base leading-relaxed flex-1">
                "{it.quote}"
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-line">
                <p className="text-lg text-ink font-semibold tracking-tight">
                  {it.name}
                </p>
                <p className="font-mono text-xs text-muted mt-1">{it.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
