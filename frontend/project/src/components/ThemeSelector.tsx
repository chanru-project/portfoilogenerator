import React from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { ThemeType } from '../types';

export const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, allThemes } = useTheme();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Choose Theme</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {allThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              currentTheme.id === theme.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {currentTheme.id === theme.id && (
              <div className="absolute top-2 right-2">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
            )}
            
            <div className="mb-2">
              <div className="flex space-x-1 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
              <h4 className="font-medium text-gray-900 text-left">{theme.name}</h4>
              <p className="text-sm text-gray-600 text-left">{theme.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};