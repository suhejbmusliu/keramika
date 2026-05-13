import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { fadeUp, stagger } from "./Reveal";

type Category = "all" | "ceramics" | "work";

const ITEMS: { src: string; category: Exclude<Category, "all"> }[] = [
  ...Array.from({ length: 9 }, (_, i) => ({
    src: `/gallery/type-${i + 1}.jpg`,
    category: "ceramics" as const,
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    src: `/gallery/img-${i + 1}.jpg`,
    category: "work" as const,
  })),
];

export default function Gallery() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Category>("work");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = ITEMS.filter(
    (item) => filter === "all" || item.category === filter
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const filters: { id: Category; label: string }[] = [
    { id: "all", label: t("gallery.filters.all") },
    { id: "work", label: t("gallery.filters.work") },
    { id: "ceramics", label: t("gallery.filters.ceramics") },
  ];

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="eyebrow mb-4">{t("gallery.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              {t("gallery.title")}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 text-sm rounded-lg border font-medium transition-all ${
                  filter === f.id
                    ? "bg-ink border-ink text-white"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink bg-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.button
                layout
                key={item.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(item.src)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-6 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-blue hover:border-blue transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
