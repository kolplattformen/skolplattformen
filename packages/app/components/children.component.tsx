import AsyncStorage from '@react-native-async-storage/async-storage'
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
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ActionSheet from 'rn-actionsheet-module'
import { Colors, Layout as LayoutStyle, Sizing, Typography } from '../styles'
import { ChildListItem } from './childListItem.component'
import { SettingsIcon } from './icon.component'

const colors = ['primary', 'success', 'info', 'warning', 'danger']
const settingsOptions = ['Logga ut', 'Avbryt']

export const Children = () => {
  const { api } = useApi()
  const { data: childList, status } = useChildList()
  const insets = useSafeAreaInsets()

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

  // We need to skip safe area view here, due to the reason that it's adding a white border
  // when this view is actually grey
  return (
    <View
      style={{
        ...styles.topContainer,
        paddingTop: insets.top,
      }}
    >
      <>
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
              renderItem={({
                item: child,
                index,
              }: ListRenderItemInfo<Child>) => (
                <ChildListItem
                  child={child}
                  color={colors[index % colors.length]}
                  key={child.id}
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
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...LayoutStyle.flex.full,
    backgroundColor: Colors.neutral.white,
    paddingBottom: 0,
  },
  loading: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
  },
  loadingImage: {
    ...Sizing.aspectRatio(),
  },
  loadingMessage: {
    ...LayoutStyle.mainAxis.center,
    ...LayoutStyle.flex.row,
    marginTop: Sizing.t2,
  },
  loadingText: {
    marginLeft: Sizing.t5,
  },
  childList: {
    ...LayoutStyle.flex.full,
  },
  childListContainer: {
    padding: Sizing.t5,
  },
  emptyState: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Sizing.t5,
  },
  emptyStateDescription: {
    ...Typography.align.center,
    lineHeight: 21,
    marginTop: Sizing.t2,
  },
  emptyStateImage: {
    ...Sizing.aspectRatio(0.8),
    marginTop: Sizing.t5,
  },
})
