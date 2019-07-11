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
};

const theme = {
  ...colors,
  home: {
    title: {
      color: colors.white,
      backgroundColor: '#464656',
    },
  },
};

export default theme;
