import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NewsItem } from '@skolplattformen/embedded-api'
import React from 'react'
import moment from 'moment'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Layout, Sizing, Typography } from '../styles'
import { useChild } from './childContext.component'
import { Image } from './image.component'
import { RootStackParamList } from './navigation.component'
import { useTheme } from '@ui-kitten/components'

interface NewsListItemProps {
  item: NewsItem
}

type NewsListItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsItem'
>

const { width } = Dimensions.get('window')
export const NewsListItem = ({ item }: NewsListItemProps) => {
  const theme = useTheme()
  const navigation = useNavigation<NewsListItemNavigationProp>()
  const child = useChild()
  const hasDate = item.published || item.modified

  const displayDate = hasDate ? moment(hasDate).fromNow() : null

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsItem', { newsItem: item, child })}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme['background-basic-color-1'],
            borderColor: theme['border-basic-color-3'],
          },
        ]}
      >
        {width > 320 && item.fullImageUrl ? (
          <Image src={item.fullImageUrl} style={styles.image} />
        ) : null}
        <View style={styles.text}>
          <View>
            <Text style={[styles.title, { color: theme['text-basic-color'] }]}>
              {item.header}
            </Text>
            <Text
              style={[styles.subtitle, { color: theme['text-hint-color'] }]}
            >
              {item.author}
              {item.author && displayDate ? ' • ' : ''}
              {displayDate}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={[styles.intro, { color: theme['text-disabled-color'] }]}
            >
              {item.intro}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    ...Layout.flex.full,
    ...Layout.flex.row,

    borderRadius: 2,

    borderWidth: 1,
    padding: Sizing.t5,
    marginBottom: Sizing.t2,
  },
  text: {
    ...Layout.flex.full,
  },
  title: {
    ...Typography.fontWeight.bold,
    ...Typography.fontSize.lg,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.fontSize.xs,

    marginBottom: Sizing.t2,
  },
  intro: {
    ...Typography.fontSize.sm,
  },
  image: {
    borderRadius: 3,
    width: 80,
    height: 80,
    marginRight: Sizing.t5,
  },
})
