import React, { useState, useEffect } from 'react';
import { FileText, Palette, Download, Eye } from 'lucide-react';
import { ThemeProvider } from './components/ThemeProvider';
import { MarkdownEditor } from './components/MarkdownEditor';
import { ThemeSelector } from './components/ThemeSelector';
import { PortfolioPreview } from './components/PortfolioPreview';
import { ExportOptions } from './components/ExportOptions';
import { parseMarkdownToPortfolio } from './utils/markdownParser';
import { sampleMarkdown, placeholderMarkdown } from './data/sampleMarkdown';
import type { Portfolio } from './types';

function AppContent() {
  const [markdownContent, setMarkdownContent] = useState(placeholderMarkdown);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    personalInfo: { name: '', title: '', email: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [activeTab, setActiveTab] = useState<'edit' | 'themes' | 'export'>('edit');

  useEffect(() => {
    const parsed = parseMarkdownToPortfolio(markdownContent);
    setPortfolio(parsed);
  }, [markdownContent]);

  const loadSampleData = () => {
    setMarkdownContent(sampleMarkdown);
  };

  const tabs = [
    { id: 'edit', label: 'Edit Content', icon: FileText },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'export', label: 'Export', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Portfolio Generator</h1>
                <p className="text-sm text-gray-500">Convert Markdown to beautiful portfolios</p>
              </div>
            </div>
            <button
              onClick={loadSampleData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Load Sample Data
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'edit' && (
              <MarkdownEditor
                value={markdownContent}
                onChange={setMarkdownContent}
                className="h-fit"
              />
            )}

            {activeTab === 'themes' && <ThemeSelector />}

            {activeTab === 'export' && (
              <ExportOptions portfolio={portfolio} markdownContent={markdownContent} />
            )}

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">💡 Quick Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use standard Markdown syntax for formatting</li>
                <li>• Follow the structure in the sample data</li>
                <li>• Switch themes to see different styles</li>
                <li>• Export as HTML for easy deployment</li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                </div>
                <div className="text-sm text-gray-500">
                  Updates automatically as you type
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-screen overflow-y-auto">
                <PortfolioPreview portfolio={portfolio} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;