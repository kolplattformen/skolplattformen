import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NewsItem } from '@skolplattformen/embedded-api'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import moment from 'moment'
import React, { ReactNode } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import { Layout, Sizing, Typography } from '../styles'
import { useChild } from './childContext.component'
import { Image } from './image.component'
import { RootStackParamList } from './navigation.component'

interface NewsListItemProps {
  item: NewsItem
  children?: ReactNode
}

type NewsListItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsItem'
>

const { width } = Dimensions.get('window')

export const NewsListItem = ({ item, children }: NewsListItemProps) => {
  const styles = useStyleSheet(themedStyles)
  const navigation = useNavigation<NewsListItemNavigationProp>()
  const child = useChild()
  const hasDate = item.published || item.modified

  const displayDate = hasDate ? moment(hasDate).fromNow() : null

  return (
    <Pressable
      onPress={() => navigation.navigate('NewsItem', { newsItem: item, child })}
    >
      <View style={styles.card}>
        {width > 320 && item.fullImageUrl ? (
          <Image
            accessibilityIgnoresInvertColors={false}
            src={item.fullImageUrl}
            // @ts-expect-error Don't know why this linter breaks
            style={styles.image}
          />
        ) : null}
        <View style={styles.text}>
          <View>
            <Text style={styles.title}>{item.header}</Text>
            <Text style={styles.subtitle}>
              {item.author}
              {item.author && displayDate ? ' • ' : ''}
              {displayDate}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.intro}>
              {children ?? item.intro}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const themedStyles = StyleService.create({
  card: {
    ...Layout.flex.full,
    ...Layout.flex.row,
    borderRadius: 15,
    paddingVertical: Sizing.t4,
    paddingHorizontal: Sizing.t4,
    marginBottom: Sizing.t3,
    backgroundColor: 'background-basic-color-1',
  },
  text: {
    ...Layout.flex.full,
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
    color: 'text-basic-color',
  },
  subtitle: {
    ...Typography.fontSize.xs,
    marginBottom: Sizing.t2,
    color: 'text-hint-color',
  },
  intro: {
    ...Typography.fontSize.sm,
    color: 'text-basic-color',
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: Sizing.t3,
  },
})
