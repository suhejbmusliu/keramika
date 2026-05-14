import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { fadeUp, stagger } from "./revealVariants";

export default function Contact() {
  const { t } = useTranslation();

  const items = [
    {
      icon: MapPin,
      title: t("contact.location"),
      body: t("contact.address"),
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      body: (
        <>
          <a href="tel:+381638686873" className="block hover:text-blue">
            +381 63 8686873
          </a>
          <a href="tel:+38162254036" className="block hover:text-blue">
            +381 62 254036
          </a>
        </>
      ),
    },
    {
      icon: Mail,
      title: t("contact.email"),
      body: (
        <>
          <a
            href="mailto:s.fejzullahu@hotmail.com"
            className="block hover:text-blue break-all"
          >
            s.fejzullahu@hotmail.com
          </a>
          <a
            href="mailto:sabedinfejzullahu1@gmail.com"
            className="block hover:text-blue break-all"
          >
            sabedinfejzullahu1@gmail.com
          </a>
        </>
      ),
    },
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{t("contact.eyebrow")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight whitespace-pre-line font-semibold tracking-tight">
            {t("contact.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {items.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className="bg-white border border-line rounded-2xl p-8 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5 transition-all duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-tint text-blue mb-5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl mb-3 font-semibold tracking-tight">{title}</h3>
              <div className="text-ink-soft text-sm leading-relaxed">{body}</div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-line">
          <iframe
            title="Keramika location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52976.06067890367!2d21.683799788998662!3d42.32612174691803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354f9b7133b6845%3A0x70b8a854545b918b!2sKERAMIKA%20D.OO%20MERMER%20GRANIT%20STARI%20PUT%20BUSTRAN!5e0!3m2!1smk!2smk!4v1729626075467!5m2!1smk!2smk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
