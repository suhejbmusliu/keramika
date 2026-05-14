import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./revealVariants";

export default function Process() {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as {
    n: string;
    title: string;
    body: string;
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
          <p className="eyebrow mb-4">{t("process.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
            {t("process.title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              variants={fadeUp}
              key={step.n}
              className="relative rounded-2xl border border-line p-8 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5 transition-all duration-300 bg-white"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-sm text-blue font-medium">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-line ml-4" />
                {i < steps.length - 1 && (
                  <span className="hidden lg:block text-line ml-2">→</span>
                )}
              </div>
              <h3 className="text-xl mb-3 font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-ink-soft text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
