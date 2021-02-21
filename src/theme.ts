const colors = {
  black: '#171d2b',
  white: '#fff',
  fontColor: '#fff',
  fontColorWhite: 'rgba(255, 255, 255, 0.85)',
  lighterBlue: '#bbd1ea',
  lightBlue: '#68bff4',
  darkBlue: '#252638',
  lightGray: '#dae3e5',
  primary: '#0079df',
  secondary: '#a1c6ea',
} as const;

const theme = {
  ...colors,
  home: {
    title: {
      color: colors.white,
      backgroundColor: '#464656',
    },
  },
} as const;

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // eslint-disable-line
}

export default theme;
