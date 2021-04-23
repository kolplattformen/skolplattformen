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
import { Colors, Layout, Sizing, Typography } from '../styles'
import { translate } from '../utils/translation'
import { BackIcon } from './icon.component'
import { Image } from './image.component'
import { Markdown } from './markdown.component'
import { RootStackParamList } from './navigation.component'
import { SafeAreaViewContainer } from './safeAreaViewContainer.component'

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
      accessibilityLabel={translate('news.backToChild')}
      icon={BackIcon}
      onPress={navigateBack}
    />
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <SafeAreaViewContainer>
        <TopNavigation
          title={translate('news.title')}
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
              <Text style={styles.strong}>{translate('news.published')}:</Text>{' '}
              {displayDate(newsItem.published)}
            </Text>
          )}
          {dateIsValid(newsItem.modified) && (
            <Text style={styles.subtitle}>
              <Text style={styles.strong}>{translate('news.updated')}:</Text>{' '}
              {displayDate(newsItem.modified)}
            </Text>
          )}
          <View style={styles.body}>
            <Markdown
              style={{
                body: {
                  ...Typography.fontSize.base,
                  color: Colors.neutral.gray800,
                  lineHeight: 26,
                },
                heading1: {
                  ...Typography.fontSize.xl,
                  color: Colors.neutral.gray800,
                },
                heading2: {
                  ...Typography.fontSize.lg,
                  color: Colors.neutral.gray800,
                },
              }}
            >
              {data.body}
            </Markdown>
            {newsItem.fullImageUrl && (
              <Image src={newsItem.fullImageUrl} style={styles.image} />
            )}
          </View>
        </ScrollView>
      </SafeAreaViewContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    ...Layout.flex.full,
    backgroundColor: Colors.neutral.white,
  },
  topContainer: {
    ...Layout.flex.row,
    ...Layout.crossAxis.spaceBetween,
  },
  article: {
    padding: Sizing.t5,
  },
  scrollView: {
    ...Layout.flex.full,
  },
  image: {
    width: '100%',
    minHeight: 300,
    marginTop: Sizing.t4,
  },
  title: {
    ...Typography.fontWeight.bold,
    fontSize: 30,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: Colors.neutral.gray600,
  },
  strong: {
    ...Typography.fontSize.xs,
    ...Typography.fontWeight.bold,
    color: Colors.neutral.gray600,
  },
  published: {
    marginBottom: Sizing.t1,
  },
  body: {
    marginTop: Sizing.t4,
  },
})
