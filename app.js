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
  generatedCss: "",
  
  // New features state
  menuLinks: ["Home", "Features", "Pricing", "Contact"],
  enabledComponents: new Set(["hero", "features"]),
  heroCustomButtons: [],
  tableColumns: [],
  navSticky: false
};

// DOM Elements
const tagContainerEl = document.getElementById("tag-dictionary");
const tagCounterEl = document.getElementById("selected-count");
const fontSelectEl = document.getElementById("font-select");
const fontPreviewEl = document.getElementById("font-preview");
const generateBtnEl = document.getElementById("generate-btn");
const tabBtnMockupEl = document.getElementById("tab-mockup");
const tabBtnSketchEl = document.getElementById("tab-sketch");
const tabBtnProtoEl = document.getElementById("tab-prototype");
const tabBtnCodeEl = document.getElementById("tab-code");
const viewportControlsEl = document.getElementById("viewport-controls");
const studioBodyEl = document.getElementById("studio-body");
const toastEl = document.getElementById("toast");
const toastMessageEl = document.getElementById("toast-message");

// Dynamic components DOM Selectors
const menuItemsGridEl = document.getElementById("menu-items-grid");
const customMenuInputEl = document.getElementById("custom-menu-input");
const addMenuBtnEl = document.getElementById("add-menu-btn");

const compHeroCheck = document.getElementById("comp-hero");
const compFeaturesCheck = document.getElementById("comp-features");
const compTableCheck = document.getElementById("comp-table");
const compPricingCheck = document.getElementById("comp-pricing");
const compFaqCheck = document.getElementById("comp-faq");
const compFormCheck = document.getElementById("comp-form");

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
  renderMenuLinks();
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
  tabBtnSketchEl.addEventListener("click", () => switchTab("sketch"));
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

  // Dynamic Component Checklist Listeners
  const checkboxMap = {
    "hero": compHeroCheck,
    "features": compFeaturesCheck,
    "table": compTableCheck,
    "pricing": compPricingCheck,
    "faq": compFaqCheck,
    "form": compFormCheck
  };

  Object.entries(checkboxMap).forEach(([compKey, el]) => {
    el.addEventListener("change", (e) => {
      if (e.target.checked) {
        state.enabledComponents.add(compKey);
      } else {
        state.enabledComponents.delete(compKey);
      }
      
      // Auto recompile if there is an active prototype rendering
      if (state.selectedTags.size > 0) {
        compilePrototypeCode();
        if (state.activeTab === "prototype" || state.activeTab === "code") {
          renderActiveStudioTab();
        }
      }
    });
  });

  // Custom Menu Buttons Listeners
  addMenuBtnEl.addEventListener("click", addCustomMenuLink);
  customMenuInputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCustomMenuLink();
    }
  });
}

// Render Menu Buttons grid in sidebar
function renderMenuLinks() {
  menuItemsGridEl.innerHTML = "";
  state.menuLinks.forEach((link, idx) => {
    const badge = document.createElement("div");
    badge.className = "menu-item-badge";
    badge.textContent = link;
    badge.addEventListener("click", () => {
      state.menuLinks.splice(idx, 1);
      renderMenuLinks();
      
      // Auto recompile and refresh live layout
      if (state.selectedTags.size > 0) {
        compilePrototypeCode();
        if (state.activeTab === "prototype" || state.activeTab === "code") {
          renderActiveStudioTab();
        }
      }
    });
    menuItemsGridEl.appendChild(badge);
  });
}

