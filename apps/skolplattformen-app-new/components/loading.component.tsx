import {StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const LoadingComponent = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'background-basic-color-2',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
