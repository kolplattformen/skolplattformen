import {Dimensions, ImageStyle} from 'react-native';

const {height: screenHeight, width: screenWidth} = Dimensions.get('screen');
type Screen = 'width' | 'height';
export const screen: Record<Screen, number> = {
  width: screenWidth,
  height: screenHeight,
};

export enum Ratio {
  '4:3',
  '16:9',
}

export const aspectRatio = (
  modifier = 1,
  ratio: Ratio = Ratio['16:9'],
): ImageStyle => {
  switch (ratio) {
    case Ratio['16:9']:
      return {
        height: ((screen.width * modifier) / 16) * 9,
        width: screen.width * modifier,
      };
    case Ratio['4:3']:
      return {
        height: ((screen.width * modifier) / 4) * 3,
        width: screen.width * modifier,
      };
  }
};

type Layout = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
export const layout: Record<Layout, number> = {
  t1: 4,
  t2: 8,
  t3: 12,
  t4: 16,
  t5: 20,
  t6: 30,
};

/** 4px */
export const t1 = layout.t1;
/** 8px */
export const t2 = layout.t2;
/** 12px */
export const t3 = layout.t3;
/** 16px */
export const t4 = layout.t4;
/** 20px */
export const t5 = layout.t5;
/** 30px */
export const t6 = layout.t6;
