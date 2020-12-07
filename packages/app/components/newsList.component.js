import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import Markdown from 'react-native-markdown-display';
 

export const NewsList = ({news: data}) => {

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps} style={styles.header}>
      <Text category='h6' style={styles.headerText}>
        {info.item.header}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>
      Publicerad i Skolplattformen
    </Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={footerProps => renderItemFooter(footerProps, info)}>
      <Markdown style={{
        body: {color: 'white', fontSize: 15},
        heading1: {color: 'white'},
      }}>
        {decodeURIComponent(info.item.body)}
      </Markdown>
    </Card>
  );

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#fff',
    minHeight: 30,
    padding: 3
  },
  headerText: {
    color: '#000'
  },
  container: {
    maxHeight: '100%'
  },
  contentContainer: {
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  footer: {
    backgroundColor: '#000',
  }
});