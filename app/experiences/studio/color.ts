export type Hsva = { h: number; s: number; v: number; a: number };
export type Rgb = { r: number; g: number; b: number };

export const hsvToRgb = ({ h, s, v }: Hsva): Rgb => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
  };
  return { r: f(5), g: f(3), b: f(1) };
};

export const rgbToHsv = ({ r, g, b }: Rgb, a = 1): Hsva => {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const d = max - Math.min(rn, gn, bn);
  let h = 0;
  if (d) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
  }
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max, a };
};

export const rgbToHex = ({ r, g, b }: Rgb) => `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`;

export const hexToRgb = (hex: string): Rgb | null => {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const full = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1];
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

export const hsvaToHex = (c: Hsva) => rgbToHex(hsvToRgb(c));

export const hsvaToCss = (c: Hsva) => {
  const { r, g, b } = hsvToRgb(c);
  return `rgb(${r} ${g} ${b} / ${c.a})`;
};
