import { Notification as NotificationType } from '@skolplattformen/api'
import { useNews } from '@skolplattformen/hooks'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Layout, Sizing, Typography } from '../styles'
import { useChild } from './childContext.component'
import { ModalWebView } from './modalWebView.component'
import { RootStackParamList } from './navigation.component'

interface NotificationProps {
  item: NotificationType
}

// Infomentor-notiser har relativa hub-länkar t.ex.
// '/#/communication/news/2106074' (nyhet) eller '/#/calendarv2/...' händelser
const hubNewsId = (url?: string): string | null => {
  if (!url) return null
  const match = url.match(/\/communication\/news\/(\d+)/)
  return match ? match[1] : null
}

export const Notification = ({ item }: NotificationProps) => {
  const styles = useStyleSheet(themedStyles)
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const child = useChild()
  const { data: news } = useNews(child)

  const date = item.dateModified || item.dateCreated
  const displayDate = date ? moment(date).fromNow() : null

  const isHubUrl = Boolean(item.url?.startsWith('https://hub.infomentor.se'))
  const sharedCookiesEnabled = Boolean(
    item.url &&
      (item.url.startsWith('https://start.unikum.net/') ||
        item.url.startsWith('https://hjarntorget.goteborg.se'))
  )

  // Tap för infomentor: nyhetsnotiser öppnas in-app (NewsItem-vyn). Övriga
  // hub-länkar (kalender/frånvaro) har inget motsvarande in-app-view än och
  // en WebView utan webb-session ger bara en vit sida -> gör ingenting (än).
  const onPress = () => {
    const newsId = hubNewsId(item.url)
    if (newsId) {
      const newsItem = news?.find((n) => String(n.id) === newsId)
      if (newsItem && child) {
        navigation.navigate('NewsItem', { newsItem, child })
        return
      }
    }
    if (isHubUrl) {
      return // öppna ej vit WebView
    }
    open()
  }

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.sender}</Text>
            <Text style={styles.subtitle}>
              {item.category ? item.category : ''}
              {item.category && displayDate ? ' • ' : ''}
              {displayDate ? displayDate : ''}
            </Text>
          </View>
          <Text>{item.message}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <ModalWebView
          url={item.url}
          onClose={close}
          sharedCookiesEnabled={sharedCookiesEnabled}
        />
      )}
    </>
  )
}

const themedStyles = StyleService.create({
  card: {
    ...Layout.flex.full,
    borderRadius: 15,
    paddingVertical: Sizing.t4,
    paddingHorizontal: Sizing.t4,
    marginBottom: Sizing.t3,
    backgroundColor: 'background-basic-color-1',
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: 'text-hint-color',
    marginBottom: Sizing.t2,
  },
})
