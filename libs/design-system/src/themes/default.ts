import { createTheme } from '@shopify/restyle'

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#fff',
  hint: '#B3BBCB',
  hint2: '#4B5466',
  basic2: '#F2F1F6',
  basic1d: '#0F1117',
  basic2d: '#030200',
}

export const defaultThemeLight = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.basic2,
    text: palette.black,
    textHint: palette.hint2,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  cardVariants: {
    defaults: {
      borderRadius: 15,
      paddingVertical: 'm',
      paddingHorizontal: 'm',
      backgroundColor: 'cardPrimaryBackground',
    },
    large: {},
  },
  textVariants: {
    defaults: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    listItemTitle: {
      fontFamily: 'Poppins-Bold',
      fontWeight: 'bold',
      color: 'text',
    },
    listItemSubTitle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color: 'textHint',
    },
  },
})

export const defaultThemeDark = createTheme<typeof defaultThemeLight>({
  ...defaultThemeLight,
  colors: {
    mainBackground: palette.basic2d,
    cardPrimaryBackground: palette.basic1d,
    text: palette.white,
    textHint: palette.hint,
  },
})

export type Theme = typeof defaultThemeLight
