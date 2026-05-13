import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "sq", label: "AL" },
  { code: "sr", label: "SRB" },
];

export default function Navbar({ onQuote }: { onQuote: () => void }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#craft", label: t("nav.craft") },
    { href: "#rooms", label: t("nav.rooms") },
    { href: "#materials", label: t("nav.materials") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const currentLang = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  const dark = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-white/85 backdrop-blur-lg border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Keramika"
            className="h-16 w-auto object-contain"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  dark
                    ? "text-white/80 hover:text-white"
                    : "text-ink-soft hover:text-blue"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                dark
                  ? "border-white/25 text-white hover:border-white"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span>{currentLang.label}</span>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-2 w-32 rounded-xl border border-line bg-white shadow-xl overflow-hidden"
                onMouseLeave={() => setLangOpen(false)}
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      i18n.changeLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      l.code === i18n.language
                        ? "text-blue font-semibold bg-blue-tint"
                        : "text-ink hover:text-blue hover:bg-blue-tint/60"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onQuote}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-blue text-white text-sm font-medium hover:bg-blue-deep transition-colors"
          >
            {t("quote.button")}
          </button>

          <button
            className={`lg:hidden ml-1 ${dark ? "text-white" : "text-ink"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="px-6 pb-6 flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base text-ink-soft hover:text-blue transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false);
                onQuote();
              }}
              className="mt-3 w-full px-4 py-2.5 rounded-lg bg-blue text-white text-sm font-medium"
            >
              {t("quote.button")}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
