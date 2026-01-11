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
