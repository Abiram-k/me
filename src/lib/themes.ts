export const themeIds = [
  'midnight',
  'cyberpunk',
  'ocean',
  'forest',
  'sunset',
  'rose',
  'light',
  'nordic',
  'cream',
  'sakura',
] as const;

export type ThemeId = (typeof themeIds)[number];

export function getRandomThemeId(): ThemeId {
  return themeIds[Math.floor(Math.random() * themeIds.length)];
}

export function getAppliedThemeId(): ThemeId {
  const match = document.documentElement.className.match(/theme-([\w-]+)/);
  if (match && themeIds.includes(match[1] as ThemeId)) {
    return match[1] as ThemeId;
  }
  return getRandomThemeId();
}

export function applyTheme(themeId: ThemeId) {
  const classes = document.documentElement.className
    .split(' ')
    .filter((c) => c && !c.startsWith('theme-'));
  classes.push(`theme-${themeId}`);
  document.documentElement.className = classes.join(' ').trim();
}
