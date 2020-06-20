const colors = {
  fontColor: '#484b4f',
  gray: '#484b4f',
  nightMode: '#31363e',
  white: '#fff',

  designernews: '#2d72d9',
  github: '#25292f',
  hackernews: '#fe6501',
  producthunt: '#da5430',
};

export default {
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
};

export const nightModeTheme = {
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
};
