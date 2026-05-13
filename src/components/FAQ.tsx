import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./Reveal";

export default function FAQ() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-surface border-y border-line">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20"
      >
        <motion.div variants={fadeUp} className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4">{t("faq.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight whitespace-pre-line font-semibold tracking-tight">
            {t("faq.title")}
          </h2>
        </motion.div>

        <ul className="bg-white rounded-2xl border border-line px-6 lg:px-8 divide-y divide-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li variants={fadeUp} key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                >
                  <span className="text-base sm:text-lg text-ink leading-snug font-medium pr-4">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 h-9 w-9 rounded-full border flex items-center justify-center transition-all ${
                      isOpen
                        ? "bg-blue border-blue text-white"
                        : "border-line text-ink group-hover:border-blue group-hover:text-blue"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-ink-soft text-sm sm:text-base leading-relaxed pr-12 pb-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
