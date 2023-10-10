import {Notification as NotificationType} from '../libs/api/lib';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Layout, Sizing, Typography} from '../styles';
import {ModalWebView} from './modalWebView.component';

interface NotificationProps {
  item: NotificationType;
}

export const Notification = ({item}: NotificationProps) => {
  const styles = useStyleSheet(themedStyles);
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const date = item.dateModified || item.dateCreated;
  const displayDate = date ? moment(date).fromNow() : null;

  const sharedCookiesEnabled = Boolean(
    item.url &&
      (item.url.startsWith('https://start.unikum.net/') ||
        item.url.startsWith('https://hjarntorget.goteborg.se')),
  );

  return (
    <>
      <TouchableOpacity onPress={open}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.sender}</Text>
            <Text style={styles.subtitle}>
              {item.category ? item.category : ''}
              {item.category && displayDate ? ' • ' : ''}
              {displayDate ? displayDate : ''}
            </Text>
          </View>
          <Text>{item.message}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <ModalWebView
          url={item.url}
          onClose={close}
          sharedCookiesEnabled={sharedCookiesEnabled}
        />
      )}
    </>
  );
};

const themedStyles = StyleService.create({
  card: {
    ...Layout.flex.full,
    borderRadius: 15,
    paddingVertical: Sizing.t4,
    paddingHorizontal: Sizing.t4,
    marginBottom: Sizing.t3,
    backgroundColor: 'background-basic-color-1',
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: 'text-hint-color',
    marginBottom: Sizing.t2,
  },
});
