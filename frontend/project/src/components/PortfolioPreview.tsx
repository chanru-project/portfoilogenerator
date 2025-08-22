import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Calendar } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { Portfolio } from '../types';

interface PortfolioPreviewProps {
  portfolio: Portfolio;
  className?: string;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolio,
  className = '',
}) => {
  const { currentTheme } = useTheme();

  const sectionStyle = {
    backgroundColor: currentTheme.colors.surface,
  };

  const primaryTextStyle = {
    color: currentTheme.colors.text,
  };

  const secondaryTextStyle = {
    color: currentTheme.colors.textSecondary,
  };

  const accentStyle = {
    color: currentTheme.colors.accent,
  };

  const primaryBgStyle = {
    backgroundColor: currentTheme.colors.primary,
  };

  return (
    <div 
      className={`max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${className}`}
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Header Section */}
      <div className="relative" style={primaryBgStyle}>
        <div className="px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            {portfolio.personalInfo.name || 'Your Name'}
          </h1>
          <p className="text-xl text-white opacity-90">
            {portfolio.personalInfo.title || 'Your Professional Title'}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {portfolio.personalInfo.email && (
              <div className="flex items-center space-x-2 text-white opacity-90">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{portfolio.personalInfo.email}</span>
              </div>
            )}
            {portfolio.personalInfo.phone && (
              <div className="flex items-center space-x-2 text-white opacity-90">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{portfolio.personalInfo.phone}</span>
              </div>
            )}
            {portfolio.personalInfo.location && (
              <div className="flex items-center space-x-2 text-white opacity-90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{portfolio.personalInfo.location}</span>
              </div>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-4">
            {portfolio.personalInfo.website && (
              <a
                href={portfolio.personalInfo.website}
                className="text-white opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
            {portfolio.personalInfo.linkedin && (
              <a
                href={portfolio.personalInfo.linkedin}
                className="text-white opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {portfolio.personalInfo.github && (
              <a
                href={portfolio.personalInfo.github}
                className="text-white opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary Section */}
        {portfolio.summary && (
          <section className="p-6 rounded-lg" style={sectionStyle}>
            <h2 className="text-2xl font-bold mb-4" style={primaryTextStyle}>
              Summary
            </h2>
            <p className="leading-relaxed" style={secondaryTextStyle}>
              {portfolio.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experience.length > 0 && (
          <section className="p-6 rounded-lg" style={sectionStyle}>
            <h2 className="text-2xl font-bold mb-6" style={primaryTextStyle}>
              Experience
            </h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: currentTheme.colors.primary }}>
                  <h3 className="text-xl font-semibold" style={primaryTextStyle}>
                    {exp.title}
                  </h3>
                  <p className="font-medium mb-2" style={accentStyle}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                  <div className="flex items-center space-x-2 mb-3 text-sm" style={secondaryTextStyle}>
                    <Calendar className="w-4 h-4" />
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="leading-relaxed" style={secondaryTextStyle}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills.length > 0 && (
          <section className="p-6 rounded-lg" style={sectionStyle}>
            <h2 className="text-2xl font-bold mb-4" style={primaryTextStyle}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={primaryBgStyle}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects.length > 0 && (
          <section className="p-6 rounded-lg" style={sectionStyle}>
            <h2 className="text-2xl font-bold mb-6" style={primaryTextStyle}>
              Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg" style={{ borderColor: currentTheme.colors.primary + '30' }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold" style={primaryTextStyle}>
                      {project.name}
                    </h3>
                    <div className="flex space-x-2">
                      {project.url && (
                        <a
                          href={project.url}
                          className="hover:opacity-70 transition-opacity"
                          style={accentStyle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="hover:opacity-70 transition-opacity"
                          style={accentStyle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mb-3 leading-relaxed" style={secondaryTextStyle}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded border"
                        style={{ 
                          borderColor: currentTheme.colors.primary + '40',
                          backgroundColor: currentTheme.colors.primary + '10',
                          color: currentTheme.colors.primary 
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {portfolio.education.length > 0 && (
          <section className="p-6 rounded-lg" style={sectionStyle}>
            <h2 className="text-2xl font-bold mb-6" style={primaryTextStyle}>
              Education
            </h2>
            <div className="space-y-4">
              {portfolio.education.map((edu, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: currentTheme.colors.accent }}>
                  <h3 className="text-lg font-semibold" style={primaryTextStyle}>
                    {edu.degree}
                  </h3>
                  <p className="font-medium" style={accentStyle}>
                    {edu.school} {edu.location && `• ${edu.location}`}
                  </p>
                  <p className="text-sm" style={secondaryTextStyle}>
                    Graduated: {edu.graduationDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};