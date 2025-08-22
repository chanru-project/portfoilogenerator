import React from 'react';
import { Download, Code, Share2, FileText } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { Portfolio } from '../types';

interface ExportOptionsProps {
  portfolio: Portfolio;
  markdownContent: string;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ portfolio, markdownContent }) => {
  const { currentTheme } = useTheme();

  const generateHTML = () => {
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.personalInfo.name} - Portfolio</title>
    <style>
        :root {
            --primary: ${currentTheme.colors.primary};
            --secondary: ${currentTheme.colors.secondary};
            --accent: ${currentTheme.colors.accent};
            --background: ${currentTheme.colors.background};
            --surface: ${currentTheme.colors.surface};
            --text: ${currentTheme.colors.text};
            --text-secondary: ${currentTheme.colors.textSecondary};
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background-color: var(--background);
        }
        
        .container { max-width: 1024px; margin: 0 auto; }
        
        .header {
            background: var(--primary);
            color: white;
            padding: 48px 32px;
            text-align: center;
        }
        
        .header h1 { font-size: 2.5rem; margin-bottom: 8px; }
        .header .title { font-size: 1.25rem; opacity: 0.9; }
        
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px;
            margin-top: 24px;
        }
        
        .content { padding: 32px; }
        
        .section {
            background: var(--surface);
            padding: 24px;
            margin-bottom: 32px;
            border-radius: 8px;
        }
        
        .section h2 {
            font-size: 1.5rem;
            margin-bottom: 16px;
            color: var(--text);
        }
        
        .experience-item, .education-item {
            border-left: 4px solid var(--primary);
            padding-left: 16px;
            margin-bottom: 24px;
        }
        
        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
        }
        
        .project-card {
            padding: 16px;
            border: 1px solid var(--primary);
            border-radius: 8px;
        }
        
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: var(--primary);
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
            .header { padding: 32px 16px; }
            .content { padding: 16px; }
            .contact-info { flex-direction: column; align-items: center; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${portfolio.personalInfo.name || 'Your Name'}</h1>
            <p class="title">${portfolio.personalInfo.title || 'Your Professional Title'}</p>
            <div class="contact-info">
                ${portfolio.personalInfo.email ? `<span>📧 ${portfolio.personalInfo.email}</span>` : ''}
                ${portfolio.personalInfo.phone ? `<span>📞 ${portfolio.personalInfo.phone}</span>` : ''}
                ${portfolio.personalInfo.location ? `<span>📍 ${portfolio.personalInfo.location}</span>` : ''}
            </div>
        </header>
        
        <div class="content">
            ${portfolio.summary ? `
            <section class="section">
                <h2>Summary</h2>
                <p>${portfolio.summary}</p>
            </section>
            ` : ''}
            
            ${portfolio.experience.length > 0 ? `
            <section class="section">
                <h2>Experience</h2>
                ${portfolio.experience.map(exp => `
                <div class="experience-item">
                    <h3>${exp.title}</h3>
                    <p style="color: var(--accent); font-weight: 500;">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</p>
                    <p style="color: var(--text-secondary); margin-bottom: 8px;">${exp.startDate} - ${exp.endDate}</p>
                    <p>${exp.description}</p>
                </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${portfolio.skills.length > 0 ? `
            <section class="section">
                <h2>Skills</h2>
                <div class="skills">
                    ${portfolio.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </section>
            ` : ''}
            
            ${portfolio.projects.length > 0 ? `
            <section class="section">
                <h2>Projects</h2>
                <div class="project-grid">
                    ${portfolio.projects.map(project => `
                    <div class="project-card">
                        <h3>${project.name}</h3>
                        <p style="margin: 8px 0;">${project.description}</p>
                        <div class="skills">
                            ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    </div>
</body>
</html>`;

    return htmlTemplate;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolio.personalInfo.name || 'portfolio'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const sharePortfolio = async () => {
    const html = generateHTML();
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${portfolio.personalInfo.name}'s Portfolio`,
          text: 'Check out my developer portfolio!',
        });
      } else {
        // Fallback: copy HTML to clipboard
        await navigator.clipboard.writeText(html);
        alert('Portfolio HTML copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      alert('Markdown copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Download className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={downloadHTML}
          className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Code className="w-4 h-4 text-blue-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">HTML File</div>
            <div className="text-xs text-gray-500">Download as website</div>
          </div>
        </button>

        <button
          onClick={downloadPDF}
          className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-4 h-4 text-red-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">PDF</div>
            <div className="text-xs text-gray-500">Print/Save as PDF</div>
          </div>
        </button>

        <button
          onClick={sharePortfolio}
          className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4 text-green-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">Share</div>
            <div className="text-xs text-gray-500">Share portfolio</div>
          </div>
        </button>

        <button
          onClick={copyMarkdown}
          className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-4 h-4 text-gray-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">Copy MD</div>
            <div className="text-xs text-gray-500">Copy markdown</div>
          </div>
        </button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Deploy to GitHub Pages:</strong> Download the HTML file and upload it to a GitHub repository with GitHub Pages enabled.
        </p>
      </div>
    </div>
  );
};