# 📱 Portfolio Generator - Mobile-Friendly

A modern, responsive portfolio generator that converts Markdown to beautiful, mobile-optimized portfolios.

## ✨ Features

- 📱 **Fully Mobile Responsive** - Optimized for all screen sizes
- 🎨 **Multiple Themes** - Choose from different color schemes
- 📝 **Markdown Editor** - Easy content editing with live preview
- 👀 **Real-time Preview** - See changes as you type
- 📤 **Export Options** - Download as HTML or PDF
- 🔗 **API Integration** - Backend connected via Render
- ⚡ **Fast & Modern** - Built with React, TypeScript, and Vite

## 🚀 Quick Deployment

### Option 1: Netlify (Recommended)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy! Your live link will be generated automatically

### Option 2: Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

### Option 3: GitHub Pages
1. Run: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## 📱 Mobile Improvements Made

✅ **Responsive Header**
- Stacks vertically on mobile
- Centered text alignment
- Full-width buttons on small screens

✅ **Mobile-Optimized Navigation**
- Compact tab design
- Touch-friendly button sizes
- Proper spacing for mobile

✅ **Responsive Preview**
- Adaptive padding and margins
- Mobile-friendly text sizes
- Optimized grid layouts

✅ **Portfolio Content**
- Scalable typography
- Mobile-optimized spacing
- Touch-friendly interactions

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── MarkdownEditor.tsx
│   ├── PortfolioPreview.tsx
│   ├── ThemeSelector.tsx
│   ├── ExportOptions.tsx
│   └── ThemeProvider.tsx
├── data/               # Sample data
├── types/              # TypeScript types
├── utils/              # Utility functions
└── App.tsx             # Main application
```

## 🎨 Themes

The portfolio generator includes multiple themes:
- **Modern Blue** - Professional and clean
- **Dark Mode** - Easy on the eyes
- **Creative Purple** - Artistic and vibrant
- **Minimal Gray** - Simple and elegant

## 📤 Export Options

- **HTML Export** - Download as standalone HTML file
- **PDF Export** - Generate PDF for printing/sharing
- **Live Preview** - Real-time preview of your portfolio

## 🔗 API Integration

The frontend connects to a backend API hosted on Render:
- Portfolio data processing
- Markdown parsing
- Export functionality

## 📱 Mobile Testing

Test your portfolio on:
- 📱 iPhone (375px)
- 📱 Android (360px)
- 📱 iPad (768px)
- 💻 Desktop (1024px+)

## 🚀 Get Your Live Link

1. **Deploy to Netlify** (Easiest)
   - Push to GitHub
   - Connect to Netlify
   - Get instant live link

2. **Share Your Portfolio**
   - Send the live link via text message
   - Share on social media
   - Include in job applications

Your portfolio generator is now fully mobile-friendly and ready for deployment! 🎉
