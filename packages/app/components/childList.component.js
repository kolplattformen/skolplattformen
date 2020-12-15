import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, ViewPager, Button, Icon } from '@ui-kitten/components';
import { NewsList } from './newsList.component'
import { Calendar } from './calendar.component'
import { ChildTopNavigation } from './childTopNavigation.component';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const SelectCategory = ({child}) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <BottomNavigationTab title='Nyheter'/>
      <BottomNavigationTab title='Kalender'/>
      <BottomNavigationTab title='Klassen'/>
    </BottomNavigation>
  );
};
export const ChildList = ({children}) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {children.map(child => 
        <Layout
        key={child.id}
        style={{...styles.tab}}
        level='2'>
          <ChildTopNavigation child={child}></ChildTopNavigation>
          <SelectCategory>
          </SelectCategory>
          <NewsList news={child.news} />
          <Calendar calendar={[...child.calendar, ...child.schedule] }></Calendar>
        </Layout>
      )}
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  tab: {
    height: '100%',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});