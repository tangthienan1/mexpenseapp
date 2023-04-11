import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const MCOLORS = {
    primary: '#24C16B', // green
    secondary: '#0C381F', // dark green

    green: '#66D59A',
    lightGreen: '#E6FEF0',

    lime: '#00BA63',
    emerald: '#2BC978',

    red: '#FF4134',
    lightRed: '#FFF1F0',

    purple: '#6B3CE9',
    lightpurple: '#F3EFFF',

    yellow: '#FFC664',
    lightyellow: '#FFF9EC',

    black: '#1E1F20',
    white: '#FFFFFF',

    lightGray: '#FCFBFC',
    gray: '#C1C3C5',
    darkgray: '#C3C6C7',

    blue: '#048DFF',

    transparent: 'transparent',
};
export const MSIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
};
export const MFONTS = {
    largeTitle: { fontFamily: 'Roboto-regular', fontSize: MSIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: 'Roboto-Black', fontSize: MSIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'Roboto-Bold', fontSize: MSIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'Roboto-Bold', fontSize: MSIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'Roboto-Bold', fontSize: MSIZES.h4, lineHeight: 22 },
    body1: { fontFamily: 'Roboto-Regular', fontSize: MSIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'Roboto-Regular', fontSize: MSIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'Roboto-Regular', fontSize: MSIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'Roboto-Regular', fontSize: MSIZES.body4, lineHeight: 22 },
    body5: { fontFamily: 'Roboto-Regular', fontSize: MSIZES.body5, lineHeight: 22 },
};

const appTheme = { MCOLORS, MSIZES, MFONTS };

export default appTheme;
