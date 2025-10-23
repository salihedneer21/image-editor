# Photo Editor

A powerful online photo editor built with React and Fabric.js that allows you to add text overlays, shapes, effects, and export/import configurations.

## Features

### ✨ Core Features
- **Image Quality Preservation**: Exports images without quality loss (PNG format at 100% quality)
- **Any Aspect Ratio Support**: Automatically adapts canvas to match your image's aspect ratio
- **Configuration Export/Import**: Save and reuse your text and shape configurations across different images

### 🎨 Text Features
- Add multiple text elements with full customization
- **Font Management**:
  - Built-in fonts (Arial, Times New Roman, Courier New, Georgia, Verdana, Comic Sans MS)
  - Import custom fonts (.ttf, .otf, .woff, .woff2)
- **Text Styling**:
  - Font size (8-200px)
  - Font weight (Normal, Bold)
  - Font style (Normal, Italic)
  - Text color with color picker
  - Stroke color and width
  - Text alignment

### 📦 Shape Features
- Add rectangles and circles
- **Shape Styling**:
  - Fill color (solid or transparent)
  - Border color and width
  - Corner radius for rectangles
  - Positioning, scaling, and rotation

### 🎭 Effects
- **Shadow Effects**:
  - Shadow color
  - Blur intensity (0-50px)
  - X/Y offset (-50 to 50px)
- Works on both text and shapes

### 🎯 Manipulation
- Drag and drop elements
- Resize with handles
- Rotate objects
- Delete selected elements
- Layer management (objects stack in order of creation)

## Installation

1. Navigate to the project directory:
```bash
cd photo-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the local server URL (typically http://localhost:5173)

## Usage

### Basic Workflow

1. **Load an Image**: Click "Load Image" and select your photo
2. **Add Elements**:
   - Click "Add Text" to create text overlays
   - Click "Add Rectangle" or "Add Circle" to add shapes
3. **Customize**: Use the toolbar to adjust fonts, colors, sizes, borders, and effects
4. **Export**:
   - Click "Export Image (PNG)" to download your edited image
   - Click "Export Config (JSON)" to save your configuration

### Importing Custom Fonts

1. Click "Import Font" in the Font Settings section
2. Select a font file (.ttf, .otf, .woff, or .woff2)
3. The font will appear in the Font Family dropdown
4. Select it to use it on your text elements

### Reusing Configurations

1. Create and style your text/shapes on an image
2. Click "Export Config (JSON)" to save the configuration
3. Load a new image
4. Click "Import Config" and select your saved JSON file
5. All text and shapes will be recreated with the same styling and positions

### Tips

- **Double-click** text elements to edit the content
- **Click and drag** to move elements
- **Use corner handles** to resize elements
- **Use rotation handle** to rotate elements
- **Set blur to 0** to remove shadows
- **Check "Transparent"** for shapes to create border-only boxes

## Configuration File Format

The exported JSON configuration includes:
- Canvas dimensions
- All text elements with properties (font, size, color, position, etc.)
- All shapes with properties (fill, stroke, dimensions, etc.)
- Effects (shadows, blur)

Example structure:
```json
{
  "canvasSize": {
    "width": 800,
    "height": 600
  },
  "objects": [
    {
      "type": "i-text",
      "text": "Hello World",
      "fontFamily": "Arial",
      "fontSize": 40,
      "fill": "#000000",
      "left": 100,
      "top": 100,
      "shadow": {
        "color": "#000000",
        "blur": 10,
        "offsetX": 5,
        "offsetY": 5
      }
    }
  ]
}
```

## Technologies Used

- **React**: UI framework
- **Fabric.js**: Canvas manipulation and object handling
- **react-colorful**: Color picker component
- **Vite**: Build tool and dev server

## Browser Support

Works on all modern browsers that support:
- HTML5 Canvas
- ES6+
- FontFace API (for custom font loading)

## License

MIT
# image-editor
