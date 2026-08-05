import { type SkillCategory } from "@/types";

export const SKILLS_DATA: readonly SkillCategory[] = [
  {
    title: "Front-End",
    iconName: "Layout",
    skills: ["React", "TypeScript", "Angular", "Ionic", "Next.js", "ES6"],
  },
  {
    title: "Front Tools",
    iconName: "Settings",
    skills: ["Webpack", "ESLint", "Vite", "Redux"],
  },
  {
    title: "Back-End",
    iconName: "Server",
    skills: ["Node.js", "NestJS", "PHP", "Java", "Groovy", "Spring Boot"],
  },
  {
    title: "Back Tools",
    iconName: "Terminal",
    skills: ["Docker", "VirtualBox", "Jenkins", "Kubernetes"],
  },
  {
    title: "Databases",
    iconName: "Database",
    skills: ["MySQL", "SQL", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    title: "Scripts & Other",
    iconName: "Code2",
    skills: ["Python3", "Bash", "Google Tag Manager", "Git", "Linux"],
  },
] as const;
