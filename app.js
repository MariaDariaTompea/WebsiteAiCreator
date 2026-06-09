// WebCraft AI - Core Application Controller

// 50 Curated Tags Dictionary Grouped by Category
const TAGS_DICTIONARY = {
  industry: [
    "E-Commerce", "SaaS/Software", "Portfolio", "Restaurant", "Agency", 
    "Blog", "Fitness", "Real Estate", "Education", "Mobile App"
  ],
  style: [
    "Minimalist", "Cyberpunk", "Brutalist", "Retro/Vintage", "Neo-brutalism", 
    "Glassmorphism", "Clean/Modern", "Playful", "Corporate", "Organic/Eco"
  ],
  mood: [
    "Dark/Mysterious", "Light/Airy", "Neon/Glow", "Warm/Cozy", "Professional", 
    "Artistic", "Bold/Loud", "Tech/Futuristic", "Elegant", "Vibrant"
  ],
  layout: [
    "Feature-rich", "Image-centric", "Text-heavy", "Split-Screen", "Card-based", 
    "Masonry", "Minimal-Hero", "Dashboard-style", "Storytelling", "Compact"
  ],
  audience: [
    "B2B", "Creative", "Gen Z", "Luxury", "Developers", 
    "Kids", "General Public", "Students", "High-Tech", "Gamers"
  ]
};

// Curated Color Theme Presets
const THEME_PRESETS = {
  midnight: {
    name: "Midnight Neon",
    primary: "#8b5cf6",
    secondary: "#06b6d4",
    bg: "#09080e",
    text: "#f3f4f6",
    font: "Outfit"
  },
  sunset: {
    name: "Sunset Minimalist",
    primary: "#f97316",
    secondary: "#e11d48",
    bg: "#fafaf9",
    text: "#1c1917",
    font: "Plus Jakarta Sans"
  },
  nordic: {
    name: "Nordic Spruce",
    primary: "#10b981",
    secondary: "#3b82f6",
    bg: "#0f172a",
    text: "#f8fafc",
    font: "Inter"
  },
  brutalist: {
    name: "Brutalist Peach",
    primary: "#ff3e3e",
    secondary: "#facc15",
    bg: "#fffbeb",
    text: "#1c1917",
    font: "Space Grotesk"
  },
  cyberpunk: {
    name: "Cyberpunk Grid",
    primary: "#ff007f",
    secondary: "#00f0ff",
    bg: "#050508",
    text: "#ffffff",
    font: "Share Tech Mono"
  }
};

// Available Google Fonts
const GOOGLE_FONTS = [
  "Outfit",
  "Plus Jakarta Sans",
  "Inter",
  "Space Grotesk",
  "Share Tech Mono",
  "Playfair Display",
  "Syne",
  "Cinzel",
  "Cabinet Grotesk",
  "Montserrat",
  "JetBrains Mono"
];

// App State
const state = {
  selectedTags: new Set(),
  theme: {
    primary: "#8b5cf6",
    secondary: "#06b6d4",
    bg: "#09080e",
    text: "#f3f4f6",
    font: "Outfit"
  },
  activeTab: "mockup", // "mockup" | "prototype" | "code"
  viewport: "desktop", // "desktop" | "tablet" | "mobile"
  mockupLoading: false,
  mockupUrl: "",
  generatedHtml: "",
  generatedCss: ""
};

// DOM Elements
const tagContainerEl = document.getElementById("tag-dictionary");
const tagCounterEl = document.getElementById("selected-count");
const fontSelectEl = document.getElementById("font-select");
const fontPreviewEl = document.getElementById("font-preview");
const generateBtnEl = document.getElementById("generate-btn");
const tabBtnMockupEl = document.getElementById("tab-mockup");
const tabBtnProtoEl = document.getElementById("tab-prototype");
const tabBtnCodeEl = document.getElementById("tab-code");
const viewportControlsEl = document.getElementById("viewport-controls");
const studioBodyEl = document.getElementById("studio-body");
const toastEl = document.getElementById("toast");
const toastMessageEl = document.getElementById("toast-message");

// Picker Elements
const primaryColorInput = document.getElementById("color-primary");
const secondaryColorInput = document.getElementById("color-secondary");
const bgColorInput = document.getElementById("color-bg");
const textColorInput = document.getElementById("color-text");

const primaryColorVal = document.getElementById("val-primary");
const secondaryColorVal = document.getElementById("val-secondary");
const bgColorVal = document.getElementById("val-bg");
const textColorVal = document.getElementById("val-text");

// Initialize Application
function init() {
  renderTags();
  renderPresets();
  setupFonts();
  setupEventListeners();
  updateColorsInUI();
  updatePreviewPlaceholder();
}

// Render tag grid organized by category
function renderTags() {
  tagContainerEl.innerHTML = "";
  
  for (const [category, tags] of Object.entries(TAGS_DICTIONARY)) {
    const categoryGroup = document.createElement("div");
    categoryGroup.className = "tag-category-group";
    
    const categoryName = document.createElement("div");
    categoryName.className = "category-name";
    categoryName.textContent = category;
    categoryGroup.appendChild(categoryName);
    
    const tagGrid = document.createElement("div");
    tagGrid.className = "tag-grid";
    
    tags.forEach(tag => {
      const tagBadge = document.createElement("div");
      tagBadge.className = "tag-badge";
      tagBadge.textContent = tag;
      tagBadge.dataset.tag = tag;
      
      tagBadge.addEventListener("click", () => toggleTag(tag, tagBadge));
      tagGrid.appendChild(tagBadge);
    });
    
    categoryGroup.appendChild(tagGrid);
    tagContainerEl.appendChild(categoryGroup);
  }
}

// Render Theme Preset Buttons
function renderPresets() {
  const presetContainer = document.getElementById("theme-presets");
  presetContainer.innerHTML = "";
  
  for (const [key, preset] of Object.entries(THEME_PRESETS)) {
    const btn = document.createElement("button");
    btn.className = `preset-btn ${key === 'midnight' ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${preset.name}</span>
      <div class="preset-colors">
        <div class="color-dot" style="background-color: ${preset.primary}"></div>
        <div class="color-dot" style="background-color: ${preset.secondary}"></div>
        <div class="color-dot" style="background-color: ${preset.bg}"></div>
        <div class="color-dot" style="background-color: ${preset.text}"></div>
      </div>
    `;
    btn.addEventListener("click", () => applyThemePreset(preset, btn));
    presetContainer.appendChild(btn);
  }
}

