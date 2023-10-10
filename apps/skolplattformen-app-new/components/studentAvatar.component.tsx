import {Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fontSize} from '../styles/typography';
import {initials} from '../utils/peopleHelpers';

export type StudentAvatarProps = {
  name?: string;
  color: string;
};

export const StudentAvatar = ({name, color}: StudentAvatarProps) => {
  const colors = useTheme();
  const bgColor = colors[`color-${color}-100`];
  const textColor = colors[`color-${color}-900`];

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={{...styles.text, color: textColor}}>{initials(name)}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...fontSize.lg,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
});
