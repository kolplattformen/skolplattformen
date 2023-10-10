import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout} from '../styles';
import {fontSize} from '../styles/typography';

interface NavigationTitleProps {
  title?: string;
  subtitle?: string;
}
/**
 * Navigation Title with a smaller subtitle.
 */
export const NavigationTitle = ({title, subtitle}: NavigationTitleProps) => {
  return (
    <View style={styles.container}>
      {title && (
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      )}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.center,
  },
  title: {
    ...fontSize.sm,
    fontWeight: '500',
  },
  subtitle: {...fontSize.xxs},
});
