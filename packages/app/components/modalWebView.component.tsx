import { useApi } from '@skolplattformen/api-hooks'
import { Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import {
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  SyntheticEvent,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { BackIcon, ExternalLinkIcon } from './icon.component'

interface ModalWebViewProps {
  url: string
  sharedCookiesEnabled: boolean
  onClose: () => void
}
export const ModalWebView = ({
  url,
  onClose,
  sharedCookiesEnabled,
}: ModalWebViewProps) => {
  const theme = useTheme()

  const [modalVisible, setModalVisible] = React.useState(true)
  const { api } = useApi()
  const [title, setTitle] = React.useState('...')
  const [headers, setHeaders] = useState()

  useEffect(() => {
    const getHeaders = async (urlToGetSessionFor: string) => {
      if (sharedCookiesEnabled) return
      const { headers: newHeaders } = await api.getSession(urlToGetSessionFor)
      setHeaders(newHeaders)
    }

    getHeaders(url)
  }, [url, sharedCookiesEnabled, api])

  const closeModal = () => {
    setModalVisible(false)
    onClose()
  }
  const openInApp = () => {
    Linking.openURL(url)
  }
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme['background-basic-color-1'] },
        ]}
      >
        <View
          style={[
            styles.headerWrapper,
            { backgroundColor: theme['background-basic-color-1'] },
          ]}
        >
          <View
            style={[
              styles.header,
              { backgroundColor: theme['background-basic-color-1'] },
            ]}
          >
            <TouchableOpacity onPress={closeModal}>
              <BackIcon
                style={styles.backIcon}
                fill={theme['text-basic-color']}
              />
            </TouchableOpacity>
            <Text category="s1" style={styles.headerText} numberOfLines={1}>
              {title}
            </Text>
            <TouchableOpacity onPress={openInApp}>
              <ExternalLinkIcon
                style={styles.shareIcon}
                fill={theme['text-basic-color']}
              />
            </TouchableOpacity>
          </View>
        </View>
        {(headers || sharedCookiesEnabled) && (
          <WebView
            style={styles.webview}
            source={{ uri: url, headers }}
            sharedCookiesEnabled={sharedCookiesEnabled}
            thirdPartyCookiesEnabled={sharedCookiesEnabled}
            onLoad={(event: SyntheticEvent) => {
              setTitle(event.nativeEvent.title)
            }}
          />
        )}
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    marginTop: 5,
    padding: 5,
    borderRadius: 2,
    borderColor: '#6B7280',
    borderBottomWidth: 1,
  },
  headerText: {
    overflow: 'hidden',
    width: '85%',
    paddingRight: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  webview: {},
})
