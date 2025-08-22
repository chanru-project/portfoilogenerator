#!/bin/bash

echo "🚀 Building Portfolio Generator for deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "📁 Your built files are in the 'dist' folder"
echo ""
echo "🌐 To get your live link:"
echo "1. Push this code to GitHub"
echo "2. Connect to Netlify (recommended) or Vercel"
echo "3. Your live link will be automatically generated"
echo ""
echo "📱 Your portfolio is now mobile-friendly!"
echo "   - Responsive design for all screen sizes"
echo "   - Touch-friendly interface"
echo "   - Optimized for mobile viewing"
