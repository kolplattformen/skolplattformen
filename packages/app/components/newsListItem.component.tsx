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
  theme: Record<string,string>
}

type NewsListItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsItem'
>

const { width } = Dimensions.get('window')
export const NewsListItem = ({ item,theme }: NewsListItemProps) => {
  const navigation = useNavigation<NewsListItemNavigationProp>()
  const child = useChild()
  const hasDate = item.published || item.modified

  const displayDate = hasDate ? moment(hasDate).fromNow() : null

  const styles = StyleSheet.create({
    card: {
      ...Layout.flex.full,
      ...Layout.flex.row,
      backgroundColor: theme['background-basic-color-1'],
      borderRadius: 2,
      borderColor: theme['border-basic-color-3'],
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
      color: theme['text-basic-color']

    },
    subtitle: {
      ...Typography.fontSize.xs,
      color: theme['text-hint-color'],
      marginBottom: Sizing.t2,
    },
    intro: {
      ...Typography.fontSize.sm,
      color: theme['text-disabled-color'],
    },
    image: {
      borderRadius: 3,
      width: 80,
      height: 80,
      marginRight: Sizing.t5,
    },
  })
  



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
