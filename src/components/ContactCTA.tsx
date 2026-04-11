import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-surface rounded-3xl p-12 text-center sm:p-20"
        >
          <h2 className="mb-5 text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="text-gradient-cyan">Great</span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Have a project in mind? Let&apos;s talk about how I can help your
            brand grow with a modern website that looks premium and converts
            better.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/60175052024?text=Hi%20JackNex%20Studio%2C%20I%20want%20to%20build%20a%20website."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="mailto:smks8847@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span>
            © 2026{" "}
            <span className="font-medium text-foreground">JackNex Studio</span>.
            All rights reserved.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/soe-min-khant-1a138534b"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/jacknex.studio"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;