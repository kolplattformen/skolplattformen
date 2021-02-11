import React from 'react'
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native'
import {
  Card,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import Markdown from 'react-native-markdown-display'
import { Image } from './image.component'

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

export const NewsItem = ({ navigation, route }) => {
  const { newsItem } = route.params

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const renderItemHeader = (headerProps, newsItem) => (
    <View {...headerProps}>
      <Text category="h3">{newsItem.header}</Text>
      <Image
        src={newsItem.fullImageUrl}
        style={styles.image}
      />
    </View>
  )

  const rules = {
    image: (
      node,
      children,
      parent,
      styles,
      allowedImageHandlers,
      defaultImageHandler,
    ) => {
      const { src } = node.attributes
      return (
        <Image
          key={src}
          src={`https://elevstockholm.sharepoint.com${src}`}
          style={{ width: '100%', minHeight: 300 }}
        />
      )
    },
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation
        title="Nyhet från Skolplattformen"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />

      <Layout style={styles.topContainer} level="1">
        <ScrollView>
          <Card
            style={styles.card}
            header={(headerProps) => renderItemHeader(headerProps, newsItem)}>
            <Markdown
              rules={rules}
              style={{
                body: { color: 'black', fontSize: 17, lineHeight: 23 },
                heading1: { color: 'black' },
              }}>
              {decodeURIComponent(newsItem.body)}
            </Markdown>
          </Card>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  image: {
    width: '100%',
    minHeight: 300,
  },
})