// Populate font dropdown selector
function setupFonts() {
  fontSelectEl.innerHTML = "";
  
  GOOGLE_FONTS.forEach(font => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontSelectEl.appendChild(option);
  });
  
  // Set default font
  fontSelectEl.value = state.theme.font;
  updateFontPreview();
}

function updateFontPreview() {
  const font = fontSelectEl.value;
  state.theme.font = font;
  
  // Load font dynamically via link tag if not present
  const fontId = `gfont-${font.replace(/\s+/g, '-').toLowerCase()}`;
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
  }
  
  fontPreviewEl.style.fontFamily = `'${font}', sans-serif`;
  fontPreviewEl.textContent = `Preview: ${font} Typography`;
}

// Handle Tag Toggle selection
function toggleTag(tag, element) {
  if (state.selectedTags.has(tag)) {
    state.selectedTags.delete(tag);
    element.classList.remove("selected");
  } else {
    // Arbitrary cap (optional, e.g., max 6 for prompt specificity)
    if (state.selectedTags.size >= 8) {
      showToast("Maximum of 8 tags allowed for best styling results!");
      return;
    }
    state.selectedTags.add(tag);
    element.classList.add("selected");
  }
  tagCounterEl.textContent = state.selectedTags.size;
}

// Apply Selected Theme Preset
function applyThemePreset(preset, activeBtn) {
  // Update class active
  document.querySelectorAll(".preset-btn").forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
  
  state.theme.primary = preset.primary;
  state.theme.secondary = preset.secondary;
  state.theme.bg = preset.bg;
  state.theme.text = preset.text;
  state.theme.font = preset.font;
  
  fontSelectEl.value = preset.font;
  updateFontPreview();
  updateColorsInUI();
  showToast(`Applied preset: ${preset.name}`);
}

// Update picker inputs color values in state
function updateColorsInUI() {
  primaryColorInput.value = state.theme.primary;
  secondaryColorInput.value = state.theme.secondary;
  bgColorInput.value = state.theme.bg;
  textColorInput.value = state.theme.text;
  
  primaryColorVal.textContent = state.theme.primary.toUpperCase();
  secondaryColorVal.textContent = state.theme.secondary.toUpperCase();
  bgColorVal.textContent = state.theme.bg.toUpperCase();
  textColorVal.textContent = state.theme.text.toUpperCase();
}

// Custom Picker Events
function setupEventListeners() {
  primaryColorInput.addEventListener("input", (e) => {
    state.theme.primary = e.target.value;
    primaryColorVal.textContent = state.theme.primary.toUpperCase();
    removePresetSelectionHighlight();
  });
  
  secondaryColorInput.addEventListener("input", (e) => {
    state.theme.secondary = e.target.value;
    secondaryColorVal.textContent = state.theme.secondary.toUpperCase();
    removePresetSelectionHighlight();
  });
  
  bgColorInput.addEventListener("input", (e) => {
    state.theme.bg = e.target.value;
    bgColorVal.textContent = state.theme.bg.toUpperCase();
    removePresetSelectionHighlight();
  });
  
  textColorInput.addEventListener("input", (e) => {
    state.theme.text = e.target.value;
    textColorVal.textContent = state.theme.text.toUpperCase();
    removePresetSelectionHighlight();
  });
  
  fontSelectEl.addEventListener("change", () => {
    updateFontPreview();
    removePresetSelectionHighlight();
  });
  
  // Tabs events
  tabBtnMockupEl.addEventListener("click", () => switchTab("mockup"));
  tabBtnProtoEl.addEventListener("click", () => switchTab("prototype"));
  tabBtnCodeEl.addEventListener("click", () => switchTab("code"));
  
  // Viewport switch events
  document.querySelectorAll(".viewport-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".viewport-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      changeViewport(btn.dataset.viewport);
    });
  });
  
  // CTA Generate
  generateBtnEl.addEventListener("click", generateWebsite);
}

function removePresetSelectionHighlight() {
  document.querySelectorAll(".preset-btn").forEach(btn => btn.classList.remove("active"));
}

function changeViewport(mode) {
  state.viewport = mode;
  const iframe = document.querySelector(".viewport-frame");
  if (iframe) {
    iframe.className = `viewport-frame ${mode}`;
  }
}

function switchTab(tab) {
  state.activeTab = tab;
  
  tabBtnMockupEl.classList.remove("active");
  tabBtnProtoEl.classList.remove("active");
  tabBtnCodeEl.classList.remove("active");
  
  if (tab === "mockup") {
    tabBtnMockupEl.classList.add("active");
    viewportControlsEl.style.display = "none";
  } else if (tab === "prototype") {
    tabBtnProtoEl.classList.add("active");
    viewportControlsEl.style.display = "flex";
  } else if (tab === "code") {
    tabBtnCodeEl.classList.add("active");
    viewportControlsEl.style.display = "none";
  }
  
  renderActiveStudioTab();
}

// Show Toast Message
function showToast(message) {
  toastMessageEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3000);
}

