export interface Portfolio {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export type ThemeType = 'modern' | 'classic' | 'minimal' | 'creative' | 'dark';

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}