import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getBuildNumber, getVersion} from 'react-native-device-info';

export const VersionInfo = () => {
  return (
    <View style={styles.container}>
      <Text>
        v{getVersion()} ({getBuildNumber()})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
