import {NavigationProp, useNavigation} from '@react-navigation/core';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Child} from '../libs/api/lib';
import {useApi, useChildList} from '../libs/hooks/src';
import {
  Button,
  List,
  Spinner,
  StyleService,
  Text,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageStyle,
  Linking,
  ListRenderItemInfo,
  View,
} from 'react-native';
import {defaultStackStyling} from '../design/navigationThemes';
import AppStorage from '../services/appStorage';
import {Layout as LayoutStyle, Sizing, Typography} from '../styles';
import {translate} from '../utils/translation';
import {ChildListItem} from './childListItem.component';
import {RefreshIcon, SettingsIcon} from './icon.component';
import {RootStackParamList} from './navigation.component';

const colors = ['primary', 'success', 'info', 'warning', 'danger'];

export const childenRouteOptions =
  (darkMode: boolean) => (): NativeStackNavigationOptions => {
    return {
      ...defaultStackStyling(darkMode),
      title: translate('children.title'),
      headerLargeTitle: false,
      headerLargeTitleShadowVisible: false,
    };
  };

export const Children = () => {
  const styles = useStyleSheet(themedStyles);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {api} = useApi();
  const {data: childList, status, reload} = useChildList();
  const reloadChildren = useCallback(() => {
    reload();
    setUpdated(moment().toISOString());
  }, [reload]);

  const [updatedAt, setUpdated] = useState('');

  const logout = useCallback(() => {
    AppStorage.clearTemporaryItems().then(() => api.logout());
  }, [api]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TopNavigationAction
            icon={SettingsIcon}
            onPress={() => navigation.navigate('Settings')}
          />
        );
      },
      headerRight: () => {
        return (
          <TopNavigationAction
            icon={RefreshIcon}
            onPress={() => reloadChildren()}
            accessibilityHint="Reload"
            accessibilityLabel="Reload"
          />
        );
      },
    });
  }, [navigation, reloadChildren]);

  // We need to skip safe area view here, due to the reason that it's adding a white border
  // when this view is actually lightgrey. Taking the padding top value from the use inset hook.
  return status === 'loaded' ? (
    <List
      contentContainerStyle={styles.childListContainer}
      data={childList}
      style={styles.childList}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text category="h2">{translate('children.noKids_title')}</Text>
          <Text style={styles.emptyStateDescription}>
            {translate('children.noKids_description')}
          </Text>
          <Image
            accessibilityIgnoresInvertColors={false}
            source={require('../assets/children.png')}
            style={styles.emptyStateImage as ImageStyle}
          />
        </View>
      }
      renderItem={({item: child, index}: ListRenderItemInfo<Child>) => (
        <ChildListItem
          child={child}
          color={colors[index % colors.length]}
          updated={updatedAt}
          key={child.id}
        />
      )}
    />
  ) : (
    <View style={styles.loading}>
      <Image
        accessibilityIgnoresInvertColors={false}
        source={require('../assets/girls.png')}
        style={styles.loadingImage as ImageStyle}
      />
      {status === 'error' ? (
        <View style={styles.errorMessage}>
          <Text category="h5">{translate('children.loadingErrorHeading')}</Text>
          <Text style={{fontSize: Sizing.t4}}>
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
              }>
              {translate('children.viewStatus')}
            </Button>
            <Button onPress={() => logout()}>
              {translate('general.logout')}
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.loadingMessage}>
          <Spinner size="large" status="primary" />
          <Text category="h1" style={styles.loadingText}>
            {translate('general.loading')}
          </Text>
        </View>
      )}
    </View>
  );
};

const themedStyles = StyleService.create({
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
    paddingVertical: Sizing.t4,
    paddingHorizontal: Sizing.t3,
  },
  emptyState: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
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
  topNavigationTitle: {
    ...Typography.fontWeight.semibold,
  },
});
