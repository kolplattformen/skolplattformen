import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import CalendarStrip from 'react-native-calendar-strip';

export const Calendar = ({calendar}) => {
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{height:150, paddingTop: 20, paddingBottom: 10}}
        calendarColor={'#3343CE'}
        calendarHeaderStyle={{color: 'white'}}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        iconContainer={{flex: 0.1}}
      />
  </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, height: 100 }
});