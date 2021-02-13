const colors = {
  fontColor: '#484b4f',
  gray: '#484b4f',
  nightMode: '#31363e',
  white: '#fff',

  designernews: '#2d72d9',
  devto: '#0a0a0a',
  github: '#25292f',
  hackernews: '#fe6501',
  producthunt: '#da5430',
} as const;

const lightModeTheme = {
  breackpoints: {
    desktop: '1200px',
  },
  card: {
    header: {},
    body: {
      backgroundColor: colors.white,
      color: colors.fontColor,
    },
  },
  colors,
  designernews: {
    loadingColor: colors.designernews,
    titleBackgroundColor: colors.designernews,
    titleFontColor: colors.white,
  },
  devto: {
    titleBackgroundColor: colors.devto,
    loadingColor: colors.devto,
    titleFontColor: colors.white,
  },
  github: {
    loadingColor: colors.github,
    titleBackgroundColor: colors.github,
    titleFontColor: colors.white,
  },
  hackernews: {
    loadingColor: colors.hackernews,
    titleBackgroundColor: colors.hackernews,
    titleFontColor: colors.white,
  },
  producthunt: {
    loadingColor: colors.producthunt,
    titleBackgroundColor: colors.producthunt,
    titleFontColor: colors.white,
  },
} as const;

const nightModeTheme = {
  card: {
    header: {
      backgroundColor: colors.nightMode,
      color: colors.white,
    },
    body: {
      backgroundColor: colors.nightMode,
      color: '#c5c8ca',
    },
  },
  colors: {
    ...colors,
    fontColor: colors.white,
  },
  designernews: {
    loadingColor: colors.designernews,
    titleBackgroundColor: colors.nightMode,
    titleFontColor: colors.white,
  },
  devto: {
    titleBackgroundColor: colors.nightMode,
    loadingColor: colors.white,
    titleFontColor: colors.white,
  },
  github: {
    loadingColor: colors.white,
    titleBackgroundColor: colors.nightMode,
    titleFontColor: colors.white,
  },
  hackernews: {
    loadingColor: colors.hackernews,
    titleBackgroundColor: colors.nightMode,
    titleFontColor: colors.hackernews,
  },
  producthunt: {
    loadingColor: colors.producthunt,
    titleBackgroundColor: colors.nightMode,
    titleFontColor: colors.producthunt,
  },
} as const;

export { lightModeTheme as default, lightModeTheme, nightModeTheme };
