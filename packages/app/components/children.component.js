import { useChildList } from '@skolplattformen/api-hooks'
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
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { ChildListItem } from './childListItem.component'
import { BackIcon } from './icon.component'

const { width } = Dimensions.get('window')
const colors = ['primary', 'success', 'info', 'warning', 'danger']

export const Children = ({ navigation }) => {
  const { data: childList, status } = useChildList()
  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  return (
    <SafeAreaView style={styles.topContainer}>
      <TopNavigation
        title="Dina barn"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.fullFlex}>
        {status === 'loaded' ? (
          <Layout style={styles.childListWrap}>
            <List
              contentContainerStyle={styles.childList}
              data={childList}
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
              renderItem={({ item: child, index }) => {
                return (
                  <ChildListItem
                    child={child}
                    color={colors[index % colors.length]}
                    key={child.id}
                    navigation={navigation}
                  />
                )
              }}
            />
          </Layout>
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
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
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
  childListWrap: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  childList: {
    flex: 1,
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
