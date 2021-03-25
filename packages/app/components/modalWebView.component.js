import { useApi } from '@skolplattformen/api-hooks'
import { Text } from '@ui-kitten/components'
import URI from 'jsuri'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { CloseIcon } from './icon.component'

export const ModalWebView = ({ url, onClose }) => {
  const [modalVisible, setModalVisible] = React.useState(true)
  const { api } = useApi()
  const [headers, setHeaders] = useState()

  const getHeaders = async () => {
    const { headers: updatedHeaders } = await api.getSession(url)
    setHeaders(updatedHeaders)
  }

  useEffect(() => {
    getHeaders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const uri = new URI(url)

  const closeModal = () => {
    setModalVisible(false)
    onClose()
  }

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
            <Text category="s1">{uri.host()}</Text>
            <TouchableOpacity onPress={closeModal}>
              <CloseIcon style={styles.icon} fill="#333333" />
            </TouchableOpacity>
          </View>
        </View>
        {headers && (
          <WebView style={styles.webview} source={{ uri: url, headers }} />
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
    backgroundColor: '#333333',
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  webview: {},
})