// Render empty state inside workspace
function updatePreviewPlaceholder() {
  studioBodyEl.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">🎨</div>
      <div class="empty-title">Design Your Website</div>
      <div class="empty-desc">Choose a few words from the grid above, select your primary colors and typography, and click "Generate Website".</div>
    </div>
  `;
}

// Assemble tags to generate website concept and prototypes
function generateWebsite() {
  if (state.selectedTags.size === 0) {
    showToast("Please choose at least 1-2 keywords before generating!");
    return;
  }
  
  showToast("Synthesizing parameters and drafting design...");
  
  // 1. Generate Mockup URL
  generateMockupImage();
  
  // 2. Compile Prototype Code
  compilePrototypeCode();
  
  // Automatically display the current active tab
  renderActiveStudioTab();
}

// Generate Image Concept using Puter.js AI
function generateMockupImage() {
  state.mockupLoading = true;
  state.mockupUrl = ""; // Reset current mockup so we show loading spinner
  
  const tagsArr = Array.from(state.selectedTags);
  const mainVibe = tagsArr.find(tag => TAGS_DICTIONARY.style.includes(tag)) || "modern";
  const mainIndustry = tagsArr.find(tag => TAGS_DICTIONARY.industry.includes(tag)) || "landing page";
  const otherDetails = tagsArr.filter(tag => tag !== mainVibe && tag !== mainIndustry).join(", ");
  
  // Build detailed descriptive prompt for Stable Diffusion
  const prompt = `premium web design mockup of a ${mainIndustry} website, visual aesthetic style ${mainVibe}, styling details ${otherDetails}, color palette dominant ${state.theme.bg} with accents of ${state.theme.primary} and ${state.theme.secondary}, typography font ${state.theme.font}, elegant user interface, ux design, high resolution ui mockup, award winning dribbble project, web design.png`;
  
  // Call Puter AI Image generation
  puter.ai.txt2img(prompt)
    .then(imgElement => {
      state.mockupUrl = imgElement.src;
      state.mockupLoading = false;
      
      // Update UI if the mockup tab is currently active
      if (state.activeTab === "mockup") {
        renderActiveStudioTab();
      }
    })
    .catch(err => {
      console.error("Puter.js AI image generation failed:", err);
      state.mockupLoading = false;
      showToast("AI Mockup Image generation failed. Using local mockup fallback.");
      
      // Fallback to a nice design placeholder matching the industry
      state.mockupUrl = `https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1280&h=800&q=80`;
      
      if (state.activeTab === "mockup") {
        renderActiveStudioTab();
      }
    });
}

// Compile Code Prototype locally based on tag criteria
function compilePrototypeCode() {
  const tagsArr = Array.from(state.selectedTags);
  
  // Extract values
  const font = state.theme.font;
  const c = {
    primary: state.theme.primary,
    secondary: state.theme.secondary,
    bg: state.theme.bg,
    text: state.theme.text,
    cardBg: isDarkColor(state.theme.bg) ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
    border: isDarkColor(state.theme.bg) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    heroGradient: `linear-gradient(135deg, ${state.theme.primary} 0%, ${state.theme.secondary} 100%)`
  };
  
  // Parse Vibe/Mood Tags
  const isArtisticVibe = tagsArr.includes("Artistic") || tagsArr.includes("Creative");
  const isCyberpunkVibe = tagsArr.includes("Cyberpunk") || tagsArr.includes("Neon/Glow") || tagsArr.includes("Tech/Futuristic");
  const isBrutalistVibe = tagsArr.includes("Brutalist") || tagsArr.includes("Neo-brutalism");
  const isRetroVibe = tagsArr.includes("Retro/Vintage");
  const isMinimalistVibe = tagsArr.includes("Minimalist");
  const isPlayfulVibe = tagsArr.includes("Playful") || tagsArr.includes("Kids");
  
  // Custom text templates matching industry/style
  const industry = tagsArr.find(t => TAGS_DICTIONARY.industry.includes(t)) || "Landing Page";
  const style = tagsArr.find(t => TAGS_DICTIONARY.style.includes(t)) || "Modern";
  
  let headline = `Unleash Your Web Presence`;
  let subheading = `A tailored ${style} design for your ${industry} crafted dynamically.`;
  let buttonText = "Explore Features";
  let cardsHtml = "";
  
  // Dynamic Content Synthesis based on industry + tags pairing
  if (industry === "Fitness") {
    if (isArtisticVibe) {
      headline = "Sculpting Kinetic Forms";
      subheading = "Movement is raw architecture. Experience an avant-garde fitness space bridging athletic power and classical art forms.";
      buttonText = "Enter the Studio";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🩰</div>
          <h3>Somatic Geometry</h3>
          <p>Explore natural range of motion and alignment, transforming kinetic effort into aesthetic fluidity.</p>
        </div>
        <div class="card">
          <div class="card-img">🧘</div>
          <h3>Sculpted Balance</h3>
          <p>Asymmetrical strength training designed to craft posture, core stability, and lean muscle lines.</p>
        </div>
        <div class="card">
          <div class="card-img">🎨</div>
          <h3>Choreographed Cardio</h3>
          <p>High-intensity athletic conditioning structured as abstract floor patterns and dynamic drills.</p>
        </div>
      `;
    } else if (isCyberpunkVibe) {
      headline = "NeonFit: Cybernetic Training";
      subheading = "Augment your human threshold. Biometric sync feeds directly into high-intensity synthetic modules.";
      buttonText = "Initialize Systems";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">🔌</div>
          <h3>Neural Sync Conditioning</h3>
          <p>Interactive high-intensity interval training guided by holographic real-time feedback paths.</p>
        </div>
        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>Exo-Loading Protocols</h3>
          <p>Harness dynamic resistance technologies that adapt to micro-second muscular contractions.</p>
        </div>
        <div class="card">
          <div class="card-icon">📟</div>
          <h3>Telemetry Integration</h3>
          <p>Deep dashboard diagnostics track vascular performance, oxygen levels, and core metrics.</p>
        </div>
      `;
    } else {
      headline = "Apex Performance Center";
      subheading = "Reach your peak condition. Scientific workout methodologies guided by elite personal coaches.";
      buttonText = "Schedule Class";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">💪</div>
          <h3>Hypertrophy & Strength</h3>
          <p>Targeted barbell coaching and resistance programming designed to maximize physical output.</p>
        </div>
        <div class="card">
          <div class="card-icon">🏃</div>
          <h3>Cardio Acceleration</h3>
          <p>High energy metabolic conditioning designed to shred fat and build cardiovascular endurance.</p>
        </div>
        <div class="card">
          <div class="card-icon">🥗</div>
          <h3>Nutrition Telemetry</h3>
          <p>Custom macro-balanced meal templates compiled to fuel metabolic recovery and energy.</p>
        </div>
      `;
    }
  } else if (industry === "Restaurant") {
    if (isArtisticVibe) {
      headline = "The Culinary Canvas";
      subheading = "Indulge in avant-garde gastronomy. Every plate is structured as an abstract painting, crafted from organic textures.";
      buttonText = "Book a Canvas Table";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🥩</div>
          <h3>Abstract Beef Ribeye</h3>
          <p>Charcoal-crusted ribeye, red pepper purée strokes, rosemary twigs, ash salt flakes.</p>
        </div>
        <div class="card">
          <div class="card-img">🍝</div>
          <h3>Symphony in Truffle</h3>
          <p>Handcrafted squid-ink pasta loops, creamy truffle froth, gold leaf accents.</p>
        </div>
        <div class="card">
          <div class="card-img">🍰</div>
          <h3>Deconstructed Soufflé</h3>
          <p>Smoked cacao shells, frozen madagascar gelato droplets, caramel vapor drizzle.</p>
        </div>
      `;
    } else if (isRetroVibe) {
      headline = "The Vintage Diner";
      subheading = "Stepping back into classical culinary roots. Savor retro comfort recipes served in a traditional diner lounge.";
      buttonText = "View Diner Menu";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🍔</div>
          <h3>Classic Double Stack</h3>
          <p>Aged beef smash patties, melting cheddar, house pickles, served on toasted brioche buns.</p>
        </div>
        <div class="card">
          <div class="card-img">🍟</div>
          <h3>Hand-Cut Fries</h3>
          <p>Golden russet potato wedges, sea salt sprinkle, served with vintage ketchup dip.</p>
        </div>
        <div class="card">
          <div class="card-img">🥤</div>
          <h3>Malt Milkshake</h3>
          <p>Thick hand-spun vanilla malt, topped with whipped cream and a brandied cherry.</p>
        </div>
      `;
    } else {
      headline = "Savor Gastronomy Lab";
      subheading = "Exquisite modern fine dining experience styled with clean aesthetics and locally sourced ingredients.";
      buttonText = "Reserve a Table";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🍷</div>
          <h3>Curated Wine Flights</h3>
          <p>Sommelier pairings representing the absolute finest local and imported vintage reserves.</p>
        </div>
        <div class="card">
          <div class="card-img">🥗</div>
          <h3>Harvest Plates</h3>
          <p>Crispy heirloom greens, whipped goat cheese cream, citrus vinaigrette glaze.</p>
        </div>
        <div class="card">
          <div class="card-img">🐟</div>
          <h3>Seared Seabass</h3>
          <p>Crispy skin seabass, parsnip purée, braised baby leeks, saffron broth.</p>
        </div>
      `;
    }
  } else if (industry === "Portfolio") {
    if (isArtisticVibe) {
      headline = "Creative Exhibition";
      subheading = "Abstract intersections of interactive digital art, identity frameworks, and tactile graphic design.";
      buttonText = "View Gallery";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🖼️</div>
          <h3>Aura Interactive</h3>
          <p>Web3 Art installation exploring browser WebGL shaders and kinetic typography.</p>
        </div>
        <div class="card">
          <div class="card-img">🎨</div>
          <h3>Zen Brand Identity</h3>
          <p>Creative direction, packaging concepts, and editorial print work for Zen Studio.</p>
        </div>
        <div class="card">
          <div class="card-img">📐</div>
          <h3>Tactile Posters</h3>
          <p>Brutalist silk-screen poster prints featuring custom letterforms and ink textures.</p>
        </div>
      `;
    } else if (isCyberpunkVibe) {
      headline = "Terminal Workspace";
      subheading = "Fullstack developer portfolio detailing neural system integrations, low-latency APIs, and web terminals.";
      buttonText = "Access Archives";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">💻</div>
          <h3>Cypher Web Shell</h3>
          <p>A secure in-browser node command runner using custom docker nodes.</p>
        </div>
        <div class="card">
          <div class="card-icon">🧠</div>
          <h3>LLM Agents System</h3>
          <p>Multi-agent architecture managing automated code synthesis pipelines.</p>
        </div>
        <div class="card">
          <div class="card-icon">🌌</div>
          <h3>Grid Engine</h3>
          <p>A high-performance HTML Canvas particles system built for telemetry displays.</p>
        </div>
      `;
    } else {
      headline = "Digital Product Design Portfolio";
      subheading = "A showcase of responsive, clean corporate dashboards, user interfaces, and mobile applications.";
      buttonText = "Request Case Studies";
      cardsHtml = `
        <div class="card">
          <div class="card-img">📱</div>
          <h3>Volta App</h3>
          <p>A full UI/UX design case study for a premium consumer banking interface.</p>
        </div>
        <div class="card">
          <div class="card-img">🌐</div>
          <h3>Acme SaaS Website</h3>
          <p>Modern conversion-focused marketing landing page and style guide system.</p>
        </div>
        <div class="card">
          <div class="card-img">📊</div>
          <h3>Metrics Dashboard</h3>
          <p>Data-rich charts and user interface modules designed for high-frequency trading.</p>
        </div>
      `;
    }
  } else if (industry === "E-Commerce") {
    if (isBrutalistVibe) {
      headline = "RAW COLLECTION";
      subheading = "STREETWEAR AND UTILITY GEAR DESIGNED WITHOUT COMPROMISE. NO DECORATIONS. RAW TEXTURES ONLY.";
      buttonText = "BUY NOW";
      cardsHtml = `
        <div class="card">
          <div class="card-img">👟</div>
          <h3>RAW RUNNER 01</h3>
          <p class="price">$180.00</p>
          <button class="btn btn-sm">ADD</button>
        </div>
        <div class="card">
          <div class="card-img">🧥</div>
          <h3>UTILITY JACKET</h3>
          <p class="price">$240.00</p>
          <button class="btn btn-sm">ADD</button>
        </div>
        <div class="card">
          <div class="card-img">🎒</div>
          <h3>MODULAR PACK</h3>
          <p class="price">$150.00</p>
          <button class="btn btn-sm">ADD</button>
        </div>
      `;
    } else {
      headline = "Lumina Essentials";
      subheading = "A curated selection of modern design gadgets and home aesthetics built for sophisticated spaces.";
      buttonText = "Shop Best Sellers";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🎧</div>
          <h3>Acoustic Pro Headset</h3>
          <p class="price">$320.00</p>
          <button class="btn btn-sm">Add to Cart</button>
        </div>
        <div class="card">
          <div class="card-img">⌚</div>
          <h3>Chrono Smartwatch</h3>
          <p class="price">$210.00</p>
          <button class="btn btn-sm">Add to Cart</button>
        </div>
        <div class="card">
          <div class="card-img">💡</div>
          <h3>Orbital Desk Lamp</h3>
          <p class="price">$85.00</p>
          <button class="btn btn-sm">Add to Cart</button>
        </div>
      `;
    }
  } else if (industry === "Agency") {
    if (isArtisticVibe) {
      headline = "The Narrative Lab";
      subheading = "We synthesize custom brands, digital spaces, and visual architectures for progressive organizations.";
      buttonText = "Start Project";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">🎭</div>
          <h3>Brand Identity</h3>
          <p>Formulating distinct visual systems, custom typography scales, and tactile layouts.</p>
        </div>
        <div class="card">
          <div class="card-icon">🌀</div>
          <h3>Interactive Media</h3>
          <p>Shaping unique WebGL designs and client browser frameworks that react to user inputs.</p>
        </div>
        <div class="card">
          <div class="card-icon">✒️</div>
          <h3>Editorial Art</h3>
          <p>Bridging classical typography standards with digital grids for premium editorial blogs.</p>
        </div>
      `;
    } else if (isCyberpunkVibe) {
      headline = "Apex Cybernetic Agency";
      subheading = "Deploy tactical communication systems, subnet portals, and decentralized interface structures.";
      buttonText = "Access Terminal";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>Neural Interface Systems</h3>
          <p>Structuring browser applications designed for extreme speed and real-time interaction.</p>
        </div>
        <div class="card">
          <div class="card-icon">🔒</div>
          <h3>Secure Brand Crypts</h3>
          <p>Configuring secure server networks and custom encryption nodes for corporate safety.</p>
        </div>
        <div class="card">
          <div class="card-icon">📡</div>
          <h3>Hologrid Marketing</h3>
          <p>High-frequency data targeting and audience routing metrics across private subnets.</p>
        </div>
      `;
    } else {
      headline = "Next-Gen Creative Agency";
      subheading = "Cooperating with modern teams to build outstanding digital products and expand client conversion loops.";
      buttonText = "Schedule Discovery Call";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">💻</div>
          <h3>Interface Engineering</h3>
          <p>Building highly optimized, accessible React and web layouts using CSS variables.</p>
        </div>
        <div class="card">
          <div class="card-icon">📈</div>
          <h3>Growth Analytics</h3>
          <p>Analyzing search queries, loading vitals, and user paths to double conversion.</p>
        </div>
        <div class="card">
          <div class="card-icon">🎨</div>
          <h3>Product Strategy</h3>
          <p>Researching market segments to design products that stand out from the competition.</p>
        </div>
      `;
    }
  } else if (industry === "Blog") {
    if (isArtisticVibe) {
      headline = "Reflections \& Textures";
      subheading = "An abstract archive of contemporary design ideas, art studies, and modern frontend structures.";
      buttonText = "Read Journal";
      cardsHtml = `
        <div class="card">
          <div class="card-img">📐</div>
          <h3>Deconstructing Grid Geometry</h3>
          <p>How organic asymmetrical spacing challenges standard layout systems in modern UI design.</p>
        </div>
        <div class="card">
          <div class="card-img">🎨</div>
          <h3>Painting with JavaScript</h3>
          <p>Using Canvas particles systems and requestAnimationFrame to make interfaces react to mouse movements.</p>
        </div>
        <div class="card">
          <div class="card-img">📖</div>
          <h3>Tactile Typography Scales</h3>
          <p>Why using serif headers creates emotional responses and increases user attention span.</p>
        </div>
      `;
    } else if (isMinimalistVibe) {
      headline = "Simple Log";
      subheading = "Raw, uncomplicated logs detailing web architecture, simple CSS, and minimalist life principles.";
      buttonText = "Read Log";
      cardsHtml = `
        <div class="card">
          <h3>Writing Zero-Dependency APIs</h3>
          <p>Reducing external packaging size to keep server routines lightning fast and secure.</p>
        </div>
        <div class="card">
          <h3>Less is More: CSS Variables</h3>
          <p>How using simple variables replaces complex framework stylesheets and saves bundle weight.</p>
        </div>
        <div class="card">
          <h3>Unraveling Layout Complexity</h3>
          <p>A manifesto on why single-column mobile-first designs are superior for user layouts.</p>
        </div>
      `;
    } else {
      headline = "The Technical Sandbox";
      subheading = "Regular guides exploring clean coding practices, modern design setups, and developer hacks.";
      buttonText = "Browse Articles";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">📝</div>
          <h3>Comprehensive CSS Grid Guide</h3>
          <p>Learn how to build complex responsive grids without a single media query.</p>
        </div>
        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>Mastering Git Hooks</h3>
          <p>Automate code formatting and testing pipelines before pushing commits to remote branches.</p>
        </div>
        <div class="card">
          <div class="card-icon">🛡️</div>
          <h3>Secure Sandbox Routing</h3>
          <p>Preventing cross-site scripting vulnerabilities when loading user code in client iframe headers.</p>
        </div>
      `;
    }
  } else if (industry === "Real Estate") {
    if (isArtisticVibe || style === "Glassmorphism") {
      headline = "Monolith Estates";
      subheading = "Curated architectural masterworks and premium luxury residencies designed for aesthetic living.";
      buttonText = "Explore Estates";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🏛️</div>
          <h3>The Obsidian Villa</h3>
          <p>Featuring raw basalt walls, infinity water pools, and solar glass ceiling layers.</p>
        </div>
        <div class="card">
          <div class="card-img">🌇</div>
          <h3>Horizon Heights Loft</h3>
          <p>Overlapping steel structures, floor-to-ceiling glass grids, and panoramic city vistas.</p>
        </div>
        <div class="card">
          <div class="card-img">🌿</div>
          <h3>Nordic Spruce Pavillion</h3>
          <p>Constructed around living forest trees with organic cedar panels and copper frames.</p>
        </div>
      `;
    } else {
      headline = "Metropolitan Property Group";
      subheading = "Modern residential real estate listings in prime urban districts with smart-home features.";
      buttonText = "Browse Listings";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🏢</div>
          <h3>Sky Garden Suite</h3>
          <p>2 Bed • 2 Bath • Smart automation, rooftop gardens, private elevator access.</p>
        </div>
        <div class="card">
          <div class="card-img">🏡</div>
          <h3>Riverfront Townhouse</h3>
          <p>3 Bed • 3 Bath • Multi-car garage, local timber decking, solar array paneling.</p>
        </div>
        <div class="card">
          <div class="card-img">🌆</div>
          <h3>Executive Penthouse</h3>
          <p>3 Bed • 4 Bath • High frequency smart cooling, marble bars, skyline balconies.</p>
        </div>
      `;
    }
  } else if (industry === "Education") {
    if (isPlayfulVibe) {
      headline = "Cosmic Academy";
      subheading = "Fun, gamified learning paths exploring physics, scripting, and interactive design for young creators.";
      buttonText = "Start Learning";
      cardsHtml = `
        <div class="card">
          <div class="card-img">🚀</div>
          <h3>Space Pioneers Path</h3>
          <p>Build rocket layout controllers while learning gravity physics loops and equations.</p>
        </div>
        <div class="card">
          <div class="card-img">🦖</div>
          <h3>DinoScript Playground</h3>
          <p>Write simple JavaScript scripts to animate prehistoric assets across web canvas files.</p>
        </div>
        <div class="card">
          <div class="card-img">🤖</div>
          <h3>RoboBuilder Laboratory</h3>
          <p>Assemble custom CSS grids to design interactive interfaces that command bot modules.</p>
        </div>
      `;
    } else {
      headline = "Vanguard Institute";
      subheading = "Acquire professional certifications in software engineering, UI design, and cloud database pipelines.";
      buttonText = "View Class Syllabus";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">🧠</div>
          <h3>Systems Architecture</h3>
          <p>Learn node load balancing, server clustering, and distributed database setups.</p>
        </div>
        <div class="card">
          <div class="card-icon">🎨</div>
          <h3>Modern Interface Systems</h3>
          <p>Study CSS custom variables, typography layout grids, and accessible styling.</p>
        </div>
        <div class="card">
          <div class="card-icon">🔒</div>
          <h3>Data Protection Codes</h3>
          <p>Implement secure auth tokens, encryption standards, and network firewall protocols.</p>
        </div>
      `;
    }
  } else if (industry === "Mobile App") {
    if (isCyberpunkVibe) {
      headline = "Synapse Mobile OS";
      subheading = "A secure, biometric mobile operating layout built for high-tech communication and subnets.";
      buttonText = "Link Device";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">🧬</div>
          <h3>Bio-Telemetry Sync</h3>
          <p>Synchronize vascular heartbeat signals with system authorization protocols.</p>
        </div>
        <div class="card">
          <div class="card-icon">📡</div>
          <h3>Subnet Navigator</h3>
          <p>Browse decentralized subnetworks securely using client onion proxy channels.</p>
        </div>
        <div class="card">
          <div class="card-icon">🧠</div>
          <h3>Neural Sync Assistant</h3>
          <p>Automate phone scheduling and routine scripts based on vascular metrics.</p>
        </div>
      `;
    } else {
      headline = "Aero: Your Daily Routine";
      subheading = "A beautiful, gesture-driven productivity application designed to reduce digital noise and organize schedules.";
      buttonText = "Download App";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">🗓️</div>
          <h3>Smart Scheduler</h3>
          <p>Group tasks automatically based on current location and schedule limits.</p>
        </div>
        <div class="card">
          <div class="card-icon">📊</div>
          <h3>Contextual Metrics</h3>
          <p>Simple graphs show daily focus rings, hydration levels, and exercise patterns.</p>
        </div>
        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>One-Gesture Logging</h3>
          <p>Log hydration and metrics instantly from your home screen with quick gestures.</p>
        </div>
      `;
    }
  } else {
    // SaaS/Software/Generic
    if (isCyberpunkVibe) {
      headline = "Hologrid: Neural Infrastructure";
      subheading = "Deploy distributed computing layers instantly across private decentralised subnetworks.";
      buttonText = "Establish Link";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>0.1ms Quantum Node</h3>
          <p>Routing telemetry through quantum tunnels to optimize computational routing paths.</p>
        </div>
        <div class="card">
          <div class="card-icon">🔒</div>
          <h3>Block Cipher Shield</h3>
          <p>Zero-leak cryptographic layers guarding secure peer data channels.</p>
        </div>
        <div class="card">
          <div class="card-icon">🧠</div>
          <h3>Auto-Agent Core</h3>
          <p>AI micro-routines monitoring pipeline load balancing dynamically.</p>
        </div>
      `;
    } else {
      headline = "Optimize Your Development Team";
      subheading = "Centralize code review loops, project telemetry metrics, and deployment pipelines in one shared hub.";
      buttonText = "Start Free Trial";
      cardsHtml = `
        <div class="card">
          <div class="card-icon">🚀</div>
          <h3>One-Click Deploy</h3>
          <p>Deploy serverless clusters globally in under a second with automated TLS configuration.</p>
        </div>
        <div class="card">
          <div class="card-icon">📊</div>
          <h3>Vitals Monitoring</h3>
          <p>Track layout shifts, server latency, and user drop-off telemetry on simple graphs.</p>
        </div>
        <div class="card">
          <div class="card-icon">👥</div>
          <h3>Cooperative Logs</h3>
          <p>Real-time collaborative workspace allowing developers to pair-program and debug logs together.</p>
        </div>
      `;
    }
  }
  
  // Custom styling tokens depending on the active design vibes
  let dynamicVibeCss = "";
  let rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: ${c.cardBg};
      --border: ${c.border};
      --font: '${font}', sans-serif;
      --radius: 16px;
      --border-width: 1px;
      --border-style: solid;
      --shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  `;
  
  if (isCyberpunkVibe) {
    rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: ${isDarkColor(c.bg) ? "rgba(10,8,15,0.8)" : "rgba(240,238,245,0.8)"};
      --border: ${c.primary}a0;
      --font: '${font}', sans-serif;
      --radius: 0px;
      --border-width: 2px;
      --border-style: solid;
      --shadow: 0 0 15px ${c.primary}30;
    `;
    
    dynamicVibeCss = `
      body {
        position: relative;
        overflow-x: hidden;
      }
      body::before {
        content: '';
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
        background-size: 100% 4px, 6px 100%;
        pointer-events: none;
        z-index: 999;
      }
      h1, h2, h3 {
        text-shadow: 0 0 10px var(--primary);
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      .card {
        position: relative;
        overflow: hidden;
      }
      .card::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 12px; height: 12px;
        background: var(--secondary);
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
      }
      .btn-primary {
        border-radius: 0px !important;
        border: 2px solid var(--secondary) !important;
        background: transparent !important;
        color: var(--text) !important;
        box-shadow: 0 0 10px var(--secondary)80;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .btn-primary:hover {
        background: var(--secondary) !important;
        color: #000 !important;
        box-shadow: 0 0 20px var(--secondary);
      }
    `;
  } else if (isBrutalistVibe) {
    rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.02)" : "#ffffff"};
      --border: var(--text);
      --font: '${font}', sans-serif;
      --radius: 0px;
      --border-width: 3px;
      --border-style: solid;
      --shadow: 8px 8px 0px var(--text);
    `;
    
    dynamicVibeCss = `
      h1, h2, h3 {
        text-transform: uppercase;
        font-weight: 900;
        letter-spacing: -1px;
      }
      .card {
        background-color: var(--card-bg) !important;
        transform: translate(0, 0);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .card:hover {
        transform: translate(-4px, -4px) !important;
        box-shadow: 12px 12px 0px var(--text) !important;
      }
      .btn-primary {
        border-radius: 0px !important;
        border: 3px solid var(--text) !important;
        background: var(--primary) !important;
        color: white !important;
        box-shadow: 4px 4px 0px var(--text);
      }
      .btn-primary:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px var(--text);
      }
    `;
  } else if (isArtisticVibe) {
    rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: ${isDarkColor(c.bg) ? "rgba(20,15,35,0.4)" : "rgba(255,255,255,0.4)"};
      --border: ${c.primary}30;
      --font: '${font}', sans-serif;
      --radius: 40px 10px 40px 10px;
      --border-width: 1px;
      --border-style: solid;
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    `;
    
    dynamicVibeCss = `
      body {
        background-image: 
          radial-gradient(circle at 5% 15%, ${c.primary}12 0%, transparent 45%),
          radial-gradient(circle at 95% 85%, ${c.secondary}12 0%, transparent 45%);
      }
      .card {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
      }
      .card:hover {
        transform: translateY(-8px) scale(1.02) !important;
        border-color: var(--primary);
      }
      .hero h1 {
        font-style: italic;
        font-weight: 300;
      }
      .navbar {
        border-bottom: 1px dashed var(--primary) !important;
      }
    `;
  } else if (isRetroVibe) {
    rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: ${isDarkColor(c.bg) ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)"};
      --border: ${c.primary}60;
      --font: '${font}', sans-serif;
      --radius: 8px;
      --border-width: 2px;
      --border-style: dashed;
      --shadow: 0 4px 0px ${c.primary}20;
    `;
    
    dynamicVibeCss = `
      body {
        background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px);
        background-size: 24px 24px;
      }
      .card {
        border-radius: var(--radius);
      }
      .btn-primary {
        border-radius: 8px !important;
        border: 2px solid var(--primary) !important;
        background: transparent !important;
        color: var(--primary) !important;
      }
      .btn-primary:hover {
        background: var(--primary) !important;
        color: white !important;
      }
    `;
  } else if (isMinimalistVibe) {
    rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: transparent;
      --border: transparent;
      --font: '${font}', sans-serif;
      --radius: 0px;
      --border-width: 0px;
      --border-style: none;
      --shadow: none;
    `;
    
    dynamicVibeCss = `
      .navbar {
        border-bottom: 1px solid ${isDarkColor(c.bg) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} !important;
      }
      .card {
        padding: 2.5rem 0 !important;
        border-bottom: 1px solid ${isDarkColor(c.bg) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} !important;
        transition: border-color 0.3s;
      }
      .card:hover {
        transform: none !important;
        border-bottom-color: var(--primary) !important;
      }
      .hero {
        padding: 8rem 0 5rem !important;
      }
      .btn-primary {
        background: var(--text) !important;
        color: var(--bg) !important;
        border-radius: 0px !important;
      }
    `;
  } else if (isPlayfulVibe) {
    rootVariables = `
      --bg: ${c.bg};
      --text: ${c.text};
      --text-muted: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
      --primary: ${c.primary};
      --secondary: ${c.secondary};
      --card-bg: ${isDarkColor(c.bg) ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.01)"};
      --border: ${c.primary}30;
      --font: '${font}', sans-serif;
      --radius: 28px;
      --border-width: 2px;
      --border-style: solid;
      --shadow: 0 8px 0px ${c.primary}15;
    `;
    
    dynamicVibeCss = `
      .card {
        border-radius: var(--radius);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .card:hover {
        transform: scale(1.05) rotate(1deg) !important;
        border-color: var(--primary);
      }
      .btn-primary {
        border-radius: 40px !important;
        box-shadow: 0 4px 0px var(--secondary);
      }
    `;
  }
  
  // Compile vibe scripts to run client-side in the sandbox
  let vibeScript = "";
  if (isArtisticVibe) {
    vibeScript = `
      document.addEventListener('DOMContentLoaded', () => {
        const blob = document.createElement('div');
        blob.style.cssText = "position:fixed; width:450px; height:450px; background:radial-gradient(circle, var(--primary) 0%, transparent 70%); filter:blur(90px); opacity:0.18; pointer-events:none; z-index:-1; transition: transform 0.15s ease-out; transform:translate(-50%, -50%);";
        document.body.appendChild(blob);
        document.addEventListener('mousemove', (e) => {
          blob.style.left = e.clientX + 'px';
          blob.style.top = e.clientY + 'px';
        });
      });
    `;
  } else if (isCyberpunkVibe) {
    vibeScript = `
      document.addEventListener('DOMContentLoaded', () => {
        const body = document.getElementById('logs-body');
        if (!body) return;
        const logs = [
          "CONNECTING TO NETWORK SUBNET...",
          "DECRYPTING SECURITY COEFFICIENTS: SUCCESS",
          "SECURE DATA LINK BRIDGE ACTIVE.",
          "RUNNING LIVE PIPELINE DIAGNOSTICS...",
          "STABILIZING CORE GRID LOAD CHANNELS...",
          "NODE SYSTEM PERFORMANCE STATUS: OPTIMAL."
        ];
        let idx = 0;
        function addLog() {
          if (!body) return;
          const d = document.createElement('div');
          d.innerHTML = '> ' + logs[idx % logs.length];
          d.style.color = 'var(--secondary)';
          d.style.fontFamily = 'monospace';
          d.style.fontSize = '0.75rem';
          d.style.marginBottom = '0.2rem';
          body.appendChild(d);
          idx++;
          if (body.children.length > 3) {
            body.removeChild(body.firstChild);
          }
          setTimeout(addLog, 2500 + Math.random() * 2000);
        }
        addLog();
      });
    `;
  } else if (isPlayfulVibe) {
    vibeScript = `
      document.addEventListener('DOMContentLoaded', () => {
        const emojis = ['🎈', '✨', '⭐', '🦄', '🍿', '🎉', '🎨', '🚀', '🌈'];
        document.addEventListener('click', (e) => {
          const p = document.createElement('div');
          p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          p.style.cssText = "position:fixed; left:" + e.clientX + "px; top:" + e.clientY + "px; font-size: 2rem; pointer-events:none; z-index:9999; transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform: translate(-50%, -50%); opacity: 1;";
          document.body.appendChild(p);
          requestAnimationFrame(() => {
            p.style.transform = "translate(-50%, -180%) scale(1.6) rotate(15deg)";
            p.style.opacity = "0";
          });
          setTimeout(() => p.remove(), 800);
        });
      });
    `;
  } else if (isBrutalistVibe) {
    vibeScript = `
      document.addEventListener('DOMContentLoaded', () => {
        const bar = document.createElement('div');
        bar.style.cssText = "position:fixed; top:0; left:0; height:8px; background:var(--secondary); border-bottom:3px solid var(--text); z-index:9999; width:0%;";
        document.body.appendChild(bar);
        window.addEventListener('scroll', () => {
          const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          bar.style.width = pct + '%';
        });
      });
    `;
  }
  
  // Assemble CSS
  state.generatedCss = `
    @import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap');
    
    :root {
      ${rootVariables}
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      padding: 0;
      min-height: 100vh;
      overflow-x: hidden;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    /* Navbar */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .brand {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .brand-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
    }
    
    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.3s;
    }
    
    .nav-links a:hover {
      color: var(--primary);
    }
    
    /* Hero */
    .hero {
      padding: 6rem 0;
      text-align: center;
      position: relative;
    }
    
    .hero-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      filter: blur(120px);
      opacity: 0.15;
      z-index: 1;
      pointer-events: none;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, var(--text) 50%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero p {
      font-size: 1.2rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
    }
    
    /* Buttons */
    .btn {
      display: inline-block;
      padding: 0.85rem 2rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      filter: brightness(1.1);
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      border-radius: 20px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
    }
    
    /* Grid Cards */
    .section {
      padding: 4rem 0 6rem;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .card {
      background: var(--card-bg);
      border: var(--border-width) var(--border-style) var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow);
      transition: all 0.3s;
    }
    
    .card:hover {
      transform: translateY(-5px);
      border-color: var(--primary);
    }
    
    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .card-img {
      height: 160px;
      background: rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    
    .card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      font-weight: 700;
    }
    
    .card p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    
    .price {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--secondary);
      margin: 0.5rem 0 1rem;
    }
    
    /* Footer */
    .footer {
      padding: 3rem 0;
      text-align: center;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    
    ${dynamicVibeCss}
  `;
  
  // Assemble HTML
  state.generatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${industry} Preview - WebCraft AI</title>
  <style>
    ${state.generatedCss}
  </style>
