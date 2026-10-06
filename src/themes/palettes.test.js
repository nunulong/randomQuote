import { generateRandomModernPalette, getRandomPalette, hslToHex, rgbToHex, hslToRgb } from './palettes';

describe('Procedural Modern Gradient & Palette Generator', () => {
  test('converts hsl to rgb and hex correctly', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000');
    expect(hslToHex(120, 100, 50)).toBe('#00ff00');
    expect(hslToHex(240, 100, 50)).toBe('#0000ff');
  });

  test('generates valid modern gradient and matching tokens', () => {
    const { palette, hue } = getRandomPalette();

    expect(palette).toBeDefined();
    expect(typeof palette.name).toBe('string');
    expect(typeof palette.hue).toBe('number');
    expect(palette.hue).toBeGreaterThanOrEqual(0);
    expect(palette.hue).toBeLessThan(360);

    // Gradient format: linear-gradient(135deg, #hex 0%, #hex 50%, #hex 100%)
    expect(palette.gradient).toMatch(/^linear-gradient\(135deg, #[0-9a-f]{6} 0%, #[0-9a-f]{6} 50%, #[0-9a-f]{6} 100%\)$/i);

    // Accent: valid 6-digit hex code
    expect(palette.accent).toMatch(/^#[0-9a-f]{6}$/i);

    // Accent hover: valid 6-digit hex code
    expect(palette.accentHover).toMatch(/^#[0-9a-f]{6}$/i);

    // Card glow: valid rgba format
    expect(palette.cardGlow).toMatch(/^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/);

    expect(palette.accentText).toBe('#ffffff');
  });

  test('generates varied colors across multiple iterations', () => {
    const hues = new Set();
    const gradients = new Set();
    let prevHue = -1;

    for (let i = 0; i < 30; i++) {
      const { palette, hue } = getRandomPalette(prevHue);
      hues.add(palette.hue);
      gradients.add(palette.gradient);

      // Verify that consecutive hues are not identical and have substantial shift
      if (prevHue !== -1) {
        let diff = Math.abs(hue - prevHue);
        if (diff > 180) diff = 360 - diff;
        expect(diff).toBeGreaterThanOrEqual(40);
      }
      prevHue = hue;
    }

    // Out of 30 generations, there should be a wide variety of unique hues and gradients
    expect(hues.size).toBeGreaterThan(15);
    expect(gradients.size).toBe(30);
  });
});
