export interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
  video?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
}
