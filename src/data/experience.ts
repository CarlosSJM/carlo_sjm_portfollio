import { type ExperienceItem } from "@/types";

export const EXPERIENCE_DATA: readonly ExperienceItem[] = [
  {
    company: "BravePay",
    role: "Front-End Collaborator",
    period: "Aug 2022 – Dec 2024",
    description:
      "Developed the front-end for a cryptocurrency payment platform using Next.js, creating seamless payment flows and responsive interfaces for digital transactions.",
    technologies: ["Next.js", "TypeScript", "Crypto APIs"],
  },
  {
    company: "ICARUS",
    role: "Full Stack Developer",
    period: "Jan 2021 – Oct 2023",
    description:
      "Built end-to-end solutions using Angular, Ionic, and React for front-end, with Java Spring, Groovy, and NestJS on the back-end. Managed containerized deployments with Docker, Jenkins, and Kubernetes.",
    technologies: [
      "Angular",
      "Ionic",
      "React",
      "Java Spring",
      "Groovy",
      "NestJS",
      "Firebase",
      "MongoDB",
      "Docker",
      "Jenkins",
      "Kubernetes",
    ],
  },
  {
    company: "Ust-Global",
    role: "Front-End Developer",
    period: "Apr 2020 – Dec 2020",
    description:
      "Developed React applications with TypeScript and Redux, integrated with Node.js APIs and PostgreSQL databases. Utilized Bootstrap for responsive design.",
    technologies: ["React.js", "TypeScript", "Redux", "Bootstrap", "Node.js", "Hapi", "PostgreSQL"],
  },
  {
    company: "Datmean",
    role: "Full Stack Developer",
    period: "Jun 2018 – Mar 2020",
    description:
      "Created full-stack web applications using React with Redux and Material UI for the front-end, PHP 7 with MariaDB for the back-end, and Docker for containerization. Implemented analytics using ELK Stack and Google Tag Manager.",
    technologies: ["React.js", "Redux", "Material UI", "PHP 7", "MariaDB", "Docker", "ELK Stack", "GTM"],
  },
] as const;
