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
