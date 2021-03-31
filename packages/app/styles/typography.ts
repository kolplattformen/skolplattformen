import { TextStyle } from 'react-native'
import { systemWeights } from 'react-native-typography'

type FontSize = 'xs' | 'sm' | 'base' | 'lg'
export const fontSize: Record<FontSize, TextStyle> = {
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 14,
  },
  base: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
}

type FontWeight = 'regular' | 'semibold' | 'bold'
export const fontWeight: Record<FontWeight, TextStyle> = {
  regular: {
    ...systemWeights.regular,
  },
  semibold: {
    ...systemWeights.semibold,
  },
  bold: {
    ...systemWeights.bold,
  },
}

export const header: TextStyle = {
  ...fontSize.lg,
  ...fontWeight.bold,
}

type Align = 'center'
export const align: Record<Align, TextStyle> = {
  center: {
    textAlign: 'center',
  },
}
