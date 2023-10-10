import {RouteProp, useRoute} from '@react-navigation/native';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Linking, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Layout, Sizing, Typography} from '../styles';
import {fontSize} from '../styles/typography';
import {RootStackParamList} from './navigation.component';

type LibraryRouteProp = RouteProp<RootStackParamList, 'Library'>;

export const libraryRouteOptions = (): NativeStackNavigationOptions => {
  return {
    title: '',
    headerLargeTitle: false,
  };
};

export const LibraryScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<LibraryRouteProp>();
  const library = route.params.library;

  return (
    <ScrollView
      contentContainerStyle={styles.article}
      style={styles.scrollView}>
      <Text style={styles.title}>
        {library.libraryName}
        <Text style={styles.version}> (v{library.version})</Text>
      </Text>
      {library._description && (
        <Text style={styles.description}>{library._description}</Text>
      )}
      <Text style={styles.license}>
        {library._licenseContent ?? library._license?.toString()}
      </Text>
      {library.homepage && (
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(library.homepage ?? '')}>
          {library.homepage}
        </Text>
      )}
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  title: {
    ...Typography.fontWeight.bold,
    fontSize: 30,
    marginBottom: Sizing.t4,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: '700',
  },
  version: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    ...fontSize.lg,
    fontWeight: '700',
    color: 'text-hint-color',
  },
  link: {
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textDecorationColor: 'text-hint-color',
    textDecorationLine: 'underline',
  },
  description: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: '700',
    marginBottom: Sizing.t4,
  },
  license: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: Sizing.t4,
  },
  article: {
    padding: Sizing.t5,
  },
  scrollView: {
    ...Layout.flex.full,
  },
});
