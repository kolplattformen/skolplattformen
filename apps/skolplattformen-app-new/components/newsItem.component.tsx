import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNewsDetails} from '../libs/hooks/src';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/sv';
import React from 'react';
import {
  Dimensions,
  ImageStyle,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {defaultStackStyling} from '../design/navigationThemes';
import {Layout, Sizing, Typography} from '../styles';
import {studentName} from '../utils/peopleHelpers';
import {translate} from '../utils/translation';
import {Image} from './image.component';
import {Markdown} from './markdown.component';
import {RootStackParamList} from './navigation.component';
import {NavigationTitle} from './navigationTitle.component';

// const translate = (key: string) => key;

interface NewsItemProps {
  navigation: StackNavigationProp<RootStackParamList, 'NewsItem'>;
  route: RouteProp<RootStackParamList, 'NewsItem'>;
}

const displayDate = (date: string | undefined) => moment(date).format('lll');

const dateIsValid = (date: string | undefined) =>
  moment(date, moment.ISO_8601).isValid();

export const newsItemRouteOptions =
  (darkMode: boolean) =>
  ({
    route,
  }: {
    route: RouteProp<RootStackParamList, 'NewsItem'>;
  }): NativeStackNavigationOptions => {
    const newsItem = route.params.newsItem;
    const {child} = route.params;
    return {
      ...defaultStackStyling(darkMode),
      headerTitle: () => <NavigationTitle title={studentName(child?.name)} />,
    };
  };

export const NewsItem = ({route}: NewsItemProps) => {
  const {newsItem, child} = route.params;
  const {data, status, reload} = useNewsDetails(child, newsItem);
  const styles = useStyleSheet(themedStyles);
  const stylesMarkdown = useStyleSheet(themedStylesMarkdown);

  return (
    <ScrollView
      contentContainerStyle={styles.article}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={status === 'loading'} onRefresh={reload} />
      }>
      <Text maxFontSizeMultiplier={2} style={styles.title}>
        {newsItem.header}
      </Text>
      {dateIsValid(newsItem.published) && (
        <Text
          maxFontSizeMultiplier={2}
          style={[styles.subtitle, styles.published]}>
          <Text style={styles.strong}>{translate('news.published')}:</Text>{' '}
          {displayDate(newsItem.published)}
        </Text>
      )}
      {dateIsValid(newsItem.modified) && (
        <Text maxFontSizeMultiplier={2} style={styles.subtitle}>
          <Text style={styles.strong}>{translate('news.updated')}:</Text>{' '}
          {displayDate(newsItem.modified)}
        </Text>
      )}
      <View style={styles.body}>
        <Markdown style={stylesMarkdown}>{data.body}</Markdown>
        {newsItem.fullImageUrl && (
          <Image
            accessibilityIgnoresInvertColors={false}
            src={newsItem.fullImageUrl}
            style={styles.image as ImageStyle}
            componentWidth={Dimensions.get('screen').width - Sizing.t5 * 2}
          />
        )}
      </View>
    </ScrollView>
  );
};

const themedStylesMarkdown = StyleService.create({
  body: {
    ...Typography.fontSize.base,
    color: 'text-basic-color',
    lineHeight: 26,
  },
  heading1: {
    ...Typography.fontSize.xl,
    color: 'text-basic-color',
  },
  heading2: {
    ...Typography.fontSize.lg,
    color: 'text-basic-color',
  },
  code_block: {
    color: 'text-basic-color',
    backgroundColor: 'background-basic-color-1',
    borderColor: 'color-basic-400',
  },
});

const themedStyles = StyleService.create({
  article: {
    padding: Sizing.t5,
    backgroundColor: 'background-basic-color-1',
  },
  scrollView: {
    ...Layout.flex.full,
  },
  image: {
    width: '100%',
    marginTop: Sizing.t4,
    borderRadius: 15,
  },
  title: {
    ...Typography.fontWeight.bold,
    fontSize: 30,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: 'text-hint-color',
  },
  strong: {
    ...Typography.fontSize.xs,
    ...Typography.fontWeight.bold,
    color: 'text-hint-color',
  },
  published: {
    marginBottom: Sizing.t1,
  },
  body: {
    marginTop: Sizing.t4,
  },
  topNavigationTitle: {
    ...Typography.fontWeight.semibold,
  },
});