</head>
<body>
  <div class="container">
    <nav class="navbar">
      <div class="brand">
        <div class="brand-dot"></div>
        <span>${industry.replace(" ", "")}</span>
      </div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    
    <header class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <h1>${headline}</h1>
        <p>${subheading}</p>
        <button class="btn btn-primary">${buttonText}</button>
        ${isCyberpunkVibe ? `
        <div id="cyber-console" style="margin-top: 2.5rem; font-family: monospace; font-size: 0.8rem; background: rgba(0,0,0,0.5); border: 2px solid var(--primary); padding: 1rem; border-radius: 0; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto; max-height: 120px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
          <div style="color: var(--secondary); margin-bottom: 0.5rem; font-weight: bold; font-family: monospace;">[LINKED TELEMETRY NODE DATA - ACTIVE]</div>
          <div id="logs-body"></div>
        </div>
        ` : ''}
      </div>
    </header>
    
    <section class="section">
      <div class="grid">
        ${cardsHtml}
      </div>
    </section>
    
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} ${industry}. Generated by WebCraft AI.</p>
    </footer>
  </div>
  ${vibeScript ? `<script>${vibeScript}</script>` : ''}
</body>
</html>`;
}

// Render dynamic elements for active tab
function renderActiveStudioTab() {
  if (state.selectedTags.size === 0) {
    updatePreviewPlaceholder();
    return;
  }
  
  studioBodyEl.innerHTML = "";
  
  if (state.activeTab === "mockup") {
    // Render Image Mockup Panel
    const container = document.createElement("div");
    container.className = "mockup-container";
    
    const wrapper = document.createElement("div");
    wrapper.className = "mockup-wrapper";
    
    const spinner = document.createElement("div");
    spinner.className = "mockup-spinner";
    spinner.innerHTML = `
      <div class="spinner"></div>
      <span>Generating image mockup via Puter AI (takes ~5s)...</span>
    `;
    wrapper.appendChild(spinner);
    
    if (state.mockupUrl) {
      const img = document.createElement("img");
      img.className = "mockup-img";
      img.src = state.mockupUrl;
      img.alt = "Web UI Mockup Design Concept";
      
      img.onload = () => {
        spinner.style.display = "none";
        img.classList.add("loaded");
      };
      
      img.onerror = () => {
        spinner.innerHTML = `<span>⚠️ Error rendering mockup image. Click refresh below.</span>`;
      };
      
      wrapper.appendChild(img);
    } else if (!state.mockupLoading) {
      spinner.innerHTML = `<span>⚠️ Mockup generation failed. Click refresh below.</span>`;
    }
    
    container.appendChild(wrapper);
    
    // Actions
    const actions = document.createElement("div");
    actions.className = "mockup-actions";
    actions.innerHTML = `
      <div class="prompt-bar" title="${state.mockupUrl || ''}">
        Mockup API: Puter AI (Free)
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="action-btn" id="refresh-mockup">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg> Refresh
        </button>
        ${state.mockupUrl ? `
          <a href="${state.mockupUrl}" target="_blank" class="action-btn primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Open HD
          </a>
        ` : `
          <button class="action-btn primary" disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Open HD
          </button>
        `}
      </div>
    `;
    container.appendChild(actions);
    studioBodyEl.appendChild(container);
    
    document.getElementById("refresh-mockup").addEventListener("click", () => {
      generateMockupImage();
      renderActiveStudioTab();
    });
    
  } else if (state.activeTab === "prototype") {
    // Render Interactive Iframe
    const container = document.createElement("div");
    container.className = "prototype-container";
    
    const wrapper = document.createElement("div");
    wrapper.className = "viewport-wrapper";
    
    const iframe = document.createElement("iframe");
    iframe.className = `viewport-frame ${state.viewport}`;
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
    
    // Actions
    const actions = document.createElement("div");
    actions.className = "mockup-actions";
    actions.innerHTML = `
      <div class="prompt-bar">
        Interactive Layout Sandbox (Responsive)
      </div>
      <button class="action-btn primary" id="open-prototype">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg> Open Fullscreen
      </button>
    `;
    container.appendChild(actions);
    studioBodyEl.appendChild(container);
    
    // Inject HTML content into iframe
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(state.generatedHtml);
    doc.close();
    
    document.getElementById("open-prototype").addEventListener("click", () => {
      const w = window.open();
      w.document.open();
      w.document.write(state.generatedHtml);
      w.document.close();
    });
    
  } else if (state.activeTab === "code") {
    // Render Code Inspector
    const container = document.createElement("div");
    container.className = "code-panel";
    
    container.innerHTML = `
      <div class="code-header">
        <span class="code-title">INDEX.HTML (READY FOR EXPORT)</span>
        <button class="action-btn" id="copy-code" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Code
        </button>
      </div>
      <div class="code-body">
        <pre><code id="code-block"></code></pre>
      </div>
    `;
    
    studioBodyEl.appendChild(container);
    
    // Escape HTML entities to display code safely
    const escapedCode = state.generatedHtml
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
      
    document.getElementById("code-block").innerHTML = escapedCode;
    
    document.getElementById("copy-code").addEventListener("click", () => {
      navigator.clipboard.writeText(state.generatedHtml)
        .then(() => showToast("Copied full HTML/CSS prototype to clipboard!"))
        .catch(() => showToast("Failed to copy code."));
    });
  }
}

// Utility: Simple HSL/RGB brightness checker to detect if background is dark
function isDarkColor(hex) {
  if (hex.startsWith('#')) hex = hex.substring(1);
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

// Load
window.addEventListener("DOMContentLoaded", init);
