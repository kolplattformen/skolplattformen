import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NewsItem } from '@skolplattformen/embedded-api'
import React from 'react'
import moment from 'moment'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors, Layout, Sizing, Typography } from '../styles'
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
  const navigation = useNavigation<NewsListItemNavigationProp>()
  const child = useChild()
  const hasDate = item.published || item.modified

  const displayDate = hasDate ? moment(hasDate).fromNow() : null

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsItem', { newsItem: item, child })}
    >
      <View style={styles.card}>
        {width > 320 && item.fullImageUrl ? (
          <Image src={item.fullImageUrl} style={styles.image} />
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
    backgroundColor: Colors.neutral.white,
    borderRadius: 2,
    borderColor: '#f0f0f0',
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
    color: '#6B7280',
    marginBottom: Sizing.t2,
  },
  intro: {
    ...Typography.fontSize.sm,
    color: '#374151',
  },
  image: {
    borderRadius: 3,
    width: 80,
    height: 80,
    marginRight: Sizing.t5,
  },
})
