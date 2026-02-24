# How to Extract Images from Figma Design

Follow these steps to extract all images from the Figma design and replace the placeholder SVG files.

## Figma Design Link
https://www.figma.com/design/3OogQGU84ieg5xf6THLGTM/Sun-Lit-Tech?node-id=47-39

## Steps to Export Images

### 1. Access the Design
- Click on the Figma link above
- Make sure you're viewing the "home desktop" frame (node-id=47-39)

### 2. Export Individual Images

#### Logo (Navigation)
1. Find the layer named "logo pvt ltd TM 8" in the nav group
2. Select it
3. Right-click → Export → PNG @ 2x
4. Save as `logo.png` in `/src/assets/`

#### Logo White (Footer)
1. Find the logo in the footer section
2. Select it
3. Right-click → Export → PNG @ 2x with transparent background
4. Save as `logo-white.png` in `/src/assets/`

#### Header Background Image
1. Find the layer "Solar Investment_ So können Sie direkt in Solarenergie investieren 1" in the header group
2. Select it
3. Right-click → Export → JPG @ 2x (or higher quality)
4. Save as `header-bg.jpg` in `/src/assets/`

#### Brand Image
1. Find the layer "fotografoaficionado-solar-panel-1175819_1920 1" in the "our brand" group
2. Select it
3. Right-click → Export → JPG @ 2x
4. Save as `brand-image.jpg` in `/src/assets/`

#### Call-to-Action Background
1. Find the background image in the "footer1" group
2. Select it
3. Right-click → Export → JPG @ 2x
4. Save as `cta-bg.jpg` in `/src/assets/`

#### Service Images (6 images)
1. Find the "what we do" group/section
2. Look for "image 3" layers in each service card
3. Export each as JPG @ 2x
4. Save as:
   - `service-1.jpg` - On-Grid Solar Solutions
   - `service-2.jpg` - Off-Grid Solar Solutions
   - `service-3.jpg` - Hybrid Solar Systems
   - `service-4.jpg` - Ground-Mounted Solar
   - `service-5.jpg` - Solar Rooftop Systems
   - `service-6.jpg` - O&M Services

#### Icons

**Vision/Feature Icons:**
1. Find "sun 2" → Export as PNG @ 2x → Save as `sun-icon.png`
2. Find "lightning 1" → Export as PNG @ 2x → Save as `lightning-icon.png`
3. Find "leaf 1" → Export as PNG @ 2x → Save as `leaf-icon.png`
4. Find "eye 1" → Export as PNG @ 2x → Save as `eye-icon.png`

**Other Icons:**
5. Find "quote 1" → Export as PNG @ 2x → Save as `quote-icon.png`

**Contact Icons:**
6. "location 2" → Save as `location-icon.png`
7. "mail (1) 1" → Save as `mail-icon.png`
8. "telephone 1" → Save as `phone-icon.png`

**Social Media Icons:**
9. Export social media icons from the footer → Save as:
   - `facebook-icon.png`
   - `instagram-icon.png`
   - `linkedin-icon.png`
   - `youtube-icon.png`

### 3. Update File Extensions

After exporting from Figma:
1. Replace the `.svg` extensions in the code with `.png` or `.jpg` as appropriate
2. Or just replace the SVG files with the actual PNG/JPG files keeping the same names

### 4. Alternative: Batch Export

You can also export all images at once:
1. Select the entire "home desktop" frame
2. In the right panel, click the "Export" section
3. Add export setting: PNG @ 2x (for the entire frame)
4. Click "Export home desktop"
5. Then manually extract and crop individual elements from the export

## Tips

- Use PNG for logos and icons (supports transparency)
- Use JPG for photographs (smaller file size)
- Export at 2x resolution for retina displays
- Optimize images before adding them to the project (use tools like TinyPNG or ImageOptim)
- Keep original aspect ratios as specified in the Figma design

## After Exporting

1. Place all images in `/src/assets/` folder  
2. Make sure filenames match exactly as specified
3. If you use different extensions (.jpg instead of .svg), update the imports in component files
4. Test the website to ensure all images load correctly
