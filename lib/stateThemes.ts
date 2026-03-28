export type AccentTheme = {
  accentRgb: string;
  accentAltRgb: string;
  accentSoftRgb: string;
};

const DEFAULT_THEME: AccentTheme = {
  accentRgb: "96 165 250",
  accentAltRgb: "168 85 247",
  accentSoftRgb: "59 130 246",
};

const STATE_THEME_MAP: Record<string, AccentTheme> = {
  arizona: { accentRgb: "167 47 27", accentAltRgb: "251 146 60", accentSoftRgb: "245 158 11" },
  california: { accentRgb: "153 27 27", accentAltRgb: "202 138 4", accentSoftRgb: "234 179 8" },
  colorado: { accentRgb: "17 24 39", accentAltRgb: "202 138 4", accentSoftRgb: "245 158 11" },
  florida: { accentRgb: "37 99 235", accentAltRgb: "249 115 22", accentSoftRgb: "59 130 246" },
  georgia: { accentRgb: "185 28 28", accentAltRgb: "15 23 42", accentSoftRgb: "239 68 68" },
  illinois: { accentRgb: "30 64 175", accentAltRgb: "234 88 12", accentSoftRgb: "37 99 235" },
  massachusetts: { accentRgb: "134 25 143", accentAltRgb: "59 130 246", accentSoftRgb: "168 85 247" },
  michigan: { accentRgb: "29 78 216", accentAltRgb: "234 179 8", accentSoftRgb: "245 158 11" },
  "new-jersey": { accentRgb: "178 34 34", accentAltRgb: "245 158 11", accentSoftRgb: "239 68 68" },
  "new-york": { accentRgb: "30 41 59", accentAltRgb: "249 115 22", accentSoftRgb: "59 130 246" },
  "north-carolina": { accentRgb: "14 116 144", accentAltRgb: "75 85 99", accentSoftRgb: "56 189 248" },
  ohio: { accentRgb: "153 27 27", accentAltRgb: "55 65 81", accentSoftRgb: "239 68 68" },
  pennsylvania: { accentRgb: "67 56 202", accentAltRgb: "22 163 74", accentSoftRgb: "99 102 241" },
  texas: { accentRgb: "194 65 12", accentAltRgb: "245 245 220", accentSoftRgb: "251 146 60" },
  virginia: { accentRgb: "245 158 11", accentAltRgb: "30 64 175", accentSoftRgb: "249 115 22" },
  washington: { accentRgb: "79 70 229", accentAltRgb: "148 163 184", accentSoftRgb: "129 140 248" },
};

export function getThemeByStateSlug(slug?: string): AccentTheme {
  if (!slug) {
    return DEFAULT_THEME;
  }

  return STATE_THEME_MAP[slug] ?? DEFAULT_THEME;
}

export function themeToCssVars(theme: AccentTheme): Record<string, string> {
  return {
    "--accent-rgb": theme.accentRgb,
    "--accent-alt-rgb": theme.accentAltRgb,
    "--accent-soft-rgb": theme.accentSoftRgb,
  };
}
