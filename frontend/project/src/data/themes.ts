import type { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
      textSecondary: '#6B7280',
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless and professional',
    colors: {
      primary: '#1F2937',
      secondary: '#374151',
      accent: '#DC2626',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textSecondary: '#4B5563',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and focused',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#6366F1',
      background: '#FFFFFF',
      surface: '#FAFAFA',
      text: '#000000',
      textSecondary: '#666666',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant and expressive',
    colors: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#F59E0B',
      background: '#FEFEFE',
      surface: '#F3F4F6',
      text: '#1A202C',
      textSecondary: '#718096',
    },
  },
];