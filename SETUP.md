# Installation and Setup Guide

## Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd "/home/aryan/Documents/New Folder"
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- React and React-DOM
- Tailwind CSS
- PostCSS and Autoprefixer
- React Scripts

### 3. Replace Placeholder Images

The project currently uses SVG placeholder images. Follow the `FIGMA_EXPORT_GUIDE.md` to extract and replace them with actual images from the Figma design.

**Quick image replacement:**
1. Export images from Figma (see FIGMA_EXPORT_GUIDE.md)
2. Place them in `/src/assets/` folder
3. Keep the same filenames (or update imports in components)

### 4. Start Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with optimized static files ready for deployment.

## Project Structure

```
/home/aryan/Documents/New Folder/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── assets/                 # Images, icons, and media files
│   │   ├── README.md          # Asset documentation
│   │   ├── *.svg              # Placeholder SVG files
│   │   └── [images to add]    # Actual images from Figma
│   ├── components/            # React components
│   │   ├── Navigation.jsx     # Top navigation bar
│   │   ├── Header.jsx         # Hero section
│   │   ├── StatsSection.jsx   # Statistics cards
│   │   ├── OurBrand.jsx       # Company introduction
│   │   ├── Vision.jsx         # Vision section with features
│   │   ├── WhatWeDo.jsx       # Services grid
│   │   ├── WhyGoSolar.jsx     # Benefits section
│   │   ├── CallToAction.jsx   # CTA section
│   │   └── Footer.jsx         # Footer with links
│   ├── App.jsx                # Main App component
│   ├── index.js               # React entry point
│   └── index.css              # Global styles + Tailwind
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Project documentation
├── FIGMA_EXPORT_GUIDE.md     # Figma image export guide
└── SETUP.md                   # This file

```

## Customization

### Colors

Colors are defined in `tailwind.config.js`:
- `primary`: #1976D2 (blue)
- `dark`: #1C1C1C (nearly black)
- `lightBlue`: #E6F2FF (light blue)
- `darkFooter`: #171D27 (dark blue-gray)

### Fonts

The project uses **Century Gothic** font family. It's loaded from Google Fonts in `public/index.html`.

### Components

Each component is self-contained in `/src/components/`:
- Easy to understand and maintain
- Props can be added for dynamic content
- Styled with Tailwind CSS utility classes

## Tailwind CSS

This project uses Tailwind CSS for styling. Key features:
- Utility-first CSS framework
- Responsive design utilities
- Custom color palette matching the design
- Custom shadows and rounded corners

## Troubleshooting

### Images Not Loading

1. Verify images exist in `/src/assets/` folder
2. Check filenames match exactly (case-sensitive)
3. Ensure file extensions match imports (.svg, .png, or .jpg)
4. Clear browser cache and restart development server

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process using port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Or specify a different port
PORT=3001 npm start
```

## Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## Next Steps

1. ✅ Install dependencies
2. ✅ Start development server
3. 📥 Export and add images from Figma
4. 🎨 Customize content and styling as needed
5. 🧪 Test on different devices and browsers
6. 🚀 Build and deploy to production

## Support

For issues or questions:
1. Check the Figma design: https://www.figma.com/design/3OogQGU84ieg5xf6THLGTM/Sun-Lit-Tech
2. Review component code in `/src/components/`
3. Check browser console for errors

## License

This project is created for Sun Lit Tech.
