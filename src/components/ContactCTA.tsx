import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ContactCTA = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 py-28"
      aria-labelledby="contact-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
          className="glass-surface relative overflow-hidden rounded-[34px] p-8 sm:p-12 md:p-16 lg:p-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-black/10" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-black/10" />

          <div className="relative max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-black" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50 sm:text-sm">
                Start a Project
              </span>
            </div>

            <h2
              id="contact-title"
              className="max-w-[12ch] text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Have an idea worth making{" "}
              <span className="font-serif font-normal italic">memorable?</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Tell me what you are building, who it is for, and the feeling you
              want people to have. I can help shape the visual direction,
              interaction, and development into one polished experience.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={siteConfig.contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/85"
              >
                Start on WhatsApp
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={siteConfig.contact.email.href}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                Send an Email
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={siteConfig.contact.viber.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3.5 text-sm font-medium text-black/50 transition hover:text-black"
              >
                Viber
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-black/10 pt-6 text-sm text-muted-foreground sm:flex-row">
          <span>
            &copy; 2026{" "}
            <span className="font-medium text-foreground">
              {siteConfig.name}
            </span>
            . Designed and developed with intention.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
