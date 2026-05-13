import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "./Reveal";

export default function Rooms() {
  const { t } = useTranslation();
  const items = t("rooms.items", { returnObjects: true }) as {
    label: string;
    img: string;
  }[];

  return (
    <section id="rooms" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center mb-14">
          <p className="eyebrow mb-4">{t("rooms.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
            {t("rooms.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {items.map((room, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className={`group relative rounded-2xl overflow-hidden ${
                i % 3 === 0 ? "aspect-[16/11]" : "aspect-[16/10]"
              }`}
            >
              <img
                src={room.img}
                alt={room.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <p className="text-2xl sm:text-3xl text-white font-semibold tracking-tight">
                  {room.label}
                </p>
                <span className="h-10 w-10 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
