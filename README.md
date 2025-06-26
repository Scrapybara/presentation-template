# Scout Presentation Template

This is a [reveal.js](https://revealjs.com) presentation template for [Scout](https://scout.new)

## Getting Started

First, install dependencies and build the project:

```bash
bun install
bun run build
```

For development with hot module reloading:

```bash
bun run dev
```

This will start a development server at http://localhost:8000 with instant updates as you edit your slides.

## Project Configuration

### Theme Customization

The Scout theme is defined in:

- `css/theme/source/scout.scss` - Custom Scout theme with brand colors and typography

Available themes include:

- **scout** (default) - Clean, modern Scout-branded theme
- **black** - Dark theme with light text
- **white** - Light theme with dark text
- **league** - Brown theme (matching League Gothic font)
- **sky** - Blue gradient theme
- **beige** - Beige theme with dark brown text
- **simple** - Minimal theme
- **serif** - Serif-based theme
- **blood** - Dark red theme
- **night** - Dark blue theme
- **moon** - Teal theme
- **solarized** - Solarized color scheme
- **dracula** - Dracula color scheme
- **black-contrast** and **white-contrast** - High contrast variants

### CSS Classes

The Scout theme provides custom CSS classes:

```html
<!-- Scout gradient text -->
<span class="scout-gradient">Scout</span>

<!-- Scout badge -->
<div class="scout-badge">
  <span>Built with Scout</span>
</div>

<!-- Scout buttons -->
<a href="#" class="scout-button">Primary Button</a>
<a href="#" class="scout-button outline">Outline Button</a>
```

### Font Configuration

This project uses:

- **Open Runde Sans** (self-hosted) - for body text and UI elements
- **Playfair Display** (serif) - for headings and emphasis
- **IBM Plex Mono** (Google Fonts) - for code blocks

The Open Runde Sans font family is self-hosted in `/public/fonts/openrunde/` with Regular, Medium, Semibold, and Bold weights. Other fonts are loaded from Google Fonts CDN.

## Creating Slides

### Basic Structure

```html
<div class="slides">
  <!-- Simple slide -->
  <section>
    <h1>Slide Title</h1>
    <p>Slide content</p>
  </section>

  <!-- Vertical slides -->
  <section>
    <section>
      <h2>Main Topic</h2>
    </section>
    <section>
      <h3>Subtopic 1</h3>
    </section>
    <section>
      <h3>Subtopic 2</h3>
    </section>
  </section>
</div>
```

### Features

- **Fragments**: Add `class="fragment"` to reveal elements sequentially
- **Code Highlighting**: Use `<pre><code>` blocks with language classes (powered by highlight.js)
- **Speaker Notes**: Add notes with `<aside class="notes">`
- **Markdown Support**: Use `data-markdown` for Markdown-based slides
- **Auto-animations**: Use `data-auto-animate` for smooth transitions
- **Backgrounds**: Images, videos, gradients, and colors
- **Math**: LaTeX expressions with KaTeX support

### Navigation

- **→/Space**: Next slide
- **←**: Previous slide
- **↑/↓**: Navigate vertical slides
- **Esc**: Slide overview
- **S**: Speaker notes
- **F**: Fullscreen
- **?**: Show keyboard shortcuts

## Plugins

The following plugins are included and enabled:

- **Markdown**: Write slides in Markdown (`RevealMarkdown`)
- **Highlight**: Syntax highlighting for code blocks (`RevealHighlight`)
- **Math**: LaTeX math expressions with KaTeX (`RevealMath`)
- **Notes**: Speaker notes view (`RevealNotes`)
- **Search**: Search within slides (`RevealSearch`)
- **Zoom**: Alt+click to zoom (`RevealZoom`)
- **Chart**: Interactive charts with Chart.js (`RevealChart`)
  - Supported chart types: `line`, `bar`, `pie`, `doughnut`, `radar`, `polarArea`, `bubble`, `scatter`

## Build and Deploy

Build the presentation:

```bash
bun run build
```

This creates production-ready files using Vite:

- Compiles SCSS themes to CSS
- Builds reveal.js core and plugins as ES modules
- Optimizes assets with legacy browser support
- Generates source maps for debugging

The presentation can be deployed to any static hosting service. All necessary files are generated in `dist/`.

For development, use `bun run dev` for instant hot module reloading.

## Project Structure

```
reveal-template/
├── index.html          # Your presentation
├── demo.html           # Full-featured demo presentation
├── public/
│   ├── images/         # Custom images and media files
│   │   ├── capy1.png   # Sample image
│   │   ├── capy2.png   # Sample tiled image
│   │   ├── welcome.mp4 # Sample video
│   │   └── twitch.gif  # Sample GIF
│   ├── fonts/          # Self-hosted fonts
│   │   └── openrunde/  # Open Runde Sans font family
│   └── reset.css       # CSS reset
├── css/
│   ├── theme/
│   │   └── source/
│   │       ├── scout.scss  # Scout theme (editable)
│   │       └── *.scss      # Other available themes
│   └── print/          # PDF export styles
├── dist/               # Built files (generated)
│   ├── reveal.css
│   ├── reveal.esm.js
│   └── theme/
│       └── scout.css   # Compiled Scout theme
├── plugin/             # reveal.js plugins
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Adding Media

Place your custom images, videos, and other media files in `public/images/` and reference them in your slides:

```html
<!-- Background image -->
<section data-background="/images/your-image.png">
  <!-- Inline image -->
  <img src="/images/your-image.png" alt="Description" />

  <!-- Background video -->
  <section data-background-video="/images/your-video.mp4"></section>
</section>
```

## PDF Export Guide for Scout Presentations

[Reveal.js guide](https://revealjs.com/pdf-export/)

1. Open your presentation in a browser
2. Add `?print-pdf` to the URL
   - Example: `http://localhost:8000/?print-pdf`
3. Press **Cmd+P** (Mac) or **Ctrl+P** (Windows/Linux)
4. Save as PDF

Note: For best results, use Chrome or Chromium-based browsers for PDF export.
