import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          className="glass-surface rounded-3xl p-8 text-center sm:p-12 md:p-20"
        >
          <h2
            id="contact-title"
            className="mb-5 text-3xl font-extrabold leading-tight text-foreground sm:text-5xl"
          >
            Let's Build Something{" "}
            <span className="text-gradient-cyan">Great</span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Have a project in mind? Let's talk about how I can help your brand
            grow with a modern website that looks premium and converts better.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={siteConfig.contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              {siteConfig.contact.whatsapp.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.contact.email.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              {siteConfig.contact.email.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.contact.viber.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              {siteConfig.contact.viber.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span>
            &copy; 2026{" "}
            <span className="font-medium text-foreground">
              {siteConfig.name}
            </span>
            . All rights reserved.
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
