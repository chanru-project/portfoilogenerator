import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { Portfolio, Experience, Education, Project } from '../types';

export const parseMarkdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown);
  
  return result.toString();
};

export const parseMarkdownToPortfolio = (markdown: string): Portfolio => {
  const lines = markdown.split('\n');
  const portfolio: Portfolio = {
    personalInfo: {
      name: '',
      title: '',
      email: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };

  let currentSection = '';
  let currentItem: Experience | Education | Project | null = null;
  
  const pushCurrentItem = () => {
    if (!currentItem) return;
    
    if (currentSection === 'experience' && 'company' in currentItem) {
      portfolio.experience.push(currentItem as Experience);
    } else if (currentSection === 'education' && 'school' in currentItem) {
      portfolio.education.push(currentItem as Education);
    } else if (currentSection === 'projects' && 'technologies' in currentItem) {
      portfolio.projects.push(currentItem as Project);
    }
    currentItem = null;
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      portfolio.personalInfo.name = line.substring(2);
    } else if (line.startsWith('## ')) {
      // Push current item before switching sections
      pushCurrentItem();
      
      if (line.toLowerCase().includes('contact')) {
        currentSection = 'contact';
      } else if (line.toLowerCase().includes('summary')) {
        currentSection = 'summary';
      } else if (line.toLowerCase().includes('experience')) {
        currentSection = 'experience';
      } else if (line.toLowerCase().includes('education')) {
        currentSection = 'education';
      } else if (line.toLowerCase().includes('skills')) {
        currentSection = 'skills';
      } else if (line.toLowerCase().includes('projects')) {
        currentSection = 'projects';
      }
    } else if (line.startsWith('### ')) {
      // Push current item before creating new one
      pushCurrentItem();
      
      if (currentSection === 'experience') {
        currentItem = { 
          title: line.substring(4), 
          company: '', 
          startDate: '', 
          endDate: '', 
          description: '' 
        } as Experience;
      } else if (currentSection === 'education') {
        currentItem = { 
          degree: line.substring(4), 
          school: '', 
          graduationDate: '' 
        } as Education;
      } else if (currentSection === 'projects') {
        currentItem = { 
          name: line.substring(4), 
          description: '', 
          technologies: [] 
        } as Project;
      }
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.substring(2);
      if (currentSection === 'skills') {
        portfolio.skills.push(content);
      } else if (currentSection === 'projects' && currentItem && 'technologies' in currentItem && content.toLowerCase().includes('tech')) {
        const techPart = content.split(':')[1];
        if (techPart) {
          (currentItem as Project).technologies = techPart.split(',').map((t: string) => t.trim());
        }
      }
    } else if (line.includes(':') && currentSection === 'contact') {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key.toLowerCase().includes('email')) portfolio.personalInfo.email = value;
      if (key.toLowerCase().includes('phone')) portfolio.personalInfo.phone = value;
      if (key.toLowerCase().includes('location')) portfolio.personalInfo.location = value;
      if (key.toLowerCase().includes('website')) portfolio.personalInfo.website = value;
      if (key.toLowerCase().includes('linkedin')) portfolio.personalInfo.linkedin = value;
      if (key.toLowerCase().includes('github')) portfolio.personalInfo.github = value;
      if (key.toLowerCase().includes('title')) portfolio.personalInfo.title = value;
    } else if (line && currentSection === 'summary' && !line.startsWith('#')) {
      portfolio.summary += line + ' ';
    } else if (line && currentItem) {
      // Add description content to current item
      if ('description' in currentItem) {
        if (currentItem.description) {
          currentItem.description += ' ' + line;
        } else {
          currentItem.description = line;
        }
      }
    }
  }
  
  // Push the final item
  pushCurrentItem();
  
  return portfolio;
};