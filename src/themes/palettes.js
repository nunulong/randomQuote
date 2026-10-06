/**
 * Modern Procedural Gradient & Palette Generator
 * Dynamically generates infinite modern gradients without predefined lists.
 */

// Helper: Convert HSL to RGB
export const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4))
  ];
};

// Helper: Convert RGB to Hex
export const rgbToHex = (r, g, b) => {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

// Helper: Convert HSL to Hex
export const hslToHex = (h, s, l) => {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

// Helper: Get descriptive aesthetic name based on hue
const getHueDescriptor = (hue) => {
  const normHue = (hue % 360 + 360) % 360;
  if (normHue >= 345 || normHue < 15) return "Crimson";
  if (normHue < 40) return "Coral Sunset";
  if (normHue < 65) return "Amber Glow";
  if (normHue < 95) return "Chartreuse";
  if (normHue < 150) return "Emerald Oasis";
  if (normHue < 185) return "Teal Breeze";
  if (normHue < 215) return "Cyan Azure";
  if (normHue < 250) return "Deep Ocean";
  if (normHue < 280) return "Cosmic Indigo";
  if (normHue < 315) return "Royal Violet";
  return "Fuchsia Dream";
};

const STYLE_NAMES = ["Radiance", "Aurora", "Pulse", "Flow", "Velvet", "Mirage", "Zenith", "Horizon"];

/**
 * Calculates harmonious 3-stop hues across the color wheel.
 * Avoids muddy olive/brown interpolation and ensures designer-grade color harmony.
 */
const getHarmoniousHues = (baseHue) => {
  const h = (baseHue % 360 + 360) % 360;
  let d1, d2;

  if (h >= 340 || h < 45) {
    // Red / Coral / Amber sector
    // 70% flow into rose / fuchsia / violet, 30% along warm amber / sunset
    if (Math.random() < 0.7) {
      d1 = -(25 + Math.random() * 20);
      d2 = -(55 + Math.random() * 30);
    } else {
      d1 = 18 + Math.random() * 15;
      d2 = 38 + Math.random() * 20;
    }
  } else if (h >= 45 && h < 95) {
    // Golden / Lime sector
    if (Math.random() < 0.5) {
      // Flow into warm sunset (gold -> amber -> coral)
      d1 = -(22 + Math.random() * 15);
      d2 = -(48 + Math.random() * 20);
    } else {
      // Flow into emerald oasis (gold -> emerald -> ocean)
      d1 = 35 + Math.random() * 25;
      d2 = 75 + Math.random() * 35;
    }
  } else if (h >= 95 && h < 185) {
    // Emerald / Mint / Teal sector
    // Flow into cyan -> ocean blue -> indigo
    const dir = Math.random() < 0.8 ? 1 : -1;
    d1 = dir * (25 + Math.random() * 20);
    d2 = dir * (55 + Math.random() * 30);
  } else if (h >= 185 && h < 265) {
    // Ocean / Sapphire / Indigo sector
    // 65% flow to purple / magenta, 35% flow to teal / cyan
    if (Math.random() < 0.65) {
      d1 = 25 + Math.random() * 20;
      d2 = 55 + Math.random() * 35;
    } else {
      d1 = -(25 + Math.random() * 20);
      d2 = -(50 + Math.random() * 25);
    }
  } else {
    // 265 - 340: Violet / Magenta sector
    // Flow into royal blue OR sunset coral
    if (Math.random() < 0.5) {
      d1 = 25 + Math.random() * 25;
      d2 = 55 + Math.random() * 35;
    } else {
      d1 = -(25 + Math.random() * 20);
      d2 = -(50 + Math.random() * 25);
    }
  }

  const h1 = h;
  const h2 = (h + d1 + 720) % 360;
  const h3 = (h + d2 + 720) % 360;
  return [Math.round(h1), Math.round(h2), Math.round(h3)];
};

/**
 * Procedurally generates a modern gradient palette.
 * Unconstrained random base hue with modern color harmonies.
 * Produces smooth 3-stop linear-gradient(135deg, ...) with matching UI accent colors.
 */
export const generateRandomModernPalette = (lastHue = null) => {
  // Generate a random base hue [0, 360) ensuring noticeable shift from previous
  let baseHue = Math.floor(Math.random() * 360);
  if (lastHue !== null && !isNaN(lastHue)) {
    let diff = Math.abs(baseHue - lastHue);
    if (diff > 180) diff = 360 - diff;
    if (diff < 45) {
      baseHue = (lastHue + 60 + Math.floor(Math.random() * 240)) % 360;
    }
  }

  const [h1, h2, h3] = getHarmoniousHues(baseHue);

  // Modern saturation & lightness curve
  // Stop 1: deeper rich base
  // Stop 2: vibrant midtone bridge
  // Stop 3: luminous aesthetic accent
  let s1 = 76 + Math.floor(Math.random() * 12);
  let s2 = 80 + Math.floor(Math.random() * 12);
  let s3 = 82 + Math.floor(Math.random() * 12);

  let l1 = 36 + Math.floor(Math.random() * 8);
  let l2 = 44 + Math.floor(Math.random() * 8);
  let l3 = 50 + Math.floor(Math.random() * 10);

  // Tone adjustment for yellow/chartreuse hues to maintain luxury feel
  [h1, h2, h3].forEach((h, idx) => {
    if (h >= 45 && h <= 80) {
      if (idx === 0) l1 = Math.max(l1, 38);
      if (idx === 1) l2 = Math.max(l2, 45);
      if (idx === 2) l3 = Math.max(l3, 50);
    }
  });

  const color1 = hslToHex(h1, s1, l1);
  const color2 = hslToHex(h2, s2, l2);
  const color3 = hslToHex(h3, s3, l3);

  // Continuous 135deg linear gradient
  const gradient = `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;

  // UI Accent color: derived from midtone or prominent stop with strong contrast on white card
  const accentHue = h2;
  const accentSat = Math.min(s2 + 6, 90);
  const accentLight = 44; // ideal readability and contrast against white surfaces
  const accent = hslToHex(accentHue, accentSat, accentLight);
  const accentHover = hslToHex(accentHue, accentSat, 36);

  const [rgbR, rgbG, rgbB] = hslToRgb(accentHue, accentSat, accentLight);
  const cardGlow = `rgba(${rgbR}, ${rgbG}, ${rgbB}, 0.28)`;

  const styleDescriptor = STYLE_NAMES[Math.floor(Math.random() * STYLE_NAMES.length)];
  const name = `${getHueDescriptor(baseHue)} ${styleDescriptor}`;

  return {
    palette: {
      name,
      gradient,
      accent,
      accentHover,
      accentText: "#ffffff",
      cardGlow,
      hue: baseHue
    },
    index: baseHue,
    hue: baseHue
  };
};

// Backward compatibility: keep PALETTES export for initial fallback
export const PALETTES = [
  generateRandomModernPalette().palette,
  generateRandomModernPalette().palette,
  generateRandomModernPalette().palette,
  generateRandomModernPalette().palette
];

// Main export used by Quotes component
export const getRandomPalette = (currentIndexOrHue = -1) => {
  return generateRandomModernPalette(currentIndexOrHue);
};
