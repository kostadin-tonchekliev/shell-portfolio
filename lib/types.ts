export interface SkillCategory {
  icon: string;
  name: string;
  shortName: string;
  color: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface Project {
  icon: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface ProjectsData {
  projects: Project[];
}

export interface Position {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ExperienceData {
  positions: Position[];
}

export interface ProfileLinks {
  linkedin: string;
  github: string;
  twitter: string;
}

export interface ProfileAbout {
  intro: string;
  description: string;
  philosophy: string;
  currentFocus: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  email: string;
  links: ProfileLinks;
  about: ProfileAbout;
}
