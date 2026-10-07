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
  role: string;
  focus: string;
  year: string;
  desktopImages: ProjectImage[];
  mobileImages: ProjectImage[];
  link: string;
};

const whatsappNumber = "601114092340";
const viberNumber = "+959428502373";

const projectInquiryMessage =
  "Hi JackNex Studio, I want to build a website. Here's a short idea of what I need:";

export const siteConfig = {
  name: "JackNex Studio",
  url: "https://jacknex.studio",
  title: "JackNex Studio | Cinematic & Interactive Websites",
  description:
    "JackNex Studio designs and develops cinematic, interactive, mobile-first websites for brands, businesses, and meaningful celebrations.",

  email: "smks8847@gmail.com",

  contact: {
    whatsapp: {
      label: "Start a Project",
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
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Process",
    href: "#process",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
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

export const services = [
  {
    number: "01",
    title: "Brand & Business Websites",
    description:
      "Premium responsive websites that make businesses look established, clear, and credible from the first screen.",
    detail: "Strategy · UI direction · Development",
  },
  {
    number: "02",
    title: "Digital Invitations",
    description:
      "Mobile-first invitation experiences for weddings, family celebrations, and meaningful events with elegant storytelling.",
    detail: "Invitation UX · RSVP-ready · Mobile-first",
  },
  {
    number: "03",
    title: "Motion & Interaction",
    description:
      "Cinematic openings, transitions, scroll motion, and micro-interactions designed to feel memorable without sacrificing usability.",
    detail: "GSAP · Framer Motion · Performance",
  },
] as const;

export const aboutStats = [
  {
    value: "10+",
    label: "Projects Built",
  },
  {
    value: "Mobile-first",
    label: "Experience Focus",
  },
  {
    value: "Design + Code",
    label: "One Workflow",
  },
] as const;

export const projects: Project[] = [
  {
    title: "Elegant Star Myanmar",
    category: "Client Website",
    tags: ["Next.js", "TypeScript", "GSAP"],
    description:
      "A premium editorial website for an invitation studio, combining product discovery, celebration storytelling, craftsmanship content, and enquiry-focused UX into one polished experience.",
    role: "Design + Development",
    focus: "Editorial UX / Brand Presence",
    year: "2026",

    desktopImages: [
      {
        src: "/projects/elegant-star/desktop-1.jpg",
        width: 1920,
        height: 1079,
        alt: "Elegant Star Myanmar desktop homepage preview",
      },
      {
        src: "/projects/elegant-star/desktop-2.jpg",
        width: 1920,
        height: 1079,
        alt: "Elegant Star Myanmar desktop collection browsing preview",
      },
      {
        src: "/projects/elegant-star/desktop-3.jpg",
        width: 1920,
        height: 1079,
        alt: "Elegant Star Myanmar desktop product detail preview",
      },
    ],

    mobileImages: [
      {
        src: "/projects/elegant-star/mobile-1.jpg",
        width: 960,
        height: 2079,
        alt: "Elegant Star Myanmar mobile homepage preview",
      },
      {
        src: "/projects/elegant-star/mobile-2.jpg",
        width: 960,
        height: 2079,
        alt: "Elegant Star Myanmar mobile collection preview",
      },
      {
        src: "/projects/elegant-star/mobile-3.jpg",
        width: 960,
        height: 2079,
        alt: "Elegant Star Myanmar mobile product detail preview",
      },
    ],

    link: "https://elegantstarinvites.com/",
  },

  {
    title: "Myanmar Traditional Invitation",
    category: "Interactive Invitation",
    tags: ["Mobile-first", "Motion", "Bilingual UX"],
    description:
      "A traditional Myanmar wedding invitation reimagined as an interactive digital experience, combining ornate cultural visuals, bilingual presentation, music, and cinematic transitions.",
    role: "Design + Development",
    focus: "Invitation UX / Cultural Storytelling",
    year: "2026",

    desktopImages: [
      {
        src: "/projects/myanmar-invitation/desktop-1.jpg",
        width: 1920,
        height: 1079,
        alt: "Myanmar traditional invitation desktop envelope opening preview",
      },
      {
        src: "/projects/myanmar-invitation/desktop-2.jpg",
        width: 1920,
        height: 1079,
        alt: "Myanmar traditional invitation desktop invitation card preview",
      },
      {
        src: "/projects/myanmar-invitation/desktop-3.jpg",
        width: 1920,
        height: 1079,
        alt: "Myanmar traditional invitation desktop couple story preview",
      },
    ],

    mobileImages: [
      {
        src: "/projects/myanmar-invitation/mobile-1.jpg",
        width: 960,
        height: 2079,
        alt: "Myanmar traditional invitation mobile envelope opening preview",
      },
      {
        src: "/projects/myanmar-invitation/mobile-2.jpg",
        width: 960,
        height: 2079,
        alt: "Myanmar traditional invitation mobile invitation card preview",
      },
      {
        src: "/projects/myanmar-invitation/mobile-3.jpg",
        width: 960,
        height: 2079,
        alt: "Myanmar traditional invitation mobile couple story preview",
      },
    ],

    link: "https://myanmar-traditional-invitation-card.vercel.app/",
  },

  {
    title: "JackNex Creative",
    category: "Creative Portfolio",
    tags: ["Responsive", "Motion", "Visual Storytelling"],
    description:
      "A bold creative portfolio for video and visual work, built around high-impact typography, cinematic project presentation, and a dark editorial direction across desktop and mobile.",
    role: "Design + Development",
    focus: "Creative Direction / Portfolio UX",
    year: "2026",

    desktopImages: [
      {
        src: "/projects/jacknex-creative/desktop-1.jpg",
        width: 1920,
        height: 1079,
        alt: "JackNex Creative desktop homepage preview",
      },
      {
        src: "/projects/jacknex-creative/desktop-2.jpg",
        width: 1920,
        height: 1079,
        alt: "JackNex Creative desktop featured project preview",
      },
      {
        src: "/projects/jacknex-creative/desktop-3.jpg",
        width: 1920,
        height: 1079,
        alt: "JackNex Creative desktop project grid preview",
      },
    ],

    mobileImages: [
      {
        src: "/projects/jacknex-creative/mobile-1.jpg",
        width: 960,
        height: 2079,
        alt: "JackNex Creative mobile homepage preview",
      },
      {
        src: "/projects/jacknex-creative/mobile-2.jpg",
        width: 960,
        height: 2079,
        alt: "JackNex Creative mobile project detail preview",
      },
      {
        src: "/projects/jacknex-creative/mobile-3.jpg",
        width: 960,
        height: 2079,
        alt: "JackNex Creative mobile homepage alternate preview",
      },
    ],

    link: "https://jacknex-creative.vercel.app/",
  },
];
