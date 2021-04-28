import { ViewStyle } from 'react-native'

type MainAxis = 'center' | 'flexStart'
export const mainAxis: Record<MainAxis, ViewStyle> = {
  center: {
    alignItems: 'center',
  },
  flexStart: {
    alignItems: 'flex-start',
  },
}

type CrossAxis = 'center' | 'flexEnd' | 'evenly' | 'spaceBetween'
export const crossAxis: Record<CrossAxis, ViewStyle> = {
  center: {
    justifyContent: 'center',
  },
  evenly: {
    justifyContent: 'space-evenly',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
}

export const center: ViewStyle = {
  ...mainAxis.center,
  ...crossAxis.center,
}

type Flex = 'full' | 'row'
export const flex: Record<Flex, ViewStyle> = {
  full: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
}
