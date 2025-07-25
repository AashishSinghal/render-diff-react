#!/bin/bash

# Build the demo for production
echo "Building demo for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in: dist/"
    echo "🌐 To deploy to GitHub Pages:"
    echo "   1. Push this branch to GitHub"
    echo "   2. Enable GitHub Pages in repository settings"
    echo "   3. Set source to 'GitHub Actions'"
    echo "   4. The demo will be available at: https://aashishsinghal.github.io/render-diff-react/"
else
    echo "❌ Build failed!"
    exit 1
fi 