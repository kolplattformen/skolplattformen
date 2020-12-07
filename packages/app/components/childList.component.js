import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, ViewPager, Button, Icon } from '@ui-kitten/components';
import { NewsList } from './newsList.component'
import { Calendar } from './calendar.component'

export const ChildList = ({children}) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const renderShakeIcon = (props) => (
    <Icon
      {...props}
      animation='shake'
      name='shake'
    />
  )

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {children.map(child => 
        <Layout
        key={child.id}
        style={{...styles.tab}}
        level='2'>
          <Text category='h5'>{ child.name}</Text>
          <Button
            appearance='ghost'
            style={styles.button}
            accessoryRight={renderShakeIcon}>
            Sjukanmälan
          </Button>
          <NewsList news={child.news} />
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
  button: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "#FEF2DC"
  }
});