import { NavigationProp } from '@react-navigation/core'
import { useApi, useChildList } from '@skolplattformen/api-hooks'
import { Child } from '@skolplattformen/embedded-api'
import {
  Divider,
  Layout,
  List,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import React from 'react'
import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import ActionSheet from 'rn-actionsheet-module'
import { ChildListItem } from './childListItem.component'
import { SettingsIcon } from './icon.component'
import { RootStackParamList } from './navigation.component'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ChildrenProps {
  navigation: NavigationProp<RootStackParamList, 'Children'>
}

const { width } = Dimensions.get('window')

const colors = ['primary', 'success', 'info', 'warning', 'danger']
const settingsOptions = ['Logga ut', 'Avbryt']

export const Children = ({ navigation }: ChildrenProps) => {
  const { api } = useApi()
  const { data: childList, status } = useChildList()

  const handleSettingSelection = (index: number) => {
    switch (index) {
      case 0:
        api.logout()
        AsyncStorage.clear()
    }
  }

  const settings = () => {
    const options = {
      cancelButtonIndex: 1,
      title: 'Inställningar',
      optionsIOS: settingsOptions,
      optionsAndroid: settingsOptions,
      onCancelAndroidIndex: handleSettingSelection,
    }

    ActionSheet(options, handleSettingSelection)
  }

  return (
    <SafeAreaView style={styles.topContainer}>
      {status === 'loaded' ? (
        <>
          <TopNavigation
            title="Dina barn"
            alignment="center"
            accessoryRight={() => (
              <TopNavigationAction icon={SettingsIcon} onPress={settings} />
            )}
          />
          <Divider />
          <List
            contentContainerStyle={styles.childListContainer}
            data={childList}
            style={styles.childList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text category="h2">Inga barn</Text>
                <Text style={styles.emptyStateDescription}>
                  Det finns inga barn registrerade för ditt personnummer i
                  Stockholms Stad
                </Text>
                <Image
                  source={require('../assets/children.png')}
                  style={styles.emptyStateImage}
                />
              </View>
            }
            renderItem={({ item: child, index }: ListRenderItemInfo<Child>) => (
              <ChildListItem
                child={child}
                color={colors[index % colors.length]}
                key={child.id}
                navigation={navigation}
              />
            )}
          />
        </>
      ) : (
        <Layout style={styles.loading}>
          <Image
            source={require('../assets/girls.png')}
            style={styles.loadingImage}
          />
          <View style={styles.loadingMessage}>
            <Spinner size="large" status="warning" />
            <Text category="h1" style={styles.loadingText}>
              Laddar...
            </Text>
          </View>
        </Layout>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    height: (width / 16) * 9,
    width: width,
  },
  loadingMessage: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  loadingText: {
    marginLeft: 20,
  },
  childList: {
    flex: 1,
  },
  childListContainer: {
    padding: 20,
  },
  emptyState: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateDescription: {
    lineHeight: 21,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyStateImage: {
    // 80% size and 16:9 aspect ratio
    height: ((width * 0.8) / 16) * 9,
    marginTop: 20,
    width: width * 0.8,
  },
})
