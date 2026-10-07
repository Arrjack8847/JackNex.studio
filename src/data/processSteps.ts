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
    label: "DISCOVER",
    title: "Idea & Goals",
    duration: "Day 1",
    description:
      "We define what you are building, who it is for, the feeling you want, required features, references and the overall goal.",
    deliverables: [
      "Project direction",
      "Audience and goal alignment",
      "Feature scope",
    ],
    icon: MessageCircle,
  },
  {
    id: "planning",
    number: "02",
    label: "DIRECTION",
    title: "Structure & Creative Direction",
    duration: "Days 2–3",
    description:
      "I organize the content flow, visual mood, page structure and interaction direction so the experience is clear before the main build begins.",
    deliverables: [
      "Experience structure",
      "Visual direction",
      "Interaction plan",
    ],
    icon: ClipboardList,
  },
  {
    id: "development",
    number: "03",
    label: "CREATE",
    title: "Design & Development",
    duration: "Days 4–9",
    description:
      "I design and build the experience as one connected system, combining responsive UI, development, motion and interactive details.",
    deliverables: [
      "UI and UX design",
      "Responsive development",
      "GSAP motion and interactions",
    ],
    icon: Code2,
    featured: true,
  },
  {
    id: "review",
    number: "04",
    label: "REFINE",
    title: "Review & Refinement",
    duration: "Days 10–12",
    description:
      "We review the real website together, make agreed revisions, test important devices and polish performance and details.",
    deliverables: [
      "Feedback revisions",
      "Mobile, tablet and desktop testing",
      "Performance optimization",
    ],
    icon: SearchCheck,
  },
  {
    id: "launch",
    number: "05",
    label: "LAUNCH",
    title: "Final QA & Launch",
    duration: "Days 13–14",
    description:
      "I complete final checks, prepare the production build, connect the final destination where needed and launch the project.",
    deliverables: [
      "Production deployment",
      "Final quality checks",
      "Post-launch guidance",
    ],
    icon: Rocket,
  },
];

export const processStepIds = processSteps.map((step) => step.id);
