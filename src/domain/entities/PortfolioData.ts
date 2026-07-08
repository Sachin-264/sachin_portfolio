export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  projectUrl?: string;
  gitUrl?: string;
  logoUrl?: string;
  hardwareUrl?: string;
  screenshots?: string[];
  architectureTree?: string;
  colorTheme?: string;
  longDescription?: string;
  features?: string[];
  timeline?: string;
  projectUrlLabel?: string;
  appStatus?: string;
  extraSectionTitle?: string;
  extraSectionSub?: string;
  extraSectionDesc?: string;
  extraSectionUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other';
  level: number; // 1-5 or percentage
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl?: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  subtitle: string;
  aboutMe: string;
  metrics: {
    label: string;
    value: string;
  }[];
  socials: {
    platform: string;
    url: string;
  }[];
}
