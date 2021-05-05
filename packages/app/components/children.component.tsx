import AsyncStorage from '@react-native-async-storage/async-storage'

import { useApi, useChildList } from '@skolplattformen/api-hooks'
import { Child } from '@skolplattformen/embedded-api'
import {
  Button,
  Divider,
  Layout,
  List,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components'
import React from 'react'
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Linking,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ActionSheet from 'rn-actionsheet-module'
import { Colors, Layout as LayoutStyle, Sizing, Typography } from '../styles'
import { translate } from '../utils/translation'
import { ChildListItem } from './childListItem.component'
import { SettingsIcon } from './icon.component'

const colors = ['primary', 'success', 'info', 'warning', 'danger']

export const Children = () => {
  const settingsOptions = [
    translate('general.logout'),
    translate('general.abort'),
  ]
  const theme = useTheme()

  const { api } = useApi()
  const { data: childList, status, reload } = useChildList()
  const insets = useSafeAreaInsets()
  const handleSettingSelection = (index: number) => {
    switch (index) {
      case 0:
        logout()
        break
    }
  }

  const settings = () => {
    const options = {
      cancelButtonIndex: 1,
      title: translate('general.settings'),
      optionsIOS: settingsOptions,
      optionsAndroid: settingsOptions,
      onCancelAndroidIndex: handleSettingSelection,
    }

    ActionSheet(options, handleSettingSelection)
  }

  const reloadChildren = () => {
    reload()
  }

  const logout = () => {
    api.logout()
    AsyncStorage.clear()
  }

  // We need to skip safe area view here, due to the reason that it's adding a white border
  // when this view is actually lightgrey. Taking the padding top value from the use inset hook.
  return (
    <View
      style={[
        {
          ...styles.topContainer,
          paddingTop: insets.top,
        },
        { backgroundColor: theme['background-basic-color-1'] },
      ]}
    >
      <>
        {status === 'loaded' ? (
          <>
            <TopNavigation
              title={() => (
                <Text maxFontSizeMultiplier={2.5}>
                  {translate('children.title')}
                </Text>
              )}
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
                  <Text category="h2">
                    {translate('children.noKids_title')}
                  </Text>
                  <Text style={styles.emptyStateDescription}>
                    {translate('children.noKids_description')}
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
            {status === 'error' ? (
              <View style={styles.errorMessage}>
                <Text category="h5">
                  {translate('children.loadingErrorHeading')}
                </Text>
                <Text style={{ fontSize: Sizing.t5 }}>
                  {translate('children.loadingErrorInformationText')}
                </Text>
                <View style={styles.errorButtons}>
                  <Button status="success" onPress={() => reloadChildren()}>
                    {translate('children.tryAgain')}
                  </Button>
                  <Button
                    status="basic"
                    onPress={() =>
                      Linking.openURL('https://skolplattformen.org/status')
                    }
                  >
                    {translate('children.viewStatus')}
                  </Button>
                  <Button onPress={() => logout()}>
                    {translate('general.logout')}
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.loadingMessage}>
                <Spinner size="large" status="warning" />
                <Text category="h1" style={styles.loadingText}>
                  {translate('general.loading')}
                </Text>
              </View>
            )}
          </Layout>
        )}
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...LayoutStyle.flex.full,
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
  errorButtons: {
    height: Sizing.screen.height * 0.2,
    width: Sizing.screen.width * 0.73,
    justifyContent: 'space-evenly',
  },
  errorMessage: {
    height: Sizing.screen.height * 0.4,
    width: Sizing.screen.width * 0.73,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Sizing.t2,
  },
  errorText: {
    marginBottom: Sizing.t3,
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
