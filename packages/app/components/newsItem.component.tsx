import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNewsDetails } from '@skolplattformen/api-hooks'
import {
  Divider,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { BackIcon } from './icon.component'
import { Image } from './image.component'
import { Markdown } from './markdown.component'
import { RootStackParamList } from './navigation.component'

interface NewsItemProps {
  navigation: StackNavigationProp<RootStackParamList, 'NewsItem'>
  route: RouteProp<RootStackParamList, 'NewsItem'>
}

const displayDate = (date: string | undefined) =>
  moment(date).locale('sv').format('DD MMM. YYYY HH:mm')

const dateIsValid = (date: string | undefined) =>
  moment(date, moment.ISO_8601).isValid()

export const NewsItem = ({ navigation, route }: NewsItemProps) => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigation
        title="Nyhet från Skolplattformen"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />

      <ScrollView
        contentContainerStyle={styles.article}
        style={styles.scrollView}
      >
        <Text style={styles.title}>{newsItem.header}</Text>
        {dateIsValid(newsItem.published) && (
          <Text style={[styles.subtitle, styles.published]}>
            <Text style={styles.strong}>Publicerad:</Text>{' '}
            {displayDate(newsItem.published)}
          </Text>
        )}
        {dateIsValid(newsItem.modified) && (
          <Text style={styles.subtitle}>
            <Text style={styles.strong}>Uppdaterad:</Text>{' '}
            {displayDate(newsItem.modified)}
          </Text>
        )}
        <View style={styles.body}>
          <Markdown
            style={{
              body: { color: '#1F2937', fontSize: 16, lineHeight: 26 },
              heading1: { color: '#1F2937', fontSize: 20 },
              heading2: { color: '#1F2937', fontSize: 18 },
            }}
          >
            {data.body}
          </Markdown>
          {newsItem.fullImageUrl && (
            <Image src={newsItem.fullImageUrl} style={styles.image} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  article: {
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    minHeight: 300,
    marginTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 12,
  },
  strong: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
  },
  published: {
    marginBottom: 4,
  },
  body: {
    marginTop: 16,
  },
})
