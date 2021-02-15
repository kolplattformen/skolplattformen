import { useNewsDetails } from '@skolplattformen/api-hooks'
import {
  Card,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { DateTime } from 'luxon'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Image } from './image.component'
import { Markdown } from './markdown.component'

const displayDate = (date) =>
  DateTime.fromISO(date).setLocale('sv').toLocaleString(DateTime.DATETIME_MED)

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

export const NewsItem = ({ navigation, route }) => {
  const { newsItem, child } = route.params
  const { data } = useNewsDetails(child, newsItem)

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const renderItemHeader = (headerProps) => (
    <View {...headerProps}>
      <Text category="h3">{newsItem.header}</Text>
      <Image src={newsItem.fullImageUrl} style={styles.image} />
      <Text category="s1" appearance="hint">
        {newsItem.published
          ? `Publicerad: ${displayDate(newsItem.published)}`
          : ''}
      </Text>
      <Text category="s1" appearance="hint">
        {newsItem.modified
          ? `Uppdaterad: ${displayDate(newsItem.modified)}`
          : ''}
      </Text>
    </View>
  )

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
            header={(headerProps) => renderItemHeader(headerProps, data)}
          >
            <Markdown
              style={{
                body: { color: 'black', fontSize: 17, lineHeight: 23 },
                heading1: { color: 'black' },
              }}
            >
              {data.body}
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
    marginBottom: 50,
  },
  image: {
    width: '100%',
    minHeight: 300,
    marginBottom: 5,
  },
})
