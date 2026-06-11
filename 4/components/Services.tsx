import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { servicePackages, siteConfig } from "@/config/site";
import { useAnimationSettings } from "@/hooks/use-animation-settings";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type PackageCardProps = {
  title: string;
  subtitle: string;
  price: string;
  delivery: string;
  revisions: string;
  features: readonly string[];
  highlighted?: boolean;
  index: number;
};

function PackageCard({
  title,
  subtitle,
  price,
  delivery,
  revisions,
  features,
  highlighted = false,
  index,
}: PackageCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const settings = useAnimationSettings();
  const canTilt = settings.hasFinePointer && !prefersReducedMotion;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 240,
    damping: 16,
    mass: 0.45,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 240,
    damping: 16,
    mass: 0.45,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canTilt) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;
    const maxTilt = 4;

    rawRotateY.set(percentX * maxTilt);
    rawRotateX.set(-percentY * maxTilt);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
      whileHover={canTilt ? { y: -8, scale: 1.01 } : undefined}
      whileTap={{ scale: 0.992 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: canTilt ? rotateX : 0,
        rotateY: canTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        willChange: canTilt ? "transform" : "auto",
      }}
      className={`group relative overflow-hidden rounded-[24px] border p-5 sm:rounded-[28px] sm:p-6 lg:p-8 ${
        highlighted
          ? "border-black bg-black text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
          : "border-black/10 bg-white text-black shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ${
          highlighted
            ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(255,255,255,0.03))]"
            : "bg-[linear-gradient(135deg,rgba(0,0,0,0.04),transparent_38%,rgba(0,0,0,0.015))]"
        }`}
      />

      <motion.div
        animate={{
          opacity: isHovering && canTilt ? 1 : 0.7,
          x: isHovering && canTilt ? "8%" : "0%",
          y: isHovering && canTilt ? "-4%" : "0%",
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <div
          className={`absolute -left-[20%] top-0 h-full w-[70%] rotate-12 blur-2xl ${
            highlighted ? "bg-white/10" : "bg-white/60"
          }`}
        />
      </motion.div>

      <div
        className={`pointer-events-none absolute inset-0 rounded-[24px] ring-1 transition-all duration-300 sm:rounded-[28px] ${
          highlighted
            ? "ring-white/10 group-hover:ring-white/20"
            : "ring-black/5 group-hover:ring-black/10"
        }`}
      />

      <div
        className={`pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-6 ${
          highlighted ? "bg-white/20" : "bg-black/10"
        }`}
      />

      <div
        className="relative z-10 flex h-full flex-col"
        style={{ transform: canTilt ? "translateZ(20px)" : undefined }}
      >
        {highlighted && (
          <div className="mb-4 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 sm:mb-5 sm:text-[11px]">
            Most Popular
          </div>
        )}

        <div className="mb-5 sm:mb-6">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
            {title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed sm:mt-3 ${
              highlighted ? "text-white/72" : "text-black/60"
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div className="mb-5 sm:mb-6">
          <div className="text-2xl font-bold tracking-tight sm:text-3xl">
            {price}
          </div>
        </div>

        <div
          className={`mb-6 space-y-2 text-sm sm:mb-7 ${
            highlighted ? "text-white/78" : "text-black/65"
          }`}
        >
          <p>{delivery}</p>
          <p>{revisions}</p>
        </div>

        <div className="mb-7 flex-1 space-y-3 sm:mb-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  highlighted
                    ? "border-white/20 bg-white/5"
                    : "border-black/10 bg-black/[0.03]"
                }`}
              >
                <Check
                  className={`h-3 w-3 ${
                    highlighted ? "text-white" : "text-black"
                  }`}
                  aria-hidden="true"
                />
              </div>

              <span
                className={`text-sm leading-relaxed ${
                  highlighted ? "text-white/90" : "text-black/85"
                }`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <motion.a
          href={siteConfig.contact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium transition-all duration-300 sm:w-auto ${
            highlighted
              ? "bg-white text-black hover:bg-white/90"
              : "bg-black text-white hover:bg-black/90"
          }`}
        >
          <span>Start Your Project</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      </div>
    </motion.div>
  );
}

const Services = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28"
      aria-labelledby="services-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04, 1] }}
          transition={{
            duration: prefersReducedMotion ? 0 : 12,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-24 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-black/[0.03] blur-[90px] sm:top-32 sm:h-[420px] sm:w-[420px] sm:blur-[120px] lg:h-[520px] lg:w-[520px] lg:blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-12 text-center sm:mb-14 lg:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-6 bg-black sm:w-8" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-black sm:text-sm">
              Website Packages
            </span>
            <div className="h-[2px] w-6 bg-black sm:w-8" />
          </div>

          <h2
            id="services-title"
            className="text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl"
          >
            Choose the Right Package
            <br className="hidden sm:block" /> for Your Business
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm leading-relaxed text-black/60 sm:mt-5 sm:px-0 sm:text-base">
            Clear offers, faster delivery, and a smoother client experience.
            Built to help your brand look professional and convert better.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3"
          style={{ perspective: "1400px" }}
        >
          {servicePackages.map((pkg, index) => (
            <PackageCard
              key={pkg.title}
              title={pkg.title}
              subtitle={pkg.subtitle}
              price={pkg.price}
              delivery={pkg.delivery}
              revisions={pkg.revisions}
              features={pkg.features}
              highlighted={pkg.highlighted}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-10 text-center sm:mt-12"
        >
          <p className="mx-auto max-w-3xl px-2 text-xs leading-relaxed text-black/55 sm:px-0 sm:text-sm">
            Revision rounds apply within the agreed project scope and timeline.
            Delivery time depends on client response speed and project
            requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
