import { useApi } from '@skolplattformen/api-hooks'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Linking, Modal, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { Layout, Sizing } from '../styles'
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

  const styles = useStyleSheet(themedStyles)

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={closeModal}>
              <BackIcon style={styles.backIcon} />
            </TouchableOpacity>
            <Text category="s1" style={styles.headerText} numberOfLines={1}>
              {title}
            </Text>
            <TouchableOpacity onPress={openInApp}>
              <ExternalLinkIcon style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {(headers || sharedCookiesEnabled) && (
          <WebView
            style={styles.webview}
            source={{ uri: url, headers }}
            sharedCookiesEnabled={sharedCookiesEnabled}
            thirdPartyCookiesEnabled={sharedCookiesEnabled}
            onLoad={(event) => {
              setTitle(event.nativeEvent.title)
            }}
          />
        )}
      </SafeAreaView>
    </Modal>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerWrapper: {
    marginTop: Sizing.t1,
    padding: Sizing.t1,
    borderRadius: 2,
    borderColor: 'basic-color-200',
    borderBottomWidth: 1,
    backgroundColor: 'background-basic-color-1',
  },
  backdrop: {
    backgroundColor: 'color-basic-transparent-600',
  },
  headerText: {
    overflow: 'hidden',
    width: '85%',
    paddingRight: 2,
  },
  header: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    paddingHorizontal: Sizing.t3,
    paddingVertical: Sizing.t1,
    backgroundColor: 'background-basic-color-1',
  },
  shareIcon: {
    width: 24,
    height: 24,
    color: 'text-basic-color',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: Sizing.t4,
    color: 'text-basic-color',
  },
  webview: {},
})
