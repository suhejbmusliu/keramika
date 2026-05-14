import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./revealVariants";

const IMAGES = [
  "/images/service-img1.jpg",
  "/images/service-img2.jpg",
  "/images/service-img3.jpg",
  "/images/service-img6.jpg",
];

export default function Craft() {
  const { t } = useTranslation();
  const items = t("craft.items", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section id="craft" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4">{t("craft.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight whitespace-pre-line font-semibold tracking-tight">
              {t("craft.title")}
            </h2>
          </div>
          <p className="text-muted text-sm max-w-sm leading-relaxed">
            {t("craft.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <motion.a
              key={i}
              variants={fadeUp}
              href="#gallery"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface border border-line hover:border-blue/40 transition-all duration-500"
            >
              <img
                src={IMAGES[i]}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="font-mono text-[11px] text-white/70 tracking-wider">
                  0{i + 1}
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <h3 className="text-xl text-white mb-1 font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/75 text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-14 flex justify-center">
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-sm text-blue hover:gap-3 transition-all font-medium group"
          >
            {t("craft.browse")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
