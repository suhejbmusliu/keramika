import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Keramika"
            className="h-16 w-auto object-contain"
          />
        </div>
        <p className="text-xs text-muted">
          © {year} KERAMIKA D.O.O. — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
