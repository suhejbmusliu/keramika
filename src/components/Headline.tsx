import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

export default function Headline() {
  const { t } = useTranslation();

  return (
    <section
      id="headline"
      className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center"
    >
      <Reveal>
        <p className="eyebrow mb-6">{t("headline.eyebrow")}</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl leading-snug text-ink font-medium tracking-tight">
          {t("headline.text")}
        </p>
      </Reveal>
    </section>
  );
}
