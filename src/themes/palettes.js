export const PALETTES = [
  {
    name: "Cosmic Indigo",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)",
    accent: "#6366f1",
    accentHover: "#4f46e5",
    accentText: "#ffffff",
    cardGlow: "rgba(99, 102, 241, 0.25)"
  },
  {
    name: "Sunset Ember",
    gradient: "linear-gradient(135deg, #f97316 0%, #e11d48 50%, #9333ea 100%)",
    accent: "#e11d48",
    accentHover: "#be123c",
    accentText: "#ffffff",
    cardGlow: "rgba(225, 29, 72, 0.25)"
  },
  {
    name: "Emerald Oasis",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)",
    accent: "#0d9488",
    accentHover: "#0f766e",
    accentText: "#ffffff",
    cardGlow: "rgba(13, 148, 136, 0.25)"
  },
  {
    name: "Ocean Azure",
    gradient: "linear-gradient(135deg, #2563eb 0%, #0284c7 50%, #06b6d4 100%)",
    accent: "#0284c7",
    accentHover: "#0369a1",
    accentText: "#ffffff",
    cardGlow: "rgba(2, 132, 199, 0.25)"
  },
  {
    name: "Velvet Midnight",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
    accent: "#8b5cf6",
    accentHover: "#7c3aed",
    accentText: "#ffffff",
    cardGlow: "rgba(139, 92, 246, 0.25)"
  },
  {
    name: "Rose Quartz",
    gradient: "linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb7185 100%)",
    accent: "#f43f5e",
    accentHover: "#e11d48",
    accentText: "#ffffff",
    cardGlow: "rgba(244, 63, 94, 0.25)"
  },
  {
    name: "Golden Amber",
    gradient: "linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)",
    accent: "#d97706",
    accentHover: "#b45309",
    accentText: "#ffffff",
    cardGlow: "rgba(217, 119, 6, 0.25)"
  },
  {
    name: "Cyber Neon",
    gradient: "linear-gradient(135deg, #0284c7 0%, #4f46e5 50%, #9333ea 100%)",
    accent: "#4f46e5",
    accentHover: "#4338ca",
    accentText: "#ffffff",
    cardGlow: "rgba(79, 70, 229, 0.25)"
  }
];

export const getRandomPalette = (currentIndex = -1) => {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * PALETTES.length);
  } while (nextIndex === currentIndex && PALETTES.length > 1);
  return { palette: PALETTES[nextIndex], index: nextIndex };
};
