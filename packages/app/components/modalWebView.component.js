import { useApi } from '@skolplattformen/api-hooks'
import { Icon, Text } from '@ui-kitten/components'
import URI from 'jsuri'
import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

export const ModalWebView = ({ url, onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { api } = useApi()
  const cookie = api.getSessionCookie()
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
      onRequestClose={closeModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text category="s1">{uri.host()}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Icon name="close-circle" style={styles.icon} fill="#333333" />
            </TouchableOpacity>
          </View>
        </View>

        <WebView
          style={styles.webview}
          source={{ uri: url, headers: { cookie } }}
        />
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
