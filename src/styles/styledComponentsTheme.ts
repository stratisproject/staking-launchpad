export const colors = {
  transparent: 'transparent',
  white: '#ffffff',
  gray: {
    lightest: '#fdfcfe',
    light: '#F0F4F8',
    medium: '#B6B6B6',
    dark: '#4A4A4A',
  },
  black: '#333333',
  blue: {
    lightest: '#D4D7E7',
    light: '#b0e2f5',
    medium: '#007FB0',
    dark: '#0F2A43',
  },
  green: {
    light: '#F8FAF9',
    medium: '#D0E1D5',
    dark: '#26AB83',
  },
  red: {
    lightest: '#fff0f2',
    light: '#FF9B9A',
    medium: '#912d2c',
  },
  orange: '#FFF9F2',
  purple: {
    light: '#F0F2FB',
    medium: '#E3E5F2',
    dark: '#795da3',
  },
  yellow: {
    light: '#fff0a8',
    dark: '#f0ad4d',
    darkest: '#8a6d3b',
  },
};

export const details = {
  borderRadius: '3px',
};

export const rainbowColors = [
  '#511885', // pink
  '#7c3a86', // red
  '#772b8d', // yellow
  '#59249c', // green
  '#2f1a45', // blue
  '#060619', // blurple
  '#500087', // purple //#511885,#7c3a86,#772b8d,#59249c,#2f1a45,#060619,#500087);
];

export const rainbowBGColors = [
  '#d3edf6', // pink
  '#d3edf6', // red
  '#d3edf6', // yellow
  '#d3edf6', // green
  '#d3edf6', // blue
  '#d3edf6', // blurple
  '#d3edf6', // purple
];

export const rainbowLightColors = [
  '#f1f7f9', // pink
  '#f1f7f9', // red
  '#f1f7f9', // yellow
  '#f1f7f9', // green
  '#f1f7f9', // blue
  '#f1f7f9', // blurple
  '#f1f7f9', // purple
];

// export const rainbowColors = [
//   '#fdccd3', // pink
//   '#fca09a', // red
//   '#ffcc9e', // yellow
//   '#98ddad', // green
//   '#81d7ec', // blue
//   '#91C1ED', // blurple
//   '#a0aaed', // purple
// ];

// export const rainbowBGColors = [
//   '#fdccd3', // pink
//   '#FED4D1', // red
//   '#fcead9', // yellow-orange
//   '#dcf0df', // green
//   '#d3edf6', // blue
//   '#baccf2', // blurple
//   '#a0aaed', // purple
// ];

// export const rainbowLightColors = [
//   '#fef2f4', // pink
//   '#fdf8f7', // red
//   '#FFF2E6', // yellow-orange
//   '#e5f6ea', // green
//   '#dff5fa', // blue
//   '#E3EFFA', // blurple
//   '#e7e9fa', // purple
// ];

export const rainbow = rainbowColors.join(', ');
export const rainbowLight = rainbowLightColors.join(', ');

export const screenSizes = {
  smaller: '420px',
  small: '576px',
  medium: '768px',
  large: '992px',
  larger: '1200px',
  largest: '1440px',
  huge: '1820px',
};

export const styledComponentsTheme = {
  ...colors,
  screenSizes,
  ...details,
  rainbow,
  rainbowLight,
  rainbowLightColors,
};
