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
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Image } from './image.component'
import { Markdown } from './markdown.component'
import moment from 'moment'
import 'moment/locale/sv'

const displayDate = (date) =>
  moment(date).locale('sv').format('DD MMM. YYYY HH:mm')

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

export const NewsItem = ({ navigation, route }) => {
  const { newsItem, child } = route.params
  const { data } = useNewsDetails(child, newsItem)

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction
      accessibilityLabel="Tillbaka till barn"
      icon={BackIcon}
      onPress={navigateBack}
    />
  )

  const publishedAt = displayDate(newsItem.published)
  const modifiedAt = displayDate(newsItem.modified)

  const renderItemHeader = (headerProps) => (
    <View {...headerProps}>
      <Text category="h3">{newsItem.header}</Text>
      <Image src={newsItem.fullImageUrl} style={styles.image} />
      {publishedAt !== 'Invalid DateTime' && (
        <Text category="s1" appearance="hint">
          Publicerad: {publishedAt}
        </Text>
      )}
      {modifiedAt !== 'Invalid DateTime' && (
        <Text category="s1" appearance="hint">
          Uppdaterad: {modifiedAt}
        </Text>
      )}
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
