import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { X, MessageSquare } from "lucide-react";

const MAIL_TO = "s.fejzullahu@hotmail.com";

export default function QuoteCTA({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Quote request — Keramika");
    const body = encodeURIComponent(
      `Name: ${name}\nContact: ${phone}\n\nProject:\n${project}`
    );
    window.location.href = `mailto:${MAIL_TO}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-blue text-white shadow-xl shadow-blue/25 hover:bg-blue-deep hover:scale-105 transition-all text-sm font-medium"
        aria-label={t("quote.button")}
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">{t("quote.button")}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl border border-line"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-6 sm:p-8 pb-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl mb-1 font-semibold tracking-tight">
                    {t("quote.title")}
                  </h3>
                  <p className="text-muted text-sm">{t("quote.subtitle")}</p>
                </div>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-surface transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {sent ? (
                <div className="px-6 sm:px-8 pb-8">
                  <p className="text-ink text-base py-8 text-center">
                    {t("quote.success")}
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="px-6 sm:px-8 pb-8 space-y-3">
                  <input
                    required
                    placeholder={t("quote.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-line focus:border-blue focus:ring-2 focus:ring-blue/15 focus:outline-none text-ink placeholder:text-muted transition-all"
                  />
                  <input
                    required
                    placeholder={t("quote.phone")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-line focus:border-blue focus:ring-2 focus:ring-blue/15 focus:outline-none text-ink placeholder:text-muted transition-all"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder={t("quote.project")}
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-line focus:border-blue focus:ring-2 focus:ring-blue/15 focus:outline-none text-ink placeholder:text-muted resize-none transition-all"
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-5 py-3 rounded-lg border border-line text-ink-soft hover:border-ink hover:text-ink transition-colors text-sm font-medium"
                    >
                      {t("quote.cancel")}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-5 py-3 rounded-lg bg-blue text-white hover:bg-blue-deep transition-colors text-sm font-medium"
                    >
                      {t("quote.send")}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
