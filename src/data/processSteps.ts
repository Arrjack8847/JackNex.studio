import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Code2,
  MessageCircle,
  Rocket,
  SearchCheck,
} from "lucide-react";

export type ProcessStepId =
  | "discovery"
  | "planning"
  | "development"
  | "review"
  | "launch";

export type ProcessStep = {
  id: ProcessStepId;
  number: string;
  label: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
  featured?: boolean;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    label: "DISCUSS",
    title: "Discovery",
    duration: "1–2 Days",
    description:
      "We discuss your idea, goals, audience, preferred style, required features and expected timeline.",
    deliverables: [
      "Project brief",
      "Goal and audience alignment",
      "Feature requirements",
    ],
    icon: MessageCircle,
  },
  {
    id: "planning",
    number: "02",
    label: "ORGANIZE",
    title: "Planning",
    duration: "2–3 Days",
    description:
      "I organize the page structure, content, visual direction and development plan before building starts.",
    deliverables: ["Sitemap", "Content structure", "Visual direction"],
    icon: ClipboardList,
  },
  {
    id: "development",
    number: "03",
    label: "CREATE",
    title: "Design & Development",
    duration: "7-10 Days",
    description:
      "I design and build a responsive website that matches your brand and feels smooth on every screen.",
    deliverables: [
      "UI and UX design",
      "Responsive development",
      "Animation and interaction",
    ],
    icon: Code2,
    featured: true,
  },
  {
    id: "review",
    number: "04",
    label: "IMPROVE",
    title: "Review & Refinement",
    duration: "3–5 Days",
    description:
      "We review the website together, test important screens and improve the details that matter.",
    deliverables: [
      "Feedback revisions",
      "Desktop, tablet and mobile testing",
      "Performance improvements",
    ],
    icon: SearchCheck,
  },
  {
    id: "launch",
    number: "05",
    label: "DELIVER",
    title: "Launch & Support",
    duration: "Ongoing",
    description:
      "I prepare the final build, launch the website and provide clear guidance after delivery.",
    deliverables: ["Deployment", "Final checks", "Post-launch guidance"],
    icon: Rocket,
  },
];

export const processStepIds = processSteps.map((step) => step.id);
