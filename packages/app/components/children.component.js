import React from 'react'
import {StyleSheet, View, Image, SafeAreaView} from 'react-native'
import {useChildList} from '@skolplattformen/api-hooks'
import {
  Divider,
  Button,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  List,
  Card,
  Avatar,
  Spinner,
} from '@ui-kitten/components'
import {ChildListItem} from './childListItem.component'
const colors = ['primary', 'success', 'info', 'warning', 'danger']

const BackIcon = (props) => <Icon {...props} name="arrow-back" />
export const Children = ({navigation}) => {
  const {data: childList, status, error, reload} = useChildList()
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
      <Layout style={{flex: 1}}>
        {status === 'loaded' ? (
          <Layout style={styles.childList}>
            {childList.map((child, i) => (
              <ChildListItem
                key={child.id}
                child={child}
                color={colors[i % colors.length]}
                navigation={navigation}
              />
            ))}
          </Layout>
        ) : (
          <Layout style={styles.loading}>
            <Image
              source={require('../assets/girls.png')}
              style={{height: 400, width: '100%'}}
            />
            <View style={{flexDirection: 'row'}}>
              <Spinner size="large" status="warning" />
              <Text category="h1" style={{marginLeft: 10, marginTop: -7}}>
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
  topContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childList: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})
