export type ProjectImage = {
  src: string;
  previewSrc?: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  title: string;
  category: string;
  tags: string[];
  description: string;
  desktopImages: ProjectImage[];
  mobileImages: ProjectImage[];
  link: string;
};

const whatsappNumber = "60175052024";
const viberNumber = "+959428502373";
const projectInquiryMessage =
  "Hi JackNex Studio, I want to build a website. Here's a short idea of what I need:";

export const siteConfig = {
  name: "JackNex Studio",
  url: "https://jacknex.studio",
  title: "JackNex Studio | Web Design & Development",
  description:
    "JackNex Studio builds modern, high-converting websites with premium design, smooth UX, and powerful performance.",
  email: "smks8847@gmail.com",
  contact: {
    whatsapp: {
      label: "Discuss Your Project",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        projectInquiryMessage,
      )}`,
    },
    viber: {
      label: "Contact through Viber",
      href: `viber://chat?number=${encodeURIComponent(viberNumber)}`,
      number: viberNumber,
    },
    email: {
      label: "Email Me",
      href: "mailto:smks8847@gmail.com",
    },
    telegram: null,
  },
} as const;

export const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jacknex.studio",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CqfvBfBzs/?mibextid=wwXIfr",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/soe-min-khant-1a138534b",
  },
] as const;

export const portfolioStats = [
  { value: "10+", label: "Projects Built" },
  { value: "3", label: "Featured Projects" },
  { value: "Responsive", label: "Development" },
  { value: "Modern", label: "Web Experiences" },
] as const;

export const aboutStats = [
  { value: "10+", label: "Projects Built" },
  { value: "Modern", label: "Design Style" },
  { value: "Fast", label: "Delivery Focus" },
] as const;

export const servicePackages = [
  {
    title: "Starter Website",
    subtitle: "Perfect for small businesses and personal brands.",
    price: "RM 599 - RM 999",
    delivery: "3-5 Days",
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
    price: "RM 1,299 - RM 1,999",
    delivery: "5-10 Days",
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
    price: "RM 2,999+",
    delivery: "10-21 Days",
    revisions: "Scope-Based Revisions",
    features: [
      "Fully Custom Website",
      "Advanced Animations",
      "AI / Automation Features",
      "Scalable Architecture",
      "Premium Visual Direction",
    ],
    highlighted: false,
  },
] as const;

export const projects: Project[] = [
  {
    title: "Elegant Star Wedding Platform",
    category: "Full-Stack Web App",
    tags: ["React", "TypeScript", "Supabase"],
    description:
      "A modern wedding platform for browsing designs, placing orders, and managing bookings.",
    desktopImages: [
      {
        src: "/projects/project2/project1.webp",
        previewSrc: "/projects/project2/project1-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Elegant Star wedding platform desktop homepage preview",
      },
      {
        src: "/projects/project2/project2.webp",
        previewSrc: "/projects/project2/project2-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Elegant Star wedding platform desktop package browsing preview",
      },
      {
        src: "/projects/project2/project3.webp",
        previewSrc: "/projects/project2/project3-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Elegant Star wedding platform desktop booking management preview",
      },
    ],
    mobileImages: [
      {
        src: "/projects/project2/pproject1.webp",
        width: 960,
        height: 2079,
        alt: "Elegant Star wedding platform mobile homepage preview",
      },
      {
        src: "/projects/project2/pproject2.webp",
        width: 960,
        height: 2079,
        alt: "Elegant Star wedding platform mobile design browsing preview",
      },
      {
        src: "/projects/project2/pproject3.webp",
        width: 960,
        height: 2079,
        alt: "Elegant Star wedding platform mobile booking preview",
      },
    ],
    link: "https://final-elegent-star.vercel.app/",
  },
  {
    title: "Power House Gym Website",
    category: "Fitness Website",
    tags: ["React", "Tailwind", "Responsive"],
    description:
      "A bold gym website designed to attract members and showcase training programs.",
    desktopImages: [
      {
        src: "/projects/project1/project1.webp",
        previewSrc: "/projects/project1/project1-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Power House Gym desktop homepage preview",
      },
      {
        src: "/projects/project1/project2.webp",
        previewSrc: "/projects/project1/project2-preview.jpg",
        width: 1920,
        height: 1079,
        alt: "Power House Gym desktop programs preview",
      },
      {
        src: "/projects/project1/project3.webp",
        previewSrc: "/projects/project1/project3-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Power House Gym desktop pricing preview",
      },
    ],
    mobileImages: [
      {
        src: "/projects/project1/pproject1.webp",
        width: 591,
        height: 1280,
        alt: "Power House Gym mobile homepage preview",
      },
      {
        src: "/projects/project1/pproject2.webp",
        width: 960,
        height: 2079,
        alt: "Power House Gym mobile programs preview",
      },
      {
        src: "/projects/project1/pproject3.webp",
        width: 960,
        height: 2079,
        alt: "Power House Gym mobile pricing preview",
      },
    ],
    link: "https://power-house-coral.vercel.app/",
  },
  {
    title: "Cinematic Wedding Invitation Website",
    category: "Wedding Website",
    tags: ["React", "Framer Motion", "Responsive"],
    description:
      "A cinematic wedding invitation website designed to turn a love story into an interactive digital experience, with smooth animations, elegant UI, and optimized mobile design.",
    desktopImages: [
      {
        src: "/projects/project3/project1.webp",
        previewSrc: "/projects/project3/project1-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Cinematic wedding invitation desktop opening preview",
      },
      {
        src: "/projects/project3/project2.webp",
        previewSrc: "/projects/project3/project2-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Cinematic wedding invitation desktop story section preview",
      },
      {
        src: "/projects/project3/project3.webp",
        previewSrc: "/projects/project3/project3-preview.jpg",
        width: 1920,
        height: 1079,
        alt: "Cinematic wedding invitation desktop RSVP preview",
      },
    ],
    mobileImages: [
      {
        src: "/projects/project3/pproject1.webp",
        width: 591,
        height: 1280,
        alt: "Cinematic wedding invitation mobile opening preview",
      },
      {
        src: "/projects/project3/pproject2.webp",
        width: 591,
        height: 1280,
        alt: "Cinematic wedding invitation mobile story preview",
      },
      {
        src: "/projects/project3/pproject3.webp",
        width: 591,
        height: 1280,
        alt: "Cinematic wedding invitation mobile RSVP preview",
      },
    ],
    link: "https://wedding-invation1.vercel.app/",
  },
];
