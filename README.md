# WebCraft AI: Intelligent UI Mockup & Prototype Generator

A high-fidelity prototyping application that synthesizes user-selected keywords, typography, and color tokens into conceptual UI mockups and fully responsive, interactive HTML/CSS code templates.

---

## 📄 Documentation

A full academic-style project report is available in the documentation folder:
*   **LaTeX Source**: [documentation/main.tex](file:///d:/SITEGENERATOR/documentation/main.tex)

*You can upload this file directly to [Overleaf](https://www.overleaf.com/) to compile the project documentation into a publication-ready PDF.*

---

## 🚀 Quick Start

1.  Start a local HTTP server in the root directory (already configured in the background):
    ```bash
    python -m http.server 8000
    ```
2.  Open your browser and navigate to:
    ```
    http://localhost:8000/
    ```

---

## 💡 Basic Concepts

WebCraft AI operates using a **Dual-Engine Pipeline** to bridge the gap between abstract design ideation and code generation:

*   **Keyword Tag Dictionary**: A curated collection of 50 keywords split across Industry, Vibe, Mood, Layout, and Target Audience. Choosing tags narrows down the target layout intent.
*   **Visual Customizer Studio**: Enables picking typography (dynamically loading Google Fonts at runtime) and color scopes (presets or custom hex values).
*   **AI Image Mockup Engine**: Sends the compiled prompt client-side via the Puter.js AI SDK (`puter.ai.txt2img`) to draw a conceptual website graphic.
*   **Interactive Prototype Engine**: Compiles a localized, fully functional HTML and CSS template on the fly and embeds it inside a responsive device viewport switcher (Desktop, Tablet, Mobile) for fullscreen testing and code export.

---

## 📅 June Update: Idea Generation & Visual Layout Planner

The core focus of this update is **Contextual Pairwise Layout Synthesis** and **Interactive Wireframe Blueprint Planning**.

Rather than relying on static, generic structures, the generation engine focuses on how contrasting keywords interact:
*   **Content Shifting**: Pairing a sector with a vibe (e.g., *Fitness* + *Artistic*) rewrites the copywriting database dynamically (e.g., changing standard coach references to *"Somatic Geometry"* and organic movements) instead of serving standard templates.
*   **Vibe CSS Overrides**: The compiler injects specialized design styles based on vibes:
    *   `Cyberpunk`: glitched CRT monitors, neon box glows, and cybernetic badges.
    *   `Brutalist`: solid black borders (`border: 3px solid`), sharp square corners, and solid flat shadows.
    *   `Artistic`: glassmorphic panels, curved organic borders (`border-radius: 40px 10px`), and blurred background paint-blobs.
    *   `Minimalist`: borderless spacing with simple, thin divider lines.
    *   `Retro`: dotted/dashed layouts, cream accents, and monospaced typefaces.
    *   `Playful`: extra-rounded corners, colorful tags, and bounce animations.
*   **Interactive Layout Sketch (Blueprint Wireframe)**: A dedicated planning tab that renders a blueprint schematic of the page. Users can:
    *   Toggle sections (Hero, Features, Table, Pricing, FAQ, Form) on/off, fading inactive blocks.
    *   Add or delete navigation links in the header, or add custom action buttons in the Hero block.
    *   Customize column headers for the scrollable data table.
    *   Toggle sticky menu settings.
*   **Modular Component Compiling**: Real-time assembly of responsive cards, database tables, pricing matrices, collapsible FAQ accordions, and stylized contact forms.

### 🎨 June Update #2: Custom Palette Studio & Color-Coherent Theming

This update focuses on **Dynamic Color Propagation** — ensuring every pixel of the generated prototype and layout sketch adapts to the user's chosen palette, not just the basic CSS variables.

*   **Interactive Color Wheel Palette Creator**: A Photoshop-style modal with a draggable HSL color wheel, brightness slider, and 4 editable color slots (Primary, Secondary, Canvas, Text). Includes one-click harmony rule generators (Monochromatic, Complementary, Analogous, Triadic) to auto-derive balanced palettes.
*   **Real-Time Sidebar Color Sync**: Changing any color picker input or applying a theme preset now instantly recompiles the prototype and refreshes the active preview tab — no need to click "Generate" again.
*   **Color-Coherent Mood Styles**: The Sakura, Gothic, and Romantic mood CSS overrides now dynamically calculate `rgba()` values from the user's actual primary/secondary hex colors (via an inline RGB parser), instead of using hardcoded pink/purple/yellow values. This means picking Sakura with green colors actually produces a green Sakura theme.
*   **Dynamic Wireframe Blueprint Colors**: The Layout Sketch panel's grid background, borders, header bar, and title text now inherit the user's secondary color via `--sketch-*` CSS variables, replacing the previously stuck cyan/neon look.
*   **Per-Mood Canvas Animations**: Each mood tag injects its own unique ambient animation into the prototype sandbox:
    *   `Sakura`: Floating cherry blossom petals with gentle wobble and rotation.
    *   `Elegant`: Softly flickering sparkle particles drifting upward.
    *   `Dark/Mysterious`: Slowly rising dark smoke plumes.
    *   `Tech/Futuristic`: Matrix-style binary rain columns.
    *   `Neon/Glow`: Pulsing neon ring halos.
    *   `Warm/Cozy`: Drifting ember particles with warm glow.
    *   `Professional`: Clean geometric grid lines.
    *   `Bold/Loud`: Kinetic bouncing geometric shapes.
    *   `Vibrant`: Flowing color wave ribbons.
*   **9 Curated Theme Presets**: Midnight Neon, Sunset Minimalist, Nordic Spruce, Brutalist Peach, Cyberpunk Grid, Sakura Blossom, Neo-Gothic, Crimson Romance, Official Trust — plus two bonus variants (Scarlet Sakura, Velvet Passion).
*   **Bug Fixes**: Fixed the "Create Custom Palette" button not working, resolved color wheel rendering blank on first open, and fixed theme presets not updating the live prototype.

