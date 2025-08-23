import React, { useState } from 'react';
import { Download, Code, Share2, FileText, Github, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { Portfolio } from '../types';

interface ExportOptionsProps {
  portfolio: Portfolio;
  markdownContent: string;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ portfolio, markdownContent }) => {
  const { currentTheme } = useTheme();
  const [showDeployInstructions, setShowDeployInstructions] = useState(false);

  const generateHTML = () => {
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.personalInfo.name} - Portfolio</title>
    <meta name="description" content="${portfolio.summary.substring(0, 160)}">
    <meta name="keywords" content="${portfolio.skills.join(', ')}">
    <meta name="author" content="${portfolio.personalInfo.name}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourusername.github.io/portfolio/">
    <meta property="og:title" content="${portfolio.personalInfo.name} - Portfolio">
    <meta property="og:description" content="${portfolio.summary.substring(0, 160)}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yourusername.github.io/portfolio/">
    <meta property="twitter:title" content="${portfolio.personalInfo.name} - Portfolio">
    <meta property="twitter:description" content="${portfolio.summary.substring(0, 160)}">
    
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background-color: var(--background);
        }
        
        .container { max-width: 1024px; margin: 0 auto; }
        
        .header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 48px 32px;
            text-align: center;
        }
        
        .header h1 { font-size: 2.5rem; margin-bottom: 8px; font-weight: 700; }
        .header .title { font-size: 1.25rem; opacity: 0.9; margin-bottom: 16px; }
        
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px;
            margin-top: 24px;
        }
        
        .contact-info a {
            color: white;
            text-decoration: none;
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }
        
        .contact-info a:hover {
            opacity: 1;
        }
        
        .content { padding: 32px; }
        
        .section {
            background: var(--surface);
            padding: 24px;
            margin-bottom: 32px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .section h2 {
            font-size: 1.5rem;
            margin-bottom: 16px;
            color: var(--text);
            border-bottom: 2px solid var(--primary);
            padding-bottom: 8px;
        }
        
        .experience-item, .education-item {
            border-left: 4px solid var(--primary);
            padding-left: 16px;
            margin-bottom: 24px;
        }
        
        .experience-item h3, .education-item h3 {
            color: var(--text);
            margin-bottom: 4px;
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
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .project-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .project-card h3 {
            color: var(--text);
            margin-bottom: 8px;
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
            font-weight: 500;
        }
        
        .tech-tag {
            background: var(--accent);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            margin-right: 4px;
            margin-bottom: 4px;
            display: inline-block;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 16px;
        }
        
        .social-links a {
            color: white;
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }
        
        .social-links a:hover {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .header { padding: 32px 16px; }
            .header h1 { font-size: 2rem; }
            .content { padding: 16px; }
            .contact-info { flex-direction: column; align-items: center; }
            .project-grid { grid-template-columns: 1fr; }
        }
        
        @media print {
            .header { background: var(--primary) !important; }
            .section { box-shadow: none; border: 1px solid #ddd; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${portfolio.personalInfo.name || 'Your Name'}</h1>
            <p class="title">${portfolio.personalInfo.title || 'Your Professional Title'}</p>
            <div class="contact-info">
                ${portfolio.personalInfo.email ? `<a href="mailto:${portfolio.personalInfo.email}">📧 ${portfolio.personalInfo.email}</a>` : ''}
                ${portfolio.personalInfo.phone ? `<a href="tel:${portfolio.personalInfo.phone}">📞 ${portfolio.personalInfo.phone}</a>` : ''}
                ${portfolio.personalInfo.location ? `<span>📍 ${portfolio.personalInfo.location}</span>` : ''}
            </div>
            <div class="social-links">
                ${portfolio.personalInfo.website ? `<a href="${portfolio.personalInfo.website}" target="_blank" rel="noopener">🌐</a>` : ''}
                ${portfolio.personalInfo.linkedin ? `<a href="${portfolio.personalInfo.linkedin}" target="_blank" rel="noopener">💼</a>` : ''}
                ${portfolio.personalInfo.github ? `<a href="${portfolio.personalInfo.github}" target="_blank" rel="noopener">🐙</a>` : ''}
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
                    <p style="color: var(--accent); font-weight: 500; margin-bottom: 4px;">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</p>
                    <p style="color: var(--text-secondary); margin-bottom: 8px; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</p>
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
                        <p style="margin: 8px 0; color: var(--text-secondary);">${project.description}</p>
                        <div style="margin-top: 12px;">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        ${project.url || project.github ? `
                        <div style="margin-top: 12px;">
                            ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener" style="color: var(--primary); margin-right: 12px;">🌐 Live Demo</a>` : ''}
                            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" style="color: var(--primary);">🐙 GitHub</a>` : ''}
                        </div>
                        ` : ''}
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
            
            ${portfolio.education.length > 0 ? `
            <section class="section">
                <h2>Education</h2>
                ${portfolio.education.map(edu => `
                <div class="education-item">
                    <h3>${edu.degree}</h3>
                    <p style="color: var(--accent); font-weight: 500; margin-bottom: 4px;">${edu.school}${edu.location ? ` • ${edu.location}` : ''}</p>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Graduated: ${edu.graduationDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                </div>
                `).join('')}
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

  const generateGitHubPagesInstructions = () => {
    const instructions = `# GitHub Pages Deployment Instructions

## Step 1: Create a GitHub Repository
1. Go to GitHub.com and create a new repository
2. Name it: \`portfolio\` or \`yourname-portfolio\`
3. Make it public (required for free GitHub Pages)

## Step 2: Upload Your Portfolio
1. Download the HTML file from this app
2. Rename it to \`index.html\`
3. Upload it to your GitHub repository

## Step 3: Enable GitHub Pages
1. Go to your repository Settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

## Step 4: Your Portfolio is Live!
Your portfolio will be available at:
\`https://yourusername.github.io/portfolio/\`

## Custom Domain (Optional)
1. Buy a domain (e.g., yourname.com)
2. Add a CNAME file to your repository with your domain
3. Configure DNS settings with your domain provider

## Tips
- Update your portfolio regularly
- Add analytics to track visitors
- Include a contact form
- Optimize for mobile devices
- Add SEO meta tags (already included in the HTML)`;

    const blob = new Blob([instructions], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'github-pages-deployment.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Download className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
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

      {/* GitHub Pages Deployment Section */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Github className="w-5 h-5 text-gray-600" />
            <h4 className="text-md font-semibold text-gray-900">Deploy to GitHub Pages</h4>
          </div>
          <button
            onClick={() => setShowDeployInstructions(!showDeployInstructions)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showDeployInstructions ? 'Hide' : 'Show'} Instructions
          </button>
        </div>

        {showDeployInstructions && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
            <ol className="text-sm text-gray-700 space-y-2">
              <li><strong>1.</strong> Create a GitHub repository named "portfolio"</li>
              <li><strong>2.</strong> Download the HTML file above</li>
              <li><strong>3.</strong> Rename it to "index.html" and upload to your repo</li>
              <li><strong>4.</strong> Go to Settings → Pages → Deploy from main branch</li>
              <li><strong>5.</strong> Your portfolio will be live at: <code className="bg-gray-200 px-1 rounded">yourusername.github.io/portfolio</code></li>
            </ol>
            <button
              onClick={generateGitHubPagesInstructions}
              className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              <span>Download Detailed Instructions</span>
            </button>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>💡 Pro Tip:</strong> The generated HTML includes SEO meta tags, mobile optimization, and social media previews for professional deployment.
          </p>
        </div>
      </div>
    </div>
  );
};