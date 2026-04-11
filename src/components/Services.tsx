import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const packages = [
  {
    title: "Starter Website",
    subtitle: "Perfect for small businesses and personal brands.",
    price: "RM 599 – RM 999",
    delivery: "3–5 Days",
    revisions: "2 Revision Rounds",
    features: [
      "Up to 3 Pages",
      "Mobile Responsive Design",
      "Clean Modern Layout",
      "Basic SEO Structure",
    ],
    highlighted: false,
  },
  {
    title: "Business Website",
    subtitle: "Best for growing brands that need a stronger online presence.",
    price: "RM 1299 – RM 1999",
    delivery: "5–10 Days",
    revisions: "4 Revision Rounds",
    features: [
      "Up to 8 Pages",
      "Custom UI/UX Design",
      "Performance Optimization",
      "SEO-Ready Structure",
      "Conversion-Focused Layout",
    ],
    highlighted: true,
  },
  {
    title: "Premium Website",
    subtitle: "For brands that want a custom, high-end experience.",
    price: "RM 2999+",
    delivery: "10–21 Days",
    revisions: "Unlimited Revisions*",
    features: [
      "Fully Custom Website",
      "Advanced Animations",
      "AI / Automation Features",
      "Scalable Architecture",
      "Premium Visual Direction",
    ],
    highlighted: false,
  },
];

const whatsappLink =
  "https://wa.me/60175052024?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20website%20service.%20I%E2%80%99d%20like%20to%20start%20a%20project.%20Here%E2%80%99s%20a%20short%20idea%20of%20what%20I%20need%3A";

type PackageCardProps = {
  title: string;
  subtitle: string;
  price: string;
  delivery: string;
  revisions: string;
  features: string[];
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



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = width / 2;
    const centerY = height / 2;

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
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.992 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border p-5 sm:p-6 lg:p-8 ${
        highlighted
          ? "border-black bg-black text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
          : "border-black/10 bg-white text-black shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* base gradient */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ${
          highlighted
            ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(255,255,255,0.03))]"
            : "bg-[linear-gradient(135deg,rgba(0,0,0,0.04),transparent_38%,rgba(0,0,0,0.015))]"
        }`}
      />

      {/* subtle premium shine */}
      <motion.div
        animate={{
          opacity: isHovering ? 1 : 0.7,
          x: isHovering ? "8%" : "0%",
          y: isHovering ? "-4%" : "0%",
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

      {/* border glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ${
          highlighted
            ? "ring-white/10 group-hover:ring-white/20"
            : "ring-black/5 group-hover:ring-black/10"
        } transition-all duration-300`}
      />

      {/* top edge light */}
      <div
        className={`pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-px ${
          highlighted ? "bg-white/20" : "bg-black/10"
        }`}
      />

      <div
        className="relative z-10 flex h-full flex-col"
        style={{ transform: "translateZ(20px)" }}
      >
        {highlighted && (
          <div className="mb-4 sm:mb-5 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
            Most Popular
          </div>
        )}

        <div className="mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            {title}
          </h3>
          <p
            className={`mt-2 sm:mt-3 text-sm leading-relaxed ${
              highlighted ? "text-white/72" : "text-black/60"
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div className="mb-5 sm:mb-6">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight">
            {price}
          </div>
        </div>

        <div
          className={`mb-6 sm:mb-7 space-y-2 text-sm ${
            highlighted ? "text-white/78" : "text-black/65"
          }`}
        >
          <p>{delivery}</p>
          <p>{revisions}</p>
        </div>

        <div className="mb-7 sm:mb-8 flex-1 space-y-3">
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
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium transition-all duration-300 sm:w-auto ${
            highlighted
              ? "bg-white text-black hover:bg-white/92"
              : "bg-black text-white hover:bg-black/92"
          }`}
        >
          <span>Start Your Project</span>
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.div>
  );
}

const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-24 sm:top-32 h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] -translate-x-1/2 rounded-full bg-black/[0.03] blur-[90px] sm:blur-[120px] lg:blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-14 lg:mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-6 sm:w-8 bg-black" />
            <span className="text-[11px] sm:text-sm font-medium uppercase tracking-[0.18em] text-black">
              Website Packages
            </span>
            <div className="h-[2px] w-6 sm:w-8 bg-black" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
            Choose the Right Package
            <br className="hidden sm:block" /> for Your Business
          </h2>

          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-black/60 px-2 sm:px-0">
            Clear offers, faster delivery, and a smoother client experience.
            Built to help your brand look professional and convert better.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3"
          style={{ perspective: "1400px" }}
        >
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.title}
              title={pkg.title}
              subtitle={pkg.subtitle}
              price={pkg.price}
              delivery={pkg.delivery}
              revisions={pkg.revisions}
              features={pkg.features}
              highlighted={pkg.highlighted}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="mx-auto max-w-3xl text-xs sm:text-sm leading-relaxed text-black/55 px-2 sm:px-0">
            *Unlimited revisions apply within project scope and timeline.
            Delivery time depends on client response speed and project
            requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;