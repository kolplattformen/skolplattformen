import {StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {ViewProps} from 'react-native';
import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';
import {Layout} from '../styles';

export const SafeAreaView: React.FC<ViewProps> = ({children}) => {
  const styles = useStyleSheet(themedStyles);

  return <RNSafeAreaView style={styles.safeArea}>{children}</RNSafeAreaView>;
};

const themedStyles = StyleService.create({
  safeArea: {
    ...Layout.flex.full,
    backgroundColor: 'background-basic-color-2',
  },
});
