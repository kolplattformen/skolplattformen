import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Icon, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
)

const InfoIcon = (props) => (
  <Icon {...props} name='info' />
)

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out' />
)

export const ChildTopNavigation = ({child}) => {

  const [menuVisible, setMenuVisible] = React.useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  )

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='Sjukanmälan' />
        <MenuItem accessoryLeft={InfoIcon} title='Kontakta' />
        <MenuItem accessoryLeft={LogoutIcon} title='Logga ut' />
      </OverflowMenu>
    </React.Fragment>
  )

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Icon {...props} style={styles.logo} name='person'/>
      <Text {...props}>
        {child.name}
      </Text>
    </View>
  )

  return (
    <TopNavigation title={renderTitle} accessoryRight={renderOverflowMenuAction} />
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    marginHorizontal: 16,
    width: 16,
    height: 16
  }
})
