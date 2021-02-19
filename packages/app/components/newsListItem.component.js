import { useNavigation } from '@react-navigation/native'
import { DateTime } from 'luxon'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useChild } from './childContext.component'
import { Image } from './image.component'

export const NewsListItem = ({ item }) => {
  const navigation = useNavigation()
  const child = useChild()

  const displayDate = DateTime.fromISO(
    item.published || item.modified
  ).toRelative({ locale: 'sv', style: 'long' })

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsItem', { newsItem: item, child })}
    >
      <View style={styles.card}>
        <Image src={item.fullImageUrl} style={styles.image} />
        <View style={styles.text}>
          <View>
            <Text style={styles.title}>{item.header}</Text>
            <Text style={styles.subtitle}>
              {item.author}
              {item.author && displayDate ? ' • ' : ''}
              {displayDate}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              category="s2"
              style={styles.intro}
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 2,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    padding: 20,
    marginBottom: 8,
  },
  text: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 8,
  },
  intro: {
    color: '#374151',
    fontSize: 14,
  },
  image: {
    borderRadius: 3,
    width: 80,
    height: 80,
    marginRight: 16,
  },
})
