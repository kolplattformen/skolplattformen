import React, {FunctionComponent} from 'react';
import {ViewProps} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface TransitionViewPropsType extends ViewProps {
  animation?: string;
  duration?: number;
  index?: number;
}
const transitionDuration = 500;

export const TransitionView: FunctionComponent<TransitionViewPropsType> = ({
  index,
  children,
  ...rest
}) => {
  return (
    <Animatable.View
      animation="fadeIn"
      duration={transitionDuration}
      delay={index ? (index * transitionDuration) / 5 : 0}
      useNativeDriver
      {...rest}>
      {children}
    </Animatable.View>
  );
};
