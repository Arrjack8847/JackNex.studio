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

const whatsappNumber = "60175052024";
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
      "A premium editorial website for a Yangon invitation studio, combining product discovery, celebration storytelling, craftsmanship content, and enquiry-focused UX into one polished experience.",
    role: "Design + Development",
    focus: "Editorial UX / Brand Presence",
    year: "2026",

    desktopImages: [
      {
        src: "/projects/project2/project1.webp",
        previewSrc: "/projects/project2/project1-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Elegant Star Myanmar wedding invitation studio desktop homepage preview",
      },
      {
        src: "/projects/project2/project2.webp",
        previewSrc: "/projects/project2/project2-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Elegant Star Myanmar collection browsing desktop preview",
      },
      {
        src: "/projects/project2/project3.webp",
        previewSrc: "/projects/project2/project3-preview.jpg",
        width: 1920,
        height: 1080,
        alt: "Elegant Star Myanmar enquiry experience desktop preview",
      },
    ],

    mobileImages: [
      {
        src: "/projects/project2/pproject1.webp",
        width: 960,
        height: 2079,
        alt: "Elegant Star Myanmar mobile homepage preview",
      },
      {
        src: "/projects/project2/pproject2.webp",
        width: 960,
        height: 2079,
        alt: "Elegant Star Myanmar mobile collection browsing preview",
      },
      {
        src: "/projects/project2/pproject3.webp",
        width: 960,
        height: 2079,
        alt: "Elegant Star Myanmar mobile enquiry preview",
      },
    ],

    link: "https://elegantstarinvites.com/",
  },

  {
    title: "Cinematic Wedding Invitation",
    category: "Interactive Invitation",
    tags: ["React", "Framer Motion", "Responsive"],
    description:
      "An immersive digital wedding invitation that turns a traditional invite into an interactive experience through elegant motion, layered storytelling, and mobile-first interaction.",
    role: "Interaction Design + Development",
    focus: "Motion / Mobile Experience",
    year: "2026",

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

  {
    title: "Power House Gym",
    category: "Conversion Website",
    tags: ["React", "Tailwind", "Responsive"],
    description:
      "A bold, conversion-focused fitness website built around strong visual hierarchy, clear training offers, responsive layouts, and direct membership calls to action.",
    role: "Design + Development",
    focus: "Conversion / Responsive UX",
    year: "2026",

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
];