// Add a custom menu link
function addCustomMenuLink() {
  const val = customMenuInputEl.value.trim();
  if (!val) return;
  if (state.menuLinks.includes(val)) {
    showToast("This menu link already exists!");
    return;
  }
  if (state.menuLinks.length >= 8) {
    showToast("Maximum of 8 menu buttons reached.");
    return;
  }
  state.menuLinks.push(val);
  customMenuInputEl.value = "";
  renderMenuLinks();
  showToast(`Added navigation menu button: ${val}`);
  
  // Auto recompile and refresh live layout
  if (state.selectedTags.size > 0) {
    compilePrototypeCode();
    if (state.activeTab === "prototype" || state.activeTab === "code") {
      renderActiveStudioTab();
    }
  }
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
  tabBtnSketchEl.classList.remove("active");
  tabBtnProtoEl.classList.remove("active");
  tabBtnCodeEl.classList.remove("active");
  
  if (tab === "mockup") {
    tabBtnMockupEl.classList.add("active");
    viewportControlsEl.style.display = "none";
  } else if (tab === "sketch") {
    tabBtnSketchEl.classList.add("active");
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
      subheading = "A curated selection of modern gadgets and home aesthetics built for sophisticated spaces.";
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
        background: 
          linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), 
          linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
        background-size: 100% 4px, 6px 100%;
        pointer-events: none;
        z-index: 9999;
        animation: crt-flicker 0.15s infinite;
      }
      @keyframes crt-flicker {
        0% { opacity: 0.94; }
        50% { opacity: 1.0; }
        100% { opacity: 0.94; }
      }
      h1, h2, h3 {
        text-shadow: 0 0 10px var(--primary);
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      .glitch-text {
        position: relative;
        display: inline-block;
      }
      .glitch-text::before, .glitch-text::after {
        content: attr(data-text);
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: var(--bg);
        overflow: hidden;
      }
      .glitch-text::before {
        left: 2px;
        text-shadow: -2px 0 var(--secondary);
        clip-path: rect(10px, 9999px, 30px, 0);
        animation: glitch-anim-1 2s infinite linear alternate-reverse;
      }
      .glitch-text::after {
        left: -2px;
        text-shadow: -2px 0 var(--primary), 0 2px var(--secondary);
        clip-path: rect(40px, 9999px, 80px, 0);
        animation: glitch-anim-2 2s infinite linear alternate-reverse;
      }
      @keyframes glitch-anim-1 {
        0% { clip-path: inset(20% 0 30% 0); }
        20% { clip-path: inset(60% 0 10% 0); }
        40% { clip-path: inset(40% 0 50% 0); }
        60% { clip-path: inset(80% 0 5% 0); }
        80% { clip-path: inset(10% 0 70% 0); }
        100% { clip-path: inset(30% 0 20% 0); }
      }
      @keyframes glitch-anim-2 {
        0% { clip-path: inset(15% 0 45% 0); }
        25% { clip-path: inset(75% 0 5% 0); }
        50% { clip-path: inset(35% 0 55% 0); }
        75% { clip-path: inset(85% 0 10% 0); }
        100% { clip-path: inset(55% 0 25% 0); }
      }
      .cyber-badge {
        font-family: monospace;
        font-size: 0.7rem;
        color: var(--secondary);
        border: 1px solid var(--secondary);
        padding: 0.2rem 0.5rem;
        display: inline-block;
        margin-bottom: 0.75rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        background: rgba(0, 240, 255, 0.05);
        box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
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
        blob.style.cssText = "position:fixed; width:200px; height:200px; background:radial-gradient(circle, ${c.primary}15 0%, transparent 70%); pointer-events:none; z-index:9999; transform:translate(-50%, -50%); transition: left 0.1s ease-out, top 0.1s ease-out;";
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
  
  // Sticky Navbar configuration CSS
  let stickyNavCss = "";
  if (state.navSticky) {
    stickyNavCss = `
      .navbar {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: var(--bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
        border-bottom: 1px solid var(--border) !important;
      }
    `;
  }

  // Component Custom Vibe CSS overrides
  let dynamicVibeComponentCss = "";
  if (isCyberpunkVibe) {
    dynamicVibeComponentCss = `
      .table-scroll-container, .pricing-card, .faq-item, .contact-box {
        border-radius: 0px !important;
        border-color: var(--primary)80 !important;
        box-shadow: 0 0 12px var(--primary)25 !important;
      }
      .pricing-card.featured {
        border-color: var(--secondary) !important;
        box-shadow: 0 0 20px var(--secondary)50 !important;
      }
      .data-table th {
        color: var(--secondary) !important;
        font-family: monospace;
      }
      .data-table td {
        font-family: monospace;
      }
      .form-group input, .form-group textarea {
        border-radius: 0px !important;
        border-color: var(--border) !important;
        font-family: monospace;
      }
      .form-group input:focus, .form-group textarea:focus {
        border-color: var(--secondary) !important;
        box-shadow: 0 0 15px var(--secondary)60 !important;
      }
    `;
  } else if (isBrutalistVibe) {
    dynamicVibeComponentCss = `
      .table-scroll-container, .pricing-card, .faq-item, .contact-box {
        border-radius: 0px !important;
        border: 3px solid var(--text) !important;
        box-shadow: 8px 8px 0px var(--text) !important;
        background: var(--bg) !important;
      }
      .pricing-card.featured {
        background: var(--primary)15 !important;
        transform: translate(-4px, -4px) !important;
        box-shadow: 12px 12px 0px var(--text) !important;
      }
      .data-table th {
        background: var(--primary) !important;
        color: white !important;
        border-bottom: 3px solid var(--text) !important;
      }
      .data-table td {
        border-bottom: 2px solid var(--text) !important;
      }
      .form-group input, .form-group textarea {
        border-radius: 0px !important;
        border: 3px solid var(--text) !important;
        background: transparent !important;
        color: var(--text) !important;
      }
      .form-group input:focus, .form-group textarea:focus {
        background: var(--secondary)15 !important;
      }
    `;
  } else if (isPlayfulVibe) {
    dynamicVibeComponentCss = `
      .table-scroll-container, .pricing-card, .faq-item, .contact-box {
        border-radius: 28px !important;
        border-color: var(--primary)40 !important;
        box-shadow: 0 8px 0px var(--primary)10 !important;
      }
      .pricing-card.featured {
        border-color: var(--secondary) !important;
        box-shadow: 0 8px 0px var(--secondary)30 !important;
      }
      .form-group input, .form-group textarea {
        border-radius: 18px !important;
        border-color: var(--primary)40 !important;
      }
    `;
  } else if (isMinimalistVibe) {
    dynamicVibeComponentCss = `
      .table-scroll-container, .pricing-card, .faq-item, .contact-box {
        border-radius: 0px !important;
        border: none !important;
        border-bottom: 1px solid var(--border) !important;
        box-shadow: none !important;
        background: transparent !important;
      }
      .pricing-card {
        padding: 2rem 0 !important;
      }
      .pricing-card.featured {
        border-bottom: 2px solid var(--primary) !important;
      }
      .data-table th {
        background: transparent !important;
        border-bottom: 1px solid var(--text) !important;
      }
      .form-group input, .form-group textarea {
        border-radius: 0px !important;
        border: none !important;
        border-bottom: 1px solid var(--border) !important;
        background: transparent !important;
      }
    `;
  } else if (isRetroVibe) {
    dynamicVibeComponentCss = `
      .table-scroll-container, .pricing-card, .faq-item, .contact-box {
        border-radius: 8px !important;
        border: 2px dashed var(--primary) !important;
      }
      .pricing-card.featured {
        border-style: solid !important;
        background: rgba(0,0,0,0.15) !important;
      }
      .data-table th {
        border-bottom: 2px dashed var(--primary) !important;
      }
      .form-group input, .form-group textarea {
        border: 2px dashed var(--primary) !important;
        border-radius: 8px !important;
      }
    `;
  } else if (isArtisticVibe) {
    dynamicVibeComponentCss = `
      .table-scroll-container, .pricing-card, .faq-item, .contact-box {
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-radius: 40px 10px 40px 10px !important;
        border: 1px solid var(--primary)30 !important;
      }
      .pricing-card.featured {
        border-color: var(--primary) !important;
        box-shadow: 0 10px 30px var(--primary)15 !important;
      }
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

    .btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text);
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: var(--primary);
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
      padding: 5rem 0;
    }

    .section-title {
      font-size: 2.25rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 0.75rem;
      background: linear-gradient(135deg, var(--text) 60%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.01em;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2.5rem;
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

    /* Table styling */
    .table-scroll-container {
      width: 100%;
      overflow-x: auto;
      border: var(--border-width) var(--border-style) var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      margin: 2.5rem 0;
      background: var(--card-bg);
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      min-width: 600px;
    }
    .data-table th {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.15rem 1.5rem;
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--primary);
      border-bottom: var(--border-width) var(--border-style) var(--border);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .data-table td {
      padding: 1.15rem 1.5rem;
      border-bottom: 1px solid var(--border);
      font-size: 0.95rem;
      color: var(--text-muted);
      transition: background 0.2s;
    }
    .data-table tr:last-child td {
      border-bottom: none;
    }
    .data-table tr:hover td {
      background: rgba(255, 255, 255, 0.015);
      color: var(--text);
    }
    
    /* Pricing Matrix */
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 2.5rem;
    }
    .pricing-card {
      background: var(--card-bg);
      border: var(--border-width) var(--border-style) var(--border);
      border-radius: var(--radius);
      padding: 2.5rem 2rem;
      box-shadow: var(--shadow);
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;
    }
    .pricing-card.featured {
      border-color: var(--primary);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
      transform: translateY(-5px);
    }
    .badge-featured {
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 20px;
    }
    .pricing-card h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .price-desc {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      min-height: 42px;
    }
    .price-val {
      margin-bottom: 2rem;
      display: flex;
      align-items: baseline;
    }
    .price-amt {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--text);
    }
    .price-period {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-left: 0.25rem;
    }
    .pricing-features {
      list-style: none;
      margin-bottom: 2.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .pricing-features li {
      font-size: 0.95rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .pricing-card .btn {
      width: 100%;
      text-align: center;
    }
    
    /* FAQ Accordion */
    .faq-accordion {
      max-width: 800px;
      margin: 2.5rem auto 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .faq-item {
      background: var(--card-bg);
      border: var(--border-width) var(--border-style) var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: all 0.3s;
    }
    .faq-question {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      border: none;
      color: var(--text);
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
      font-family: var(--font);
    }
    .faq-question:hover {
      color: var(--primary);
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out, padding 0.3s ease-out;
      background: rgba(0, 0, 0, 0.15);
      padding: 0 1.5rem;
    }
    .faq-item.active {
      border-color: var(--primary);
    }
    .faq-item.active .faq-answer {
      max-height: 200px;
      padding: 1.5rem;
      border-top: 1px solid var(--border);
    }
    .faq-icon {
      font-size: 1.5rem;
      color: var(--primary);
      transition: transform 0.2s;
      display: inline-block;
      line-height: 1;
    }
    
    /* Contact Box */
    .contact-box {
      max-width: 600px;
      margin: 2.5rem auto 0;
      background: var(--card-bg);
      border: var(--border-width) var(--border-style) var(--border);
      border-radius: var(--radius);
      padding: 3rem 2.5rem;
      box-shadow: var(--shadow);
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-group label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text);
    }
    .form-group input, .form-group textarea {
      background: rgba(0,0,0,0.15);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.85rem 1rem;
      color: var(--text);
      font-family: var(--font);
      font-size: 0.95rem;
      outline: none;
      transition: all 0.3s;
    }
    .form-group input:focus, .form-group textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.1);
    }
    
    /* Footer */
    .footer {
      padding: 3rem 0;
      text-align: center;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    
    ${stickyNavCss}
    ${dynamicVibeCss}
    ${dynamicVibeComponentCss}
  `;
  
  // Assemble HTML dynamically based on state
  let compiledSectionsHtml = "";

  // 1. Navigation Menu List HTML
  const navLinks = state.menuLinks.map(link => `<li><a href="#${link.toLowerCase().replace(/\s+/g, '-')}">${link}</a></li>`).join("\n        ");
  
  compiledSectionsHtml += `
    <nav class="navbar">
      <div class="brand">
        <div class="brand-dot"></div>
        <span>${industry.replace(/\s+/g, "")}</span>
      </div>
      <ul class="nav-links">
        ${navLinks}
      </ul>
    </nav>
  `;

  // 2. Hero Section
  if (state.enabledComponents.has("hero")) {
    let customHeroBtnsHtml = "";
    if (state.heroCustomButtons && state.heroCustomButtons.length > 0) {
      customHeroBtnsHtml = state.heroCustomButtons.map(btn => `
        <button class="btn btn-secondary">${btn}</button>
      `).join("");
    }

    compiledSectionsHtml += `
    <header class="hero" id="home">
      <div class="hero-glow"></div>
      <div class="hero-content">
        ${isCyberpunkVibe ? `<div class="cyber-badge">[SYS_DATALINK // TERMINAL_LINK // STATUS: OK]</div>` : ''}
        <h1 class="${isCyberpunkVibe ? 'glitch-text' : ''}" ${isCyberpunkVibe ? `data-text="${headline}"` : ''}>${headline}</h1>
        <p>${subheading}</p>
        <div class="hero-actions" style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; align-items: center;">
          <button class="btn btn-primary ${isCyberpunkVibe ? 'glitch-text' : ''}" ${isCyberpunkVibe ? `data-text="${buttonText}"` : ''}>${buttonText}</button>
          ${customHeroBtnsHtml}
        </div>
        ${isCyberpunkVibe ? `
        <div id="cyber-console" style="margin-top: 2.5rem; font-family: monospace; font-size: 0.8rem; background: rgba(0,0,0,0.5); border: 2px solid var(--primary); padding: 1rem; border-radius: 0; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto; max-height: 120px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
          <div style="color: var(--secondary); margin-bottom: 0.5rem; font-weight: bold; font-family: monospace;">[LINKED TELEMETRY NODE DATA - ACTIVE]</div>
          <div id="logs-body"></div>
        </div>
        ` : ''}
      </div>
    </header>
    `;
  }

  // 3. Feature Cards
  if (state.enabledComponents.has("features")) {
    compiledSectionsHtml += `
    <section class="section" id="features">
      <h2 class="section-title">Core Features</h2>
      <div class="grid">
        ${cardsHtml}
      </div>
    </section>
    `;
  }

  // 4. Scrollable Data Table
  if (state.enabledComponents.has("table")) {
    let tableHeaders = state.tableColumns;
    if (!tableHeaders || tableHeaders.length === 0) {
      if (industry === "Fitness") {
        tableHeaders = ["Class Name", "Instructor", "Time", "Intensity"];
      } else if (industry === "Restaurant") {
        tableHeaders = ["Dish Name", "Category", "Preparation", "Price"];
      } else if (industry === "Portfolio") {
        tableHeaders = ["Project Name", "Role", "Tech Stack", "Status"];
      } else if (industry === "E-Commerce") {
        tableHeaders = ["Product Model", "SKU", "Stock", "Base Price"];
      } else {
        tableHeaders = ["Service Node", "Location", "CPU Load", "Latency"];
      }
    }

    let tableRows = [];
    if (industry === "Fitness") {
      tableRows = [
        ["Power Yoga Focus", "Sarah Jenkins", "08:00 AM", "Medium"],
        ["HIIT Conditioning", "Marcus Vance", "10:30 AM", "High"],
        ["Barbell Strength", "Elena Rostova", "04:00 PM", "High"],
        ["Somatic Stretch", "Kaito Sato", "06:30 PM", "Low"],
        ["Cardio Blast", "Aisha Diallo", "07:30 PM", "Medium"]
      ];
    } else if (industry === "Restaurant") {
      tableRows = [
        ["Truffle Pasta", "Mains", "15 mins", "$28.00"],
        ["Basalt Beef Ribeye", "Grill", "25 mins", "$42.00"],
        ["Deconstructed Soufflé", "Desserts", "20 mins", "$16.00"],
        ["Heirloom Salad", "Starters", "10 mins", "$14.00"],
        ["Spicy Tuna Crudo", "Starters", "12 mins", "$22.00"]
      ];
    } else if (industry === "Portfolio") {
      tableRows = [
        ["Aura Interactive", "Lead Designer", "WebGL, Three.js", "Live"],
        ["Zen Brand Identity", "Art Director", "Illustrator, Print", "Archive"],
        ["Cypher Web Shell", "Systems Dev", "Docker, Node, Go", "Beta"],
        ["Volta Mobile App", "Product Designer", "React Native", "Live"],
        ["Metrics Dashboard", "UI Engineer", "D3.js, HTML5", "Internal"]
      ];
    } else if (industry === "E-Commerce") {
      tableRows = [
        ["Acoustic Pro Headset", "AC-PRO-09", "In Stock", "$320.00"],
        ["Chrono Smartwatch", "CH-SM-88", "Low Stock", "$210.00"],
        ["Orbital Desk Lamp", "ORB-DL-41", "In Stock", "$85.00"],
        ["Raw Runner 01", "RAW-R-01", "Out of Stock", "$180.00"],
        ["Modular Utility Pack", "MOD-UP-33", "In Stock", "$150.00"]
      ];
    } else {
      tableRows = [
        ["Quantum Core A", "US-East", "42%", "0.08ms"],
        ["Quantum Core B", "EU-Central", "88%", "0.12ms"],
        ["Edge Node 109", "AP-South", "12%", "0.24ms"],
        ["Cipher Guard 1", "Global Proxy", "31%", "0.15ms"],
        ["Auto-Agent Hub", "US-West", "55%", "0.09ms"]
      ];
    }

    let headersHtml = tableHeaders.map(h => `<th>${h}</th>`).join("");
    let rowsHtml = tableRows.map(row => {
      let cols = "";
      for (let i = 0; i < tableHeaders.length; i++) {
        let val = row[i % row.length] || "-";
        cols += `<td>${val}</td>`;
      }
      return `<tr>${cols}</tr>`;
    }).join("\n          ");

    compiledSectionsHtml += `
    <section class="section" id="table">
      <h2 class="section-title">Operational Telemetry</h2>
      <p style="text-align: center; color: var(--text-muted); margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto; font-size: 0.95rem;">Real-time metrics and tabular index data (scrollable grid)</p>
      <div class="table-scroll-container">
        <table class="data-table">
          <thead>
            <tr>
              ${headersHtml}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </section>
    `;
  }

  // 5. Pricing Matrix
  if (state.enabledComponents.has("pricing")) {
    let pricingCardsHtml = `
      <div class="pricing-card">
        <h3>Starter</h3>
        <p class="price-desc">For individuals exploring core features.</p>
        <div class="price-val">
          <span class="price-amt">$19</span>
          <span class="price-period">/mo</span>
        </div>
        <ul class="pricing-features">
          <li>✓ Basic Analytics</li>
          <li>✓ Single Workspace</li>
          <li>✓ Standard Speed</li>
          <li>✓ Email Support</li>
        </ul>
        <button class="btn btn-secondary">Select Starter</button>
      </div>
      <div class="pricing-card featured">
        <div class="badge-featured">Popular</div>
        <h3>Professional</h3>
        <p class="price-desc">Perfect for teams and production apps.</p>
        <div class="price-val">
          <span class="price-amt">$49</span>
          <span class="price-period">/mo</span>
        </div>
        <ul class="pricing-features">
          <li>✓ Full Telemetry Suite</li>
          <li>✓ 5 Workspaces</li>
          <li>✓ 0.1ms Server Responses</li>
          <li>✓ 24/7 Priority Support</li>
          <li>✓ AI Agent Core Access</li>
        </ul>
        <button class="btn btn-primary">Select Pro</button>
      </div>
      <div class="pricing-card">
        <h3>Enterprise</h3>
        <p class="price-desc">Full infrastructure load capacity.</p>
        <div class="price-val">
          <span class="price-amt">$99</span>
          <span class="price-period">/mo</span>
        </div>
        <ul class="pricing-features">
          <li>✓ Unlimited Subnets</li>
          <li>✓ Dedicated Clustering</li>
          <li>✓ Zero-Latency Routing</li>
          <li>✓ Custom SLA Support</li>
        </ul>
        <button class="btn btn-secondary">Select Enterprise</button>
      </div>
    `;

    compiledSectionsHtml += `
    <section class="section" id="pricing">
      <h2 class="section-title">Flexible Pricing Plan</h2>
      <p style="text-align: center; color: var(--text-muted); margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto; font-size: 0.95rem;">Pick a tier that aligns with your scale and requirements.</p>
      <div class="pricing-grid">
        ${pricingCardsHtml}
      </div>
    </section>
    `;
  }

  // 6. FAQ Accordion
  if (state.enabledComponents.has("faq")) {
    compiledSectionsHtml += `
    <section class="section" id="faq">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p style="text-align: center; color: var(--text-muted); margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto; font-size: 0.95rem;">Quick answers to common questions about our dynamic setups.</p>
      <div class="faq-accordion">
        <div class="faq-item">
          <button class="faq-question">
            <span>How does the AI layout model process keywords?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>The layout model reads selected semantic tags, parses their contextual meanings, and pairs them to write custom headlines, copy descriptions, and load style variables suited for your specific industry.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            <span>Can I export the compiled prototype source code?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Yes, you can click the 'Source Code' tab, copy the entire compiled code blocks including standard styling overrides and scripts, and run it locally with zero dependencies.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            <span>How can I add scrollable tables and customized menus?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Use the 'Layout Sketch' planner tab or sidebar customizers to add/remove links and toggle tables. The prototype compiler handles rendering instantly.</p>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  // 7. Contact Form
  if (state.enabledComponents.has("form")) {
    compiledSectionsHtml += `
    <section class="section" id="contact">
      <div class="contact-box">
        <h2 class="section-title" style="margin-bottom: 1rem;">Get In Touch</h2>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem; font-size: 0.95rem;">Drop a message to initiate collaboration or inquire about services.</p>
        <form class="contact-form" onsubmit="event.preventDefault(); alert('Inquiry sent successfully!');">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required>
          </div>
          <div class="form-group">
            <label>Message Content</label>
            <textarea rows="4" placeholder="How can we cooperate?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
        </form>
      </div>
    </section>
    `;
  }

  // 8. Footer (Always compiled)
  compiledSectionsHtml += `
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} ${industry}. Generated by WebCraft AI.</p>
    </footer>
  `;

  let compiledScripts = "";
  compiledScripts += `
    // FAQ Toggle Handler
    document.addEventListener('DOMContentLoaded', () => {
      const questions = document.querySelectorAll('.faq-question');
      questions.forEach(q => {
        q.addEventListener('click', () => {
          const item = q.parentElement;
          const isActive = item.classList.contains('active');
          
          document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
          
          if (!isActive) {
            item.classList.add('active');
          }
        });
      });
    });
  `;
  if (vibeScript) {
    compiledScripts += "\n" + vibeScript;
  }

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
    ${compiledSectionsHtml}
  </div>
  ${compiledScripts ? `<script>${compiledScripts}</script>` : ''}
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
  } else if (state.activeTab === "sketch") {
    renderLayoutBlueprintSketch();
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

// ==========================================
// Layout Sketch Wireframe Renderer
// ==========================================
function renderLayoutBlueprintSketch() {
  const tagsArr = Array.from(state.selectedTags);
  const industry = tagsArr.find(t => TAGS_DICTIONARY.industry.includes(t)) || "Landing Page";
  const style = tagsArr.find(t => TAGS_DICTIONARY.style.includes(t)) || "Modern";
  
  let headline = `Unleash Your Web Presence`;
  let subheading = `A tailored ${style} design for your ${industry} crafted dynamically.`;
  let buttonText = "Explore Features";
  
  if (industry === "Fitness") {
    headline = "Apex Performance Center";
    subheading = "Reach your peak condition with scientific coaching.";
    buttonText = "Schedule Class";
  } else if (industry === "Restaurant") {
    headline = "The Culinary Canvas";
    subheading = "Indulge in avant-garde gastronomy.";
    buttonText = "Reserve a Table";
  } else if (industry === "Portfolio") {
    headline = "Digital Product Portfolio";
    subheading = "A showcase of clean dashboards and user interfaces.";
    buttonText = "View Gallery";
  } else if (industry === "E-Commerce") {
    headline = "Lumina Essentials";
    subheading = "A curated selection of modern gadgets.";
    buttonText = "Shop Best Sellers";
  }
  
  studioBodyEl.innerHTML = `
    <div class="sketch-panel">
      <div class="sketch-header-bar">
        <div class="sketch-title">🗺️ INTERACTIVE WIREFRAME BLUEPRINT</div>
        <div style="font-size: 0.8rem; color: var(--accent-secondary); font-family: monospace; text-transform: uppercase;">[${style} + ${industry} Layout]</div>
      </div>
      
      <div class="sketch-blueprint-grid">
        <!-- NAVBAR BLOCK -->
        <div class="sketch-block active" id="sketch-navbar">
          <div class="block-label">
            <span class="block-name">NAVBAR HEADER</span>
            <label class="sketch-option-check">
              <input type="checkbox" id="sketch-nav-sticky" ${state.navSticky ? 'checked' : ''}> Sticky Menu
            </label>
          </div>
          <div class="blueprint-content nav-blueprint">
            <div class="bp-logo">
              <div class="bp-dot"></div>
              <span>${industry.toUpperCase()}</span>
            </div>
            <div class="bp-links-wrapper">
              <div class="bp-links-list" id="sketch-links-list"></div>
              <button class="bp-add-link-btn" id="sketch-add-link-btn" title="Add Menu Link">+</button>
            </div>
          </div>
        </div>
        
        <!-- HERO SECTION BLOCK -->
        <div class="sketch-block ${state.enabledComponents.has('hero') ? 'active' : 'inactive'}" id="sketch-hero">
          <div class="block-label">
            <span class="block-name">HERO SECTION</span>
            <label class="sketch-toggle">
              <input type="checkbox" data-comp="hero" class="sketch-comp-toggle" ${state.enabledComponents.has('hero') ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="blueprint-content hero-blueprint">
            <div class="bp-title-box">Headline: ${headline}</div>
            <div class="bp-sub-box">Subheading: ${subheading}</div>
            <div class="bp-btn-row">
              <div class="bp-btn-box">${buttonText}</div>
              <span id="bp-hero-buttons-container" style="display: flex; gap: 0.5rem; flex-wrap: wrap;"></span>
              <button class="bp-add-btn-btn" id="sketch-add-hero-btn" title="Add Custom Button">+ Button</button>
            </div>
          </div>
        </div>

        <!-- FEATURE CARDS BLOCK -->
        <div class="sketch-block ${state.enabledComponents.has('features') ? 'active' : 'inactive'}" id="sketch-features">
          <div class="block-label">
            <span class="block-name">FEATURE CARDS GRID</span>
            <label class="sketch-toggle">
              <input type="checkbox" data-comp="features" class="sketch-comp-toggle" ${state.enabledComponents.has('features') ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="blueprint-content cards-blueprint">
            <div class="bp-grid-3">
              <div class="bp-card-box">
                <div class="bp-card-icon">📁</div>
                <div class="bp-card-title">Feature 1</div>
                <div class="bp-card-desc">Contextual item details...</div>
              </div>
              <div class="bp-card-box">
                <div class="bp-card-icon">⚡</div>
                <div class="bp-card-title">Feature 2</div>
                <div class="bp-card-desc">Contextual item details...</div>
              </div>
              <div class="bp-card-box">
                <div class="bp-card-icon">⚙️</div>
                <div class="bp-card-title">Feature 3</div>
                <div class="bp-card-desc">Contextual item details...</div>
              </div>
            </div>
          </div>
        </div>

        <!-- SCROLLABLE DATA TABLE BLOCK -->
        <div class="sketch-block ${state.enabledComponents.has('table') ? 'active' : 'inactive'}" id="sketch-table">
          <div class="block-label">
            <span class="block-name">SCROLLABLE DATA TABLE</span>
            <label class="sketch-toggle">
              <input type="checkbox" data-comp="table" class="sketch-comp-toggle" ${state.enabledComponents.has('table') ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="blueprint-content table-blueprint">
            <div class="bp-table-meta">
              <span>Columns Feed</span>
              <button class="bp-table-action" id="sketch-table-cols-btn">Customize Columns</button>
            </div>
            <div class="bp-table-scroll">
              <div class="bp-table-wire">
                <div class="bp-table-header-row" id="sketch-table-headers"></div>
                <div class="bp-table-row">
                  <div class="bp-td">Row Data A</div>
                  <div class="bp-td">Row Data B</div>
                  <div class="bp-td">Row Data C</div>
                  <div class="bp-td">Row Data D</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PRICING MATRIX BLOCK -->
        <div class="sketch-block ${state.enabledComponents.has('pricing') ? 'active' : 'inactive'}" id="sketch-pricing">
          <div class="block-label">
            <span class="block-name">PRICING MATRIX</span>
            <label class="sketch-toggle">
              <input type="checkbox" data-comp="pricing" class="sketch-comp-toggle" ${state.enabledComponents.has('pricing') ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="blueprint-content pricing-blueprint">
            <div class="bp-grid-3">
              <div class="bp-price-box">
                <div class="bp-price-name">Starter</div>
                <div class="bp-price-val">$19</div>
                <div class="bp-price-btn">Select</div>
              </div>
              <div class="bp-price-box bp-featured">
                <div class="bp-price-name">Pro</div>
                <div class="bp-price-val">$49</div>
                <div class="bp-price-btn featured">Select</div>
              </div>
              <div class="bp-price-box">
                <div class="bp-price-name">Enterprise</div>
                <div class="bp-price-val">$99</div>
                <div class="bp-price-btn">Select</div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ ACCORDION BLOCK -->
        <div class="sketch-block ${state.enabledComponents.has('faq') ? 'active' : 'inactive'}" id="sketch-faq">
          <div class="block-label">
            <span class="block-name">COLLAPSIBLE FAQ ACCORDION</span>
            <label class="sketch-toggle">
              <input type="checkbox" data-comp="faq" class="sketch-comp-toggle" ${state.enabledComponents.has('faq') ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="blueprint-content faq-blueprint">
            <div class="bp-faq-row">Q: Dynamic accordion item 1 <span class="bp-faq-chevron">▼</span></div>
            <div class="bp-faq-row">Q: Dynamic accordion item 2 <span class="bp-faq-chevron">▼</span></div>
          </div>
        </div>

        <!-- CONTACT FORM BLOCK -->
        <div class="sketch-block ${state.enabledComponents.has('form') ? 'active' : 'inactive'}" id="sketch-form">
          <div class="block-label">
            <span class="block-name">CONTACT INQUIRY FORM</span>
            <label class="sketch-toggle">
              <input type="checkbox" data-comp="form" class="sketch-comp-toggle" ${state.enabledComponents.has('form') ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="blueprint-content form-blueprint">
            <div class="bp-form-field">Name Field (Text)</div>
            <div class="bp-form-field">Email Field (Email)</div>
            <div class="bp-form-field text-area">Message Content Box</div>
            <div class="bp-form-submit">Submit Inquiry</div>
          </div>
        </div>

        <!-- FOOTER BLOCK -->
        <div class="sketch-block active" id="sketch-footer">
          <div class="block-label">
            <span class="block-name">FOOTER SECTION</span>
          </div>
          <div class="blueprint-content footer-blueprint">
            <span>© 2026 ${industry} • All rights reserved • Powered by WebCraft AI</span>
          </div>
        </div>
      </div>
    </div>
  `;

  renderSketchNavbarLinks();
  renderSketchHeroButtons();
  renderSketchTableColumns();
  setupSketchInteractionListeners();
}

function renderSketchNavbarLinks() {
  const listEl = document.getElementById("sketch-links-list");
  if (!listEl) return;
  listEl.innerHTML = "";
  state.menuLinks.forEach((link, idx) => {
    const item = document.createElement("div");
    item.className = "bp-link-item";
    item.innerHTML = `${link} <span style="font-weight:bold;margin-left:0.15rem;opacity:0.6;">×</span>`;
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      state.menuLinks.splice(idx, 1);
      renderSketchNavbarLinks();
      renderMenuLinks();
      compileAndSavePrototype();
    });
    listEl.appendChild(item);
  });
}

function renderSketchHeroButtons() {
  const container = document.getElementById("bp-hero-buttons-container");
  if (!container) return;
  container.innerHTML = "";
  (state.heroCustomButtons || []).forEach((btn, idx) => {
    const item = document.createElement("div");
    item.className = "bp-btn-box custom-btn";
    item.innerHTML = `${btn} <span style="font-weight:bold;margin-left:0.25rem;opacity:0.6;">×</span>`;
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      state.heroCustomButtons.splice(idx, 1);
      renderSketchHeroButtons();
      compileAndSavePrototype();
    });
    container.appendChild(item);
  });
}

function renderSketchTableColumns() {
  const container = document.getElementById("sketch-table-headers");
  if (!container) return;
  container.innerHTML = "";
  
  if (!state.tableColumns || state.tableColumns.length === 0) {
    const tagsArr = Array.from(state.selectedTags);
    const industry = tagsArr.find(t => TAGS_DICTIONARY.industry.includes(t)) || "Landing Page";
    if (industry === "Fitness") {
      state.tableColumns = ["Class Name", "Instructor", "Time", "Intensity"];
    } else if (industry === "Restaurant") {
      state.tableColumns = ["Dish Name", "Category", "Preparation", "Price"];
    } else if (industry === "Portfolio") {
      state.tableColumns = ["Project Name", "Role", "Tech Stack", "Status"];
    } else if (industry === "E-Commerce") {
      state.tableColumns = ["Product Model", "SKU", "Stock", "Base Price"];
    } else {
      state.tableColumns = ["Service Node", "Location", "CPU Load", "Latency"];
    }
  }

  state.tableColumns.forEach(col => {
    const th = document.createElement("div");
    th.className = "bp-th";
    th.textContent = col;
    container.appendChild(th);
  });
}

function compileAndSavePrototype() {
  if (state.selectedTags.size > 0) {
    compilePrototypeCode();
    // If the code tab is active, we also need to refresh the text block
    if (state.activeTab === "code" || state.activeTab === "prototype") {
      renderActiveStudioTab();
    }
  }
}

function setupSketchInteractionListeners() {
  const stickyCheck = document.getElementById("sketch-nav-sticky");
  if (stickyCheck) {
    stickyCheck.addEventListener("change", (e) => {
      state.navSticky = e.target.checked;
      compileAndSavePrototype();
    });
  }

  const addLinkBtn = document.getElementById("sketch-add-link-btn");
  if (addLinkBtn) {
    addLinkBtn.addEventListener("click", () => {
      const name = prompt("Enter new navigation menu link name:");
      if (name && name.trim()) {
        const val = name.trim();
        if (state.menuLinks.includes(val)) {
          showToast("This menu link already exists!");
          return;
        }
        if (state.menuLinks.length >= 8) {
          showToast("Maximum of 8 menu buttons reached.");
          return;
        }
        state.menuLinks.push(val);
        renderSketchNavbarLinks();
        renderMenuLinks();
        compileAndSavePrototype();
        showToast(`Added navigation button: ${val}`);
      }
    });
  }

  const addHeroBtn = document.getElementById("sketch-add-hero-btn");
  if (addHeroBtn) {
    addHeroBtn.addEventListener("click", () => {
      const label = prompt("Enter label for custom Hero action button:");
      if (label && label.trim()) {
        if (!state.heroCustomButtons) state.heroCustomButtons = [];
        state.heroCustomButtons.push(label.trim());
        renderSketchHeroButtons();
        compileAndSavePrototype();
        showToast(`Added Custom Hero Button: ${label.trim()}`);
      }
    });
  }

  const tableColsBtn = document.getElementById("sketch-table-cols-btn");
  if (tableColsBtn) {
    tableColsBtn.addEventListener("click", () => {
      const currentCols = (state.tableColumns || []).join(", ");
      const nameStr = prompt("Enter column headers (comma separated, max 4 recommended):", currentCols);
      if (nameStr && nameStr.trim()) {
        state.tableColumns = nameStr.split(",").map(s => s.trim()).filter(s => s.length > 0);
        renderSketchTableColumns();
        compileAndSavePrototype();
        showToast("Updated table columns layout!");
      }
    });
  }

  document.querySelectorAll(".sketch-comp-toggle").forEach(toggle => {
    toggle.addEventListener("change", (e) => {
      const compKey = e.target.dataset.comp;
      const blockEl = document.getElementById(`sketch-${compKey}`);
      
      const sidebarCheckId = `comp-${compKey}`;
      const sidebarCheck = document.getElementById(sidebarCheckId);
      if (sidebarCheck) {
        sidebarCheck.checked = e.target.checked;
      }
      
      if (e.target.checked) {
        state.enabledComponents.add(compKey);
        if (blockEl) {
          blockEl.classList.remove("inactive");
          blockEl.classList.add("active");
        }
      } else {
        state.enabledComponents.delete(compKey);
        if (blockEl) {
          blockEl.classList.remove("active");
          blockEl.classList.add("inactive");
        }
      }
      compileAndSavePrototype();
    });
  });
}

// Load
window.addEventListener("DOMContentLoaded", init);
